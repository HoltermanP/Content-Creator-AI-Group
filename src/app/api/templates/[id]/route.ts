import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, getUserFromSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const user = await getUserFromSession(session);

    if (!user) {
      return NextResponse.json(
        { error: "Niet geautoriseerd" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const template = await prisma.template.findUnique({
      where: { id },
      include: {
        user: {
          select: { name: true, email: true }
        },
        organization: {
          select: { name: true }
        },
        posts: {
          select: {
            id: true,
            title: true,
            createdAt: true
          },
          take: 5,
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!template) {
      return NextResponse.json(
        { error: "Template niet gevonden" },
        { status: 404 }
      );
    }

    // Check access permissions
    const hasAccess = template.userId === user.id ||
                     template.isPublic ||
                     (template.organizationId &&
                      await prisma.userOrganization.findFirst({
                        where: {
                          userId: user.id,
                          organizationId: template.organizationId
                        }
                      }));

    if (!hasAccess) {
      return NextResponse.json(
        { error: "Geen toegang tot deze template" },
        { status: 403 }
      );
    }

    return NextResponse.json({ template });

  } catch (error) {
    console.error("Template fetch error:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan bij het ophalen van de template" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const user = await getUserFromSession(session);

    if (!user) {
      return NextResponse.json(
        { error: "Niet geautoriseerd" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const template = await prisma.template.findUnique({
      where: { id }
    });

    if (!template) {
      return NextResponse.json(
        { error: "Template niet gevonden" },
        { status: 404 }
      );
    }

    // Check ownership
    if (template.userId !== user.id) {
      return NextResponse.json(
        { error: "Alleen de eigenaar kan templates bewerken" },
        { status: 403 }
      );
    }

    const { name, description, category, content, variables, isPublic } = await request.json();

    // Parse and validate variables
    let parsedVariables = template.variables;
    if (variables !== undefined) {
      try {
        parsedVariables = JSON.stringify(JSON.parse(variables));
      } catch (error) {
        return NextResponse.json(
          { error: "Variabelen moeten geldige JSON zijn" },
          { status: 400 }
        );
      }
    }

    const updatedTemplate = await prisma.template.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(category && { category }),
        ...(content && { content }),
        ...(variables !== undefined && { variables: parsedVariables }),
        ...(isPublic !== undefined && { isPublic }),
      }
    });

    return NextResponse.json({ template: updatedTemplate });

  } catch (error) {
    console.error("Template update error:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan bij het bijwerken van de template" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const user = await getUserFromSession(session);

    if (!user) {
      return NextResponse.json(
        { error: "Niet geautoriseerd" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const template = await prisma.template.findUnique({
      where: { id }
    });

    if (!template) {
      return NextResponse.json(
        { error: "Template niet gevonden" },
        { status: 404 }
      );
    }

    // Check ownership
    if (template.userId !== user.id) {
      return NextResponse.json(
        { error: "Alleen de eigenaar kan templates verwijderen" },
        { status: 403 }
      );
    }

    await prisma.template.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Template succesvol verwijderd" });

  } catch (error) {
    console.error("Template delete error:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan bij het verwijderen van de template" },
      { status: 500 }
    );
  }
}