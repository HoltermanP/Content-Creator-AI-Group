import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const BIG_BROTHER_EMAIL = process.env.BIG_BROTHER_EMAIL?.trim();

export async function GET() {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const isBigBrother = !!BIG_BROTHER_EMAIL && user.email === BIG_BROTHER_EMAIL;
  if (user.role !== "ADMIN" && !isBigBrother) {
    return NextResponse.json({ error: "Geen toegang" }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
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

  const list = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role ?? "MEMBER",
    createdAt: u.createdAt,
    creditsRemaining: u.credits.reduce((s, c) => s + c.amount, 0),
    plan: u.subscriptions[0]?.plan ?? "FREE",
    creditsLimit: u.subscriptions[0]?.creditsLimit ?? 0,
    creditsUsed: u.subscriptions[0]?.creditsUsed ?? 0,
  }));

  return NextResponse.json(list);
}
