import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json(
        { error: "Niet geautoriseerd" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get('organizationId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const status = searchParams.get('status');

    const whereClause: any = {
      userId: user.id
    };

      // Add organization filter if provided
    if (organizationId) {
      const userOrg = await prisma.userOrganization.findFirst({
        where: {
          userId: user.id,
          organizationId
        }
      });

      if (userOrg) {
        whereClause.organizationId = organizationId;
      }
    }

    // Add date range filter
    if (startDate && endDate) {
      whereClause.scheduledAt = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    } else if (startDate) {
      whereClause.scheduledAt = {
        gte: new Date(startDate)
      };
    } else if (endDate) {
      whereClause.scheduledAt = {
        lte: new Date(endDate)
      };
    }

    // Add status filter
    if (status) {
      whereClause.status = status;
    }

    const posts = await prisma.post.findMany({
      where: whereClause,
      include: {
        company: {
          select: { id: true, name: true, logo: true }
        },
        template: {
          select: { name: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ posts });

  } catch (error) {
    console.error("Calendar posts fetch error:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan bij het ophalen van geplande posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json(
        { error: "Niet geautoriseerd" },
        { status: 401 }
      );
    }

    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Ongeldige request body" },
        { status: 400 }
      );
    }

    const {
      title,
      content,
      scheduledAt,
      companyId: rawCompanyId,
      templateId: rawTemplateId,
      organizationId: rawOrganizationId,
      strategy,
      tone,
      imageStyle: rawImageStyle,
      publishNow
    } = body;

    const companyId = rawCompanyId && String(rawCompanyId).trim() ? String(rawCompanyId).trim() : null;
    const templateId = rawTemplateId && String(rawTemplateId).trim() ? String(rawTemplateId).trim() : null;
    const organizationId = rawOrganizationId && String(rawOrganizationId).trim() ? String(rawOrganizationId).trim() : null;
    const imageStyle = rawImageStyle && String(rawImageStyle).trim() ? String(rawImageStyle).trim() : null;

    const titleStr = title != null ? String(title).trim() : "";
    const contentStr = content != null ? String(content).trim() : "";
    if (!titleStr || !contentStr) {
      return NextResponse.json(
        { error: "Titel en content zijn verplicht" },
        { status: 400 }
      );
    }

    const isPublishNow = !!publishNow;
    const isScheduled = !!scheduledAt && !isPublishNow;
    if (!isPublishNow && !isScheduled) {
      // Geen planning en geen direct publiceren = concept
    }
    if (isScheduled && !scheduledAt) {
      return NextResponse.json(
        { error: "Geplande datum is verplicht bij inplannen" },
        { status: 400 }
      );
    }

    // Organisatie: uit request of van de gebruiker; zo nodig automatisch aanmaken (zoals bij Bedrijven)
    let resolvedOrganizationId: string | null = organizationId;
    if (!resolvedOrganizationId) {
      let userOrg = await prisma.userOrganization.findFirst({
        where: { userId: user.id },
        select: { organizationId: true }
      });
      if (!userOrg) {
        const orgName = user.name || (user.email ?? "user").split("@")[0];
        const organization = await prisma.organization.create({
          data: {
            name: `${orgName}'s Organisatie`,
            slug: `org-${user.id.slice(0, 8)}-${Date.now()}`,
          },
        });
        await prisma.userOrganization.create({
          data: {
            userId: user.id,
            organizationId: organization.id,
            role: "OWNER",
          },
        });
        resolvedOrganizationId = organization.id;
      } else {
        resolvedOrganizationId = userOrg.organizationId;
      }
    } else {
      if (!organizationId) {
        return NextResponse.json(
          { error: "Ongeldige organisatie" },
          { status: 400 }
        );
      }
      const userOrg = await prisma.userOrganization.findFirst({
        where: { userId: user.id, organizationId }
      });
      if (!userOrg) {
        return NextResponse.json(
          { error: "Geen toegang tot deze organisatie" },
          { status: 403 }
        );
      }
      resolvedOrganizationId = organizationId;
    }

    // Bedrijf optioneel: alleen gebruiken als het bij de organisatie van de gebruiker hoort
    let finalCompanyId: string | null = null;
    if (companyId && resolvedOrganizationId) {
      const company = await prisma.company.findFirst({
        where: {
          id: companyId,
          organizationId: resolvedOrganizationId
        }
      });
      if (company) finalCompanyId = company.id;
    }

    const now = new Date();
    const parseDate = (val: unknown): Date | null => {
      if (!val) return null;
      const d = new Date(val as string);
      return isNaN(d.getTime()) ? null : d;
    };
    const scheduledAtDate = isPublishNow
      ? (parseDate(scheduledAt) || now)
      : isScheduled
      ? (parseDate(scheduledAt) || now)
      : null;
    const publishedAtDate = isPublishNow ? (scheduledAtDate || now) : null;

    const post = await prisma.post.create({
      data: {
        userId: user.id,
        organizationId: resolvedOrganizationId,
        companyId: finalCompanyId ?? null,
        templateId: templateId || null,
        title: titleStr,
        content: contentStr,
        strategy: strategy || 'STANDARD_POST',
        tone: tone || 'PROFESSIONAL',
        imageStyle: imageStyle || null,
        status: isPublishNow ? 'PUBLISHED' : isScheduled ? 'SCHEDULED' : 'DRAFT',
        scheduledAt: scheduledAtDate,
        publishedAt: publishedAtDate
      },
      include: {
        company: {
          select: { id: true, name: true, logo: true }
        },
        template: {
          select: { name: true }
        }
      }
    });

    return NextResponse.json({ post });

  } catch (error) {
    console.error("Calendar post creation error:", error);
    const message = error instanceof Error ? error.message : "Onbekende fout";
    const isPrisma = message.includes("Prisma") || message.includes("Unique constraint") || message.includes("Foreign key");
    return NextResponse.json(
      {
        error: isPrisma
          ? "Kon post niet opslaan. Controleer of je bent gekoppeld aan een organisatie (bijv. via Bedrijven)."
          : "Er is iets misgegaan bij het opslaan of plannen van de post.",
        details: process.env.NODE_ENV === "development" ? message : undefined
      },
      { status: 500 }
    );
  }
}