import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
      return NextResponse.redirect(
        new URL('/auth/signin?error=missing_token', request.url)
      );
    }

    // Find and verify the token
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        identifier: email,
        token: token,
        expires: {
          gt: new Date(),
        },
      },
    });

    if (!verificationToken) {
      return NextResponse.redirect(
        new URL('/auth/signin?error=invalid_token', request.url)
      );
    }

    // Mark email as verified
    await prisma.user.update({
      where: { email: email },
      data: { emailVerified: new Date() },
    });

    // Delete the used token
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: email,
          token: token,
        },
      },
    });

    // Redirect to sign in page with success message
    return NextResponse.redirect(
      new URL('/auth/signin?verified=true', request.url)
    );

  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.redirect(
      new URL('/auth/signin?error=verification_failed', request.url)
    );
  }
}