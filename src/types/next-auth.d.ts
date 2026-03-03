import "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    subscriptionPlan?: string;
    creditsRemaining?: number;
    role?: string;
  }

  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      subscriptionPlan?: string;
      creditsRemaining?: number;
      role?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    subscriptionPlan?: string;
    creditsRemaining?: number;
    role?: string;
    isBigBrother?: boolean;
  }
}
