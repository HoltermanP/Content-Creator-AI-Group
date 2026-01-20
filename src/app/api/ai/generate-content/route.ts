import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, getUserFromSession } from "@/lib/auth";
import { aiService, ContentGenerationParams } from "@/lib/ai";
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
      strategy,
      tone,
      companyId,
      topic,
      targetAudience,
      keyPoints,
      callToAction,
      hashtags
    }: ContentGenerationParams & { companyId: string } = body;

    // Validate required fields
    if (!strategy || !tone || !companyId || !topic) {
      return NextResponse.json(
        { error: "Strategie, toon, bedrijf en onderwerp zijn verplicht" },
        { status: 400 }
      );
    }

    // Check user credits
    const userWithCredits = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        credits: {
          where: { organizationId: null }, // Get user's personal credits
          orderBy: { createdAt: 'desc' },
          take: 1
        },
        subscriptions: {
          where: { status: 'ACTIVE' },
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

    const activeSubscription = userWithCredits.subscriptions[0];
    const availableCredits = userWithCredits.credits.reduce((total, credit) => total + credit.amount, 0);

    if (availableCredits < 1) {
      return NextResponse.json(
        { error: "Onvoldoende credits. Upgrade je abonnement." },
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

    const companyInfo = company.aiGenerated
      ? company.description || company.name
      : `${company.name} - ${company.description || ''} - ${company.industry || ''}`;

    // Generate content
    const contentParams: ContentGenerationParams = {
      strategy,
      tone,
      companyInfo,
      topic,
      targetAudience: targetAudience || "Professionele LinkedIn gebruikers",
      keyPoints,
      callToAction,
      hashtags
    };

    const generatedContent = await aiService.generateContent(contentParams);

    // Deduct credit
    await prisma.credit.create({
      data: {
        userId: user.id,
        amount: -1,
        type: 'PURCHASE',
        description: `Content generatie: ${strategy}`,
      }
    });

    // Update subscription credits used
    if (activeSubscription) {
      await prisma.subscription.update({
        where: { id: activeSubscription.id },
        data: {
          creditsUsed: { increment: 1 }
        }
      });
    }

    return NextResponse.json({
      content: generatedContent,
      creditsUsed: 1,
      remainingCredits: availableCredits - 1
    });

  } catch (error) {
    console.error("Content generation error:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan bij het genereren van content" },
      { status: 500 }
    );
  }
}