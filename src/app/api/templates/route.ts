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

    const whereClause: any = {
      OR: [
        { userId: user.id },
        { isPublic: true }
      ]
    };

    if (organizationId) {
      // Check if user has access to this organization
      const userOrg = await prisma.userOrganization.findFirst({
        where: {
          userId: user.id,
          organizationId
        }
      });

      if (userOrg) {
        whereClause.OR.push({ organizationId });
      }
    }

    const templates = await prisma.template.findMany({
      where: whereClause,
      include: {
        user: {
          select: { name: true }
        },
        organization: {
          select: { name: true }
        },
        _count: {
          select: { posts: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ templates });

  } catch (error) {
    console.error("Templates fetch error:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan bij het ophalen van templates" },
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

    const { name, description, category, content, variables, organizationId, isPublic } = await request.json();

    if (!name || !content || !category) {
      return NextResponse.json(
        { error: "Naam, content en categorie zijn verplicht" },
        { status: 400 }
      );
    }

    // Check if organization access if provided
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

    // Parse and validate variables
    let parsedVariables = {};
    if (variables) {
      try {
        parsedVariables = JSON.parse(variables);
      } catch (error) {
        return NextResponse.json(
          { error: "Variabelen moeten geldige JSON zijn" },
          { status: 400 }
        );
      }
    }

    const template = await prisma.template.create({
      data: {
        userId: user.id,
        organizationId: organizationId || null,
        name,
        description,
        category,
        content,
        variables: JSON.stringify(parsedVariables),
        isPublic: isPublic || false,
      }
    });

    return NextResponse.json({ template });

  } catch (error) {
    console.error("Template creation error:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan bij het aanmaken van de template" },
      { status: 500 }
    );
  }
}