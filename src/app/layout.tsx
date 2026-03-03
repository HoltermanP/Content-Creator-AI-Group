import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GenPostAI - AI-gedreven LinkedIn Content Creator",
  description: "Professionele AI-powered content creatie tool voor Nederlandse bedrijven. Genereer LinkedIn posts, beheer je content kalender en optimaliseer je sociale media presence.",
  keywords: "LinkedIn, content creation, AI, social media, Nederlandse bedrijven, marketing",
  authors: [{ name: "AI-group.nl" }],
  openGraph: {
    title: "GenPostAI - AI Content Creator",
    description: "Transform your LinkedIn presence with AI-powered content creation",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
