import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Naam, email en wachtwoord zijn verplicht" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Wachtwoord moet minimaal 6 karakters bevatten" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Er bestaat al een account met dit email adres" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    });

    // Create default organization for the user
    const organization = await prisma.organization.create({
      data: {
        name: `${name}'s Organisatie`,
        slug: `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      }
    });

    // Add user to organization as owner
    await prisma.userOrganization.create({
      data: {
        userId: user.id,
        organizationId: organization.id,
        role: "OWNER",
      }
    });

    // Create Plus subscription (default)
    await prisma.subscription.create({
      data: {
        userId: user.id,
        organizationId: organization.id,
        plan: "PLUS",
        creditsLimit: 50,
      }
    });

    // Create initial credits
    await prisma.credit.create({
      data: {
        userId: user.id,
        organizationId: organization.id,
        amount: 50,
        type: "PURCHASE",
        description: "Initiële Plus abonnement credits",
      }
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: "Account succesvol aangemaakt",
      user: userWithoutPassword,
      organization
    });

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan tijdens het registreren" },
      { status: 500 }
    );
  }
}