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
    let {
      strategy,
      tone,
      companyId,
      topic,
      targetAudience,
      keyPoints,
      callToAction,
      hashtags
    }: ContentGenerationParams & { companyId: string } = body;

    // Map frontend form values to API strategy/tone enums
    const strategyMap: Record<string, string> = {
      nieuws_update: "NEWS_PUSH",
      thought_leadership: "STANDARD_POST",
      customer_story: "STANDARD_POST",
      trend_update: "NEWS_PUSH",
      question_thread: "QUESTION_THREAD",
      educational: "EDUCATIONAL",
    };
    const toneMap: Record<string, string> = {
      professioneel: "PROFESSIONAL",
      casual: "CASUAL",
      enthousiast: "INSPIRING",
      inspirerend: "INSPIRING",
      educatief: "EDUCATIONAL",
    };
    strategy = strategyMap[strategy] || strategy;
    tone = toneMap[tone] || tone;

    // Validate required fields
    if (!strategy || !tone || !companyId || !topic) {
      return NextResponse.json(
        { error: "Strategie, toon, bedrijf en onderwerp zijn verplicht" },
        { status: 400 }
      );
    }

    const isAdmin = user.role === "ADMIN";

    // Check user credits (admins hebben onbeperkt)
    const userWithCredits = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        credits: {
          select: { amount: true }
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

    if (!isAdmin && availableCredits < 1) {
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

    if (!isAdmin) {
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
    }

    return NextResponse.json({
      content: generatedContent,
      creditsUsed: isAdmin ? 0 : 1,
      remainingCredits: isAdmin ? availableCredits : availableCredits - 1
    });

  } catch (error: unknown) {
    console.error("Content generation error:", error);

    let message = "Er is iets misgegaan bij het genereren van content";

    if (error instanceof Error) {
      const msg = error.message || "";

      if (msg.includes("OPENAI_API_KEY")) {
        message = "OPENAI_API_KEY ontbreekt of is ongeldig. Controleer je .env en herstart de server.";
      } else if (msg.toLowerCase().includes("incorrect api key")) {
        message = "De opgegeven OpenAI API key is ongeldig. Controleer je OPENAI_API_KEY.";
      } else if (msg.toLowerCase().includes("does not exist") && msg.toLowerCase().includes("model")) {
        message = "Het opgegeven OpenAI-model bestaat niet. Gebruik een geldig model (bijv. gpt-4.1-mini) via OPENAI_MODEL in .env.";
      }
    }

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}