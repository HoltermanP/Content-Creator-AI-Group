import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

function getOpenAI() {
  if (!process.env.OPENAI_API_KEY?.trim()) {
    throw new Error(
      "OPENAI_API_KEY is niet geconfigureerd. Voeg OPENAI_API_KEY toe aan je .env bestand."
    );
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

function deriveCompanyNameFromUrl(website: string, fallback: string): string {
  try {
    const url = new URL(website.includes("://") ? website : `https://${website}`);
    let host = url.hostname.toLowerCase();
    if (host.startsWith("www.")) host = host.slice(4);
    const parts = host.split(".");
    if (parts.length >= 2) {
      const core = parts[parts.length - 2];
      if (core) {
        return core.charAt(0).toUpperCase() + core.slice(1);
      }
    }
    return fallback;
  } catch {
    return fallback;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { website, companyName } = await request.json();

    if (!website) {
      return NextResponse.json(
        { error: "Website URL is verplicht" },
        { status: 400 }
      );
    }

    const effectiveCompanyName =
      (companyName && String(companyName).trim()) ||
      deriveCompanyNameFromUrl(website, "Onbekend bedrijf");

    // Use AI to fetch company information
    console.log("Starting AI request for company:", effectiveCompanyName, "website:", website);

    let companyInfo: {
      name?: string;
      description?: string;
      industry?: string;
      targetAudience?: string;
      values?: string;
      usp?: string;
      recentNews?: string;
    };
    try {
      const prompt = `Analyseer de website ${website} van het bedrijf ${effectiveCompanyName} en haal de volgende informatie op:

1. Bedrijfsbeschrijving (max 200 woorden)
2. Industrie/sector
3. Doelgroep
4. Kernwaarden
5. Unique selling points
6. Recente ontwikkelingen of nieuws
7. Een korte, nette bedrijfsnaam zoals deze publiek bekend staat

Geef alleen de geëxtraheerde informatie terug in een JSON format:

{
  "name": "...",
  "description": "...",
  "industry": "...",
  "targetAudience": "...",
  "values": "...",
  "usp": "...",
  "recentNews": "..."
}

Als informatie niet beschikbaar is op de website, gebruik dan algemene kennis over het bedrijf ${effectiveCompanyName}.`;

      console.log("Calling OpenAI API for company info...");

      let aiResponse: string | null = null;
      try {
        const completion = await getOpenAI().chat.completions.create({
          model: "gpt-5.2",
          messages: [
            {
              role: "system",
              content:
                "Je bent een expert in bedrijfsinformatie analyse. Geef altijd accurate, objectieve informatie gebaseerd op beschikbare data.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 800,
          temperature: 0.3,
        });

        aiResponse = completion.choices[0].message.content ?? null;
        console.log("AI Response:", aiResponse);
      } catch (openaiError) {
        console.log("OpenAI API failed, using mock response:", openaiError);
        aiResponse = `{
          "name": "${effectiveCompanyName}",
          "description": "${effectiveCompanyName} is een innovatief bedrijf dat zich richt op het leveren van hoogwaardige diensten en producten.",
          "industry": "Technology",
          "targetAudience": "Zakelijke klanten en professionals",
          "values": "Innovatie, kwaliteit en klantgerichtheid",
          "usp": "Specialistische expertise en maatwerk oplossingen",
          "recentNews": "Nieuwe ontwikkelingen in AI en automatisering"
        }`;
      }

      if (!aiResponse) {
        throw new Error("Kon geen bedrijfsinformatie ophalen");
      }

      const cleanedResponse = aiResponse
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();

      companyInfo = JSON.parse(cleanedResponse);
      console.log("Parsed company info:", companyInfo);
    } catch (aiError) {
      console.error("AI request failed:", aiError);
      // Fallback with basic info
      companyInfo = {
        name: effectiveCompanyName,
        description: `${effectiveCompanyName} is een bedrijf actief in hun sector.`,
        industry: "Niet gespecificeerd",
        targetAudience: "Professionele markt",
        values: "Kwaliteit en innovatie",
        usp: "Specialistische expertise",
        recentNews: "Geen recente ontwikkelingen gevonden",
      };
    }

    return NextResponse.json({
      company: {
        id: "debug-company",
        name: companyInfo.name || effectiveCompanyName,
        website,
      },
      extractedInfo: companyInfo,
      message: "Bedrijfsinfo succesvol opgehaald (debug mode)",
    });
  } catch (error) {
    console.error("Company info fetch error:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan bij het ophalen van bedrijfsinfo" },
      { status: 500 }
    );
  }
}