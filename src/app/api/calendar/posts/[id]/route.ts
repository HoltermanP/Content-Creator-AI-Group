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

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        company: true,
        template: true,
        user: {
          select: { name: true, email: true }
        },
        organization: {
          select: { name: true }
        }
      }
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post niet gevonden" },
        { status: 404 }
      );
    }

    // Check access permissions
    const hasAccess = post.userId === user.id ||
                     (post.organizationId &&
                      await prisma.userOrganization.findFirst({
                        where: {
                          userId: user.id,
                          organizationId: post.organizationId
                        }
                      }));

    if (!hasAccess) {
      return NextResponse.json(
        { error: "Geen toegang tot deze post" },
        { status: 403 }
      );
    }

    return NextResponse.json({ post });

  } catch (error) {
    console.error("Calendar post fetch error:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan bij het ophalen van de post" },
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

    const post = await prisma.post.findUnique({
      where: { id }
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post niet gevonden" },
        { status: 404 }
      );
    }

    // Check ownership
    if (post.userId !== user.id) {
      return NextResponse.json(
        { error: "Alleen de eigenaar kan posts bewerken" },
        { status: 403 }
      );
    }

    // Don't allow editing published posts
    if (post.status === 'PUBLISHED') {
      return NextResponse.json(
        { error: "Gepubliceerde posts kunnen niet worden bewerkt" },
        { status: 400 }
      );
    }

    const {
      title,
      content,
      scheduledAt,
      companyId,
      strategy,
      tone,
      imageStyle,
      imageUrl
    } = await request.json();

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(scheduledAt && { scheduledAt: new Date(scheduledAt) }),
        ...(companyId && { companyId }),
        ...(strategy && { strategy }),
        ...(tone && { tone }),
        ...(imageStyle && { imageStyle }),
        ...(imageUrl && { imageUrl })
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

    return NextResponse.json({ post: updatedPost });

  } catch (error) {
    console.error("Calendar post update error:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan bij het bijwerken van de post" },
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

    const post = await prisma.post.findUnique({
      where: { id }
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post niet gevonden" },
        { status: 404 }
      );
    }

    // Check ownership
    if (post.userId !== user.id) {
      return NextResponse.json(
        { error: "Alleen de eigenaar kan posts verwijderen" },
        { status: 403 }
      );
    }

    // Don't allow deleting published posts
    if (post.status === 'PUBLISHED') {
      return NextResponse.json(
        { error: "Gepubliceerde posts kunnen niet worden verwijderd" },
        { status: 400 }
      );
    }

    await prisma.post.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Post succesvol verwijderd" });

  } catch (error) {
    console.error("Calendar post delete error:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan bij het verwijderen van de post" },
      { status: 500 }
    );
  }
}