import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export async function getUserFromSession(session: any) {
  if (!session?.user?.email) {
    return null;
  }

  return await prisma.user.findUnique({
    where: { email: session.user.email }
  });
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        // Check if email is verified
        if (!user.emailVerified) {
          // Send verification email and return null to trigger email verification
          await sendVerificationEmail(user.email);
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      }
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        // Custom email template for login verification
        const { createTransport } = await import("nodemailer");

        const transport = createTransport(server);
        const result =         await transport.sendMail({
          to: email,
          from,
          subject: `Log in bij GenPostAI`,
          text: text({ url, host: process.env.NEXTAUTH_URL || "http://localhost:3000" }),
          html: html({ url, host: process.env.NEXTAUTH_URL || "http://localhost:3000", email }),
        });
        const failed = result.rejected.concat(result.pending).filter(Boolean);
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
        }
      },
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }

      // Link account to user
      if (account && user) {
        try {
          await prisma.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              }
            },
            update: {
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              expires_at: account.expires_at,
            },
            create: {
              userId: user.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              expires_at: account.expires_at,
            }
          });
        } catch (error) {
          console.error("Error linking account:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string;
      }

      return session;
    },
    async signIn({ user, account, profile }) {
      // Handle user creation for both credentials and OAuth
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! }
        });

        if (!existingUser) {
          // Create new user
          const newUser = await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name,
              image: user.image,
            }
          });

          // Create organization for new user
          const organization = await prisma.organization.create({
            data: {
              name: `${user.name || user.email!.split('@')[0]}'s Organisatie`,
              slug: `org-${newUser.id.slice(0, 8)}-${Date.now()}`,
            }
          });

          // Add user to organization
          await prisma.userOrganization.create({
            data: {
              userId: newUser.id,
              organizationId: organization.id,
              role: 'OWNER',
            }
          });

          // Create subscription
          await prisma.subscription.create({
            data: {
              userId: newUser.id,
              organizationId: organization.id,
              plan: 'PLUS',
              creditsLimit: 50,
            }
          });

          // Create initial credits
          await prisma.credit.create({
            data: {
              userId: newUser.id,
              organizationId: organization.id,
              amount: 50,
              type: 'PURCHASE',
              description: 'Initiële Plus abonnement credits',
            }
          });

        } else {
          // Check if user has an organization, if not create one
          const userOrganization = await prisma.userOrganization.findFirst({
            where: { userId: existingUser.id }
          });

          if (!userOrganization) {
            // Create organization for existing user who doesn't have one
            const organization = await prisma.organization.create({
              data: {
                name: `${existingUser.name || existingUser.email!.split('@')[0]}'s Organisatie`,
                slug: `org-${existingUser.id.slice(0, 8)}-${Date.now()}`,
              }
            });

            // Add user to organization
            await prisma.userOrganization.create({
              data: {
                userId: existingUser.id,
                organizationId: organization.id,
                role: 'OWNER',
              }
            });

            // Create subscription
            await prisma.subscription.create({
              data: {
                userId: existingUser.id,
                organizationId: organization.id,
                plan: 'PLUS',
                creditsLimit: 50,
              }
            });

            // Create initial credits
            await prisma.credit.create({
              data: {
                userId: existingUser.id,
                organizationId: organization.id,
                amount: 50,
                type: 'PURCHASE',
                description: 'Initiële Plus abonnement credits',
              }
            });
          }

          // Update existing user with latest info
          await prisma.user.update({
            where: { email: user.email! },
            data: {
              name: user.name,
              image: user.image,
            }
          });
        }
      } catch (error) {
        console.error("Error during sign in:", error);
        return false;
      }
      return true;
    }
  },
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
  }
};

// Helper function to send verification email for unverified users
async function sendVerificationEmail(email: string) {
  try {
    const { createTransport } = await import("nodemailer");

    const transport = createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // Generate verification token
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Store verification token
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    const verificationUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/auth/verify-email?token=${token}&email=${encodeURIComponent(email)}`;

    await transport.sendMail({
      to: email,
      from: process.env.EMAIL_FROM || "noreply@genpostai.com",
      subject: `Bevestig je email adres - GenPostAI`,
      text: textVerification({ url: verificationUrl, host: process.env.NEXTAUTH_URL || "http://localhost:3000" }),
      html: htmlVerification({ url: verificationUrl, host: process.env.NEXTAUTH_URL || "http://localhost:3000", email }),
    });

    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
}

// Email templates
function html({ url, host, email }: { url: string; host: string; email: string }) {
  const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`;
  const escapedHost = `${host.replace(/\./g, "&#8203;.")}`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Log in bij GenPostAI</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f6f9fc; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center; }
    .content { padding: 40px 20px; }
    .button { display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
    .footer { background-color: #f6f9fc; padding: 20px; text-align: center; color: #8898aa; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔐 Beveiligde Login</h1>
      <p>GenPostAI - AI-gedreven LinkedIn content creatie</p>
    </div>
    <div class="content">
      <h2>Welkom bij GenPostAI!</h2>
      <p>Je hebt gevraagd om in te loggen bij je GenPostAI account. Klik op de knop hieronder om je login te bevestigen:</p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${url}" class="button">🚀 Bevestig Login</a>
      </div>

      <p><strong>Belangrijk:</strong> Deze link verloopt over 24 uur. Als je niet hebt gevraagd om in te loggen, negeer dan deze email.</p>

      <p>Met vriendelijke groet,<br>Het GenPostAI Team</p>
    </div>
    <div class="footer">
      <p>Dit is een automatische email van GenPostAI. Beantwoord deze email niet.</p>
      <p>© 2025 GenPostAI - Onderdeel van AI-group.nl</p>
    </div>
  </div>
</body>
</html>
`;
}

function text({ url, host }: { url: string; host: string }) {
  return `
GenPostAI - Bevestig je login

Je hebt gevraagd om in te loggen bij je GenPostAI account.

Klik op deze link om je login te bevestigen:
${url}

Deze link verloopt over 24 uur.

Als je niet hebt gevraagd om in te loggen, negeer dan deze email.

GenPostAI Team
AI-group.nl
`;
}

function htmlVerification({ url, host, email }: { url: string; host: string; email: string }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Bevestig je email - GenPostAI</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f6f9fc; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center; }
    .content { padding: 40px 20px; }
    .button { display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
    .footer { background-color: #f6f9fc; padding: 20px; text-align: center; color: #8898aa; font-size: 12px; }
    .warning { background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📧 Email Verificatie</h1>
      <p>GenPostAI - AI-gedreven LinkedIn content creatie</p>
    </div>
    <div class="content">
      <h2>Bevestig je email adres</h2>
      <p>Bedankt voor je registratie bij GenPostAI! Klik op de knop hieronder om je email adres te bevestigen:</p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${url}" class="button">✅ Bevestig Email Adres</a>
      </div>

      <div class="warning">
        <strong>⚠️ Belangrijk:</strong> Deze verificatielink verloopt over 24 uur. Zorg ervoor dat je je email bevestigt voordat de link verloopt.
      </div>

      <p>Als de knop niet werkt, kopieer dan deze link naar je browser:</p>
      <p style="word-break: break-all; background-color: #f8f9fa; padding: 10px; border-radius: 4px; font-family: monospace; font-size: 12px;">${url}</p>

      <p>Met vriendelijke groet,<br>Het GenPostAI Team</p>
    </div>
    <div class="footer">
      <p>Dit is een automatische email van GenPostAI. Beantwoord deze email niet.</p>
      <p>Als je geen account hebt aangemaakt, negeer dan deze email.</p>
      <p>© 2025 GenPostAI - Onderdeel van AI-group.nl</p>
    </div>
  </div>
</body>
</html>
`;
}

function textVerification({ url, host }: { url: string; host: string }) {
  return `
GenPostAI - Bevestig je email adres

Bedankt voor je registratie bij GenPostAI!

Klik op deze link om je email adres te bevestigen:
${url}

Deze verificatielink verloopt over 24 uur.

Als je geen account hebt aangemaakt, negeer dan deze email.

GenPostAI Team
AI-group.nl
`;
}