import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, getUserFromSession } from "@/lib/auth";
import { aiService, ImageGenerationParams } from "@/lib/ai";
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

    const body = await request.json();
    const {
      style,
      description,
      companyId,
      contentText
    }: ImageGenerationParams & { companyId: string; contentText: string } = body;

    // Validate required fields
    if (!style || !description || !companyId || !contentText) {
      return NextResponse.json(
        { error: "Stijl, beschrijving, bedrijf en content zijn verplicht" },
        { status: 400 }
      );
    }

    // Check if user has generated content first (business rule)
    // This is a business rule - images can only be generated after text content
    const recentPosts = await prisma.post.findMany({
      where: {
        userId: user.id,
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 1
    });

    if (recentPosts.length === 0) {
      return NextResponse.json(
        { error: "Genereer eerst content voordat je een afbeelding maakt" },
        { status: 400 }
      );
    }

    // Check user credits (images cost 2 credits)
    const userWithCredits = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        credits: {
          where: { organizationId: null },
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    });

    if (!userWithCredits) {
      return NextResponse.json(
        { error: "Gebruiker niet gevonden" },
        { status: 404 }
      );
    }

    const availableCredits = userWithCredits.credits.reduce((total, credit) => total + credit.amount, 0);

    if (availableCredits < 2) {
      return NextResponse.json(
        { error: "Onvoldoende credits voor image generatie (2 credits nodig)" },
        { status: 402 }
      );
    }

    // Get company info
    const company = await prisma.company.findFirst({
      where: {
        id: companyId,
        organization: {
          users: {
            some: {
              userId: user.id
            }
          }
        }
      }
    });

    if (!company) {
      return NextResponse.json(
        { error: "Bedrijf niet gevonden of geen toegang" },
        { status: 404 }
      );
    }

    // Generate image
    const imageParams: ImageGenerationParams = {
      style,
      description,
      companyName: company.name
    };

    const imageUrl = await aiService.generateImage(imageParams);

    // Deduct credits (2 for images)
    await prisma.credit.create({
      data: {
        userId: user.id,
        amount: -2,
        type: 'PURCHASE',
        description: `Afbeelding generatie: ${style}`,
      }
    });

    return NextResponse.json({
      imageUrl,
      creditsUsed: 2,
      remainingCredits: availableCredits - 2
    });

  } catch (error) {
    console.error("Image generation error:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan bij het genereren van de afbeelding" },
      { status: 500 }
    );
  }
}