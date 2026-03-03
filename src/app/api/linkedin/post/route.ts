import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, getUserFromSession } from "@/lib/auth";
import { linkedinService, LinkedInMethod, LinkedInPostData } from "@/lib/linkedin";
import { prisma } from "@/lib/prisma";

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
      postId,
      method,
      content,
      imageUrl,
      title,
      linkUrl
    } = await request.json();

    if (!postId || !method || !content) {
      return NextResponse.json(
        { error: "Post ID, methode en content zijn verplicht" },
        { status: 400 }
      );
    }

    // Validate method
    if (!Object.values(LinkedInMethod).includes(method)) {
      return NextResponse.json(
        { error: "Ongeldige LinkedIn methode" },
        { status: 400 }
      );
    }

    // Get post from database
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: true,
        company: true
      }
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
        { error: "Geen toegang tot deze post" },
        { status: 403 }
      );
    }

    // Check if post is already published
    if (post.status === 'PUBLISHED') {
      return NextResponse.json(
        { error: "Deze post is al gepubliceerd" },
        { status: 400 }
      );
    }

    // Get user's LinkedIn credentials if needed
    let credentials = undefined;
    if (method === LinkedInMethod.DIRECT_API || method === LinkedInMethod.SHARE_API_V2) {
      const account = await prisma.account.findFirst({
        where: {
          userId: user.id,
          provider: 'linkedin'
        }
      });

      if (!account?.access_token) {
        return NextResponse.json(
          { error: "LinkedIn account niet gekoppeld. Ga naar instellingen om LinkedIn te verbinden." },
          { status: 400 }
        );
      }

      credentials = {
        accessToken: account.access_token,
        personId: account.providerAccountId
      };
    }

    // Prepare post data
    const postData: LinkedInPostData = {
      content: content || post.content,
      imageUrl: imageUrl || post.imageUrl,
      title: title || post.title,
      linkUrl
    };

    // Post to LinkedIn
    const result = await linkedinService.postContent(method, postData, credentials);

    if (result.success) {
      // Update post status in database
      await prisma.post.update({
        where: { id: postId },
        data: {
          status: 'PUBLISHED',
          publishedAt: new Date(),
          linkedinUrl: result.url
        }
      });

      // Create analytics entry (only if organization exists)
      if (post.organizationId) {
        await prisma.analytics.create({
          data: {
            postId,
            organizationId: post.organizationId,
            date: new Date()
          }
        });
      }

      return NextResponse.json({
        success: true,
        linkedinUrl: result.url,
        method,
        message: "Post succesvol gepubliceerd op LinkedIn"
      });
    } else {
      // Update post status to failed
      await prisma.post.update({
        where: { id: postId },
        data: {
          status: 'FAILED'
        }
      });

      return NextResponse.json(
        {
          success: false,
          error: result.error || "Publicatie mislukt"
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("LinkedIn posting error:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan bij het publiceren naar LinkedIn" },
      { status: 500 }
    );
  }
}