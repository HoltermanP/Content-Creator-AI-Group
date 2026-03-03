import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    // Check if test user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: "test@example.com" }
    });

    if (existingUser) {
      return NextResponse.json({
        message: "Test user already exists",
        email: "test@example.com",
        password: "test123"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("test123", 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: "Test Gebruiker",
        email: "test@example.com",
        password: hashedPassword,
      }
    });

    // Create organization
    const organization = await prisma.organization.create({
      data: {
        name: "Test Organisatie",
        slug: `test-organisatie-${Date.now()}`,
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

    // Create Plus subscription
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

    return NextResponse.json({
      message: "Test user created successfully",
      user: {
        email: "test@example.com",
        password: "test123"
      }
    });

  } catch (error) {
    console.error("Error creating test user:", error);
    return NextResponse.json(
      { error: "Failed to create test user" },
      { status: 500 }
    );
  }
}