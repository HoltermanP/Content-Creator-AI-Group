import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

/** Geeft actueel saldo en abonnement uit de database (voor weergave in header). */
export async function GET() {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      credits: {
        select: { amount: true },
      },
      subscriptions: {
        where: { status: "ACTIVE" },
        orderBy: { updatedAt: "desc" },
        take: 1,
        select: { plan: true, creditsLimit: true, creditsUsed: true },
      },
    },
  });

  if (!dbUser) {
    return NextResponse.json({ error: "Gebruiker niet gevonden" }, { status: 404 });
  }

  const creditsRemaining = dbUser.credits.reduce((s, c) => s + c.amount, 0);
  const subscriptionPlan = dbUser.subscriptions[0]?.plan ?? "FREE";

  return NextResponse.json({
    creditsRemaining,
    subscriptionPlan,
    creditsLimit: dbUser.subscriptions[0]?.creditsLimit ?? 0,
    creditsUsed: dbUser.subscriptions[0]?.creditsUsed ?? 0,
  });
}
