import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function PATCH(request: NextRequest) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) {
      return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
    }

    const { name } = await request.json();

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Naam is verplicht" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: authUser.id },
      data: { name: name.trim() }
    });

    const { password, ...safeUser } = updatedUser as any;

    return NextResponse.json(
      {
        message: "Naam succesvol bijgewerkt",
        user: safeUser
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fout bij updaten van profiel:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan bij het bijwerken van je profiel" },
      { status: 500 }
    );
  }
}

