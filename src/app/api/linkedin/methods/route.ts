import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, getUserFromSession } from "@/lib/auth";
import { linkedinService, LinkedInMethod } from "@/lib/linkedin";
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

    // Check LinkedIn connection status
    const linkedinAccount = await prisma.account.findFirst({
      where: {
        userId: user.id,
        provider: 'linkedin'
      }
    });

    let linkedinConnected = false;
    let linkedinValid = false;

    if (linkedinAccount?.access_token) {
      linkedinConnected = true;
      try {
        linkedinValid = await linkedinService.validateToken(linkedinAccount.access_token);
      } catch (error) {
        linkedinValid = false;
      }
    }

    // Define available methods with their requirements
    const methods = [
      {
        id: LinkedInMethod.DIRECT_API,
        name: "Direct LinkedIn API",
        description: "Direct posten via LinkedIn's officiële API",
        requiresAuth: true,
        available: linkedinConnected && linkedinValid,
        icon: "🔗"
      },
      {
        id: LinkedInMethod.SHARE_API_V2,
        name: "LinkedIn Share API v2",
        description: "Posten via LinkedIn's Share API (nieuwere versie)",
        requiresAuth: true,
        available: linkedinConnected && linkedinValid,
        icon: "📤"
      },
      {
        id: LinkedInMethod.BUFFER,
        name: "Buffer",
        description: "Automatisch posten via Buffer (vereist Buffer account)",
        requiresAuth: false,
        available: true,
        icon: "📅"
      },
      {
        id: LinkedInMethod.ZAPIER,
        name: "Zapier",
        description: "Automatisch posten via Zapier workflows",
        requiresAuth: false,
        available: !!process.env.ZAPIER_LINKEDIN_WEBHOOK,
        icon: "⚡"
      },
      {
        id: LinkedInMethod.MAKE_COM,
        name: "Make.com",
        description: "Automatisch posten via Make.com automatisering",
        requiresAuth: false,
        available: !!process.env.MAKE_LINKEDIN_WEBHOOK,
        icon: "🤖"
      },
      {
        id: LinkedInMethod.COPY_PASTE,
        name: "Kopieer & Plak",
        description: "Kopieer content voor handmatig posten",
        requiresAuth: false,
        available: true,
        icon: "📋"
      }
    ];

    return NextResponse.json({
      methods,
      linkedinStatus: {
        connected: linkedinConnected,
        valid: linkedinValid,
        connectUrl: linkedinConnected ? null : "/api/auth/signin/linkedin"
      }
    });

  } catch (error) {
    console.error("LinkedIn methods error:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan bij het ophalen van LinkedIn methodes" },
      { status: 500 }
    );
  }
}