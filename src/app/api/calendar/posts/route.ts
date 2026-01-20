import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, getUserFromSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = await getUserFromSession(session);

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
          select: { name: true, logo: true }
        },
        template: {
          select: { name: true }
        }
      },
      orderBy: { scheduledAt: 'asc' }
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
    const session = await getServerSession(authOptions);
    const user = await getUserFromSession(session);

    if (!user) {
      return NextResponse.json(
        { error: "Niet geautoriseerd" },
        { status: 401 }
      );
    }

    const {
      title,
      content,
      scheduledAt,
      companyId,
      templateId,
      organizationId,
      strategy,
      tone,
      imageStyle
    } = await request.json();

    if (!title || !content || !scheduledAt) {
      return NextResponse.json(
        { error: "Titel, content en geplande datum zijn verplicht" },
        { status: 400 }
      );
    }

    // Check organization access if provided
    if (organizationId) {
      const userOrg = await prisma.userOrganization.findFirst({
        where: {
          userId: user.id,
          organizationId
        }
      });

      if (!userOrg) {
        return NextResponse.json(
          { error: "Geen toegang tot deze organisatie" },
          { status: 403 }
        );
      }
    }

    // Check company access if provided
    if (companyId) {
      const company = await prisma.company.findFirst({
        where: {
          id: companyId,
          organizationId: organizationId || null,
          organization: organizationId ? {
            users: {
              some: {
                userId: user.id
              }
            }
          } : undefined
        }
      });

      if (!company && !organizationId) {
        // If no organization context, check personal access
        const personalCompany = await prisma.company.findFirst({
          where: {
            id: companyId,
            organizationId: undefined // Personal companies
          }
        });

        if (!personalCompany) {
          return NextResponse.json(
            { error: "Bedrijf niet gevonden of geen toegang" },
            { status: 404 }
          );
        }
      }
    }

    const post = await prisma.post.create({
      data: {
        userId: user.id,
        organizationId: organizationId || null,
        companyId: companyId || null,
        templateId: templateId || null,
        title,
        content,
        strategy: strategy || 'STANDARD_POST',
        tone: tone || 'PROFESSIONAL',
        imageStyle: imageStyle || null,
        status: 'SCHEDULED',
        scheduledAt: new Date(scheduledAt)
      },
      include: {
        company: {
          select: { name: true, logo: true }
        },
        template: {
          select: { name: true }
        }
      }
    });

    return NextResponse.json({ post });

  } catch (error) {
    console.error("Calendar post creation error:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan bij het plannen van de post" },
      { status: 500 }
    );
  }
}