import OpenAI from 'openai';
import Groq from 'groq-sdk';

let openai: OpenAI | null = null;
let groq: Groq | null = null;

// Standaard OpenAI model – kan via env worden overschreven
const CONTENT_MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";

function getOpenAI(): OpenAI {
  if (!process.env.OPENAI_API_KEY?.trim()) {
    throw new Error(
      "OPENAI_API_KEY is niet geconfigureerd. Voeg OPENAI_API_KEY toe aan je .env bestand. " +
      "Haal een key op via https://platform.openai.com/api-keys"
    );
  }
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openai;
}

function getGroq() {
  if (!groq) {
    groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }
  return groq;
}

export interface ContentGenerationParams {
  strategy: string;
  tone: string;
  companyInfo: string;
  topic: string;
  targetAudience: string;
  keyPoints?: string[];
  callToAction?: string;
  hashtags?: string[];
}

export interface ImageGenerationParams {
  style: 'TEXT_GRAPHIC' | 'VIRTUAL_ILLUSTRATION' | 'PHOTOREALISTIC';
  description: string;
  companyName: string;
}

class AIService {
  async generateContent(params: ContentGenerationParams): Promise<string> {
    const prompt = this.buildContentPrompt(params);
    // Laat fouten uit de providers doorbubbelen zodat de API-route
    // een duidelijke foutmelding kan teruggeven (bijv. ontbrekende API key).
    const response = await this.callAIProvider(prompt);
    return this.cleanContent(response);
  }

  async generateImage(params: ImageGenerationParams): Promise<string> {
    const prompt = this.buildImagePrompt(params);

    try {
      const response = await getOpenAI().images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      });

      return response.data?.[0]?.url || '';
    } catch (error) {
      console.error('Image generation error:', error);
      throw new Error('Kon afbeelding niet genereren. Probeer het opnieuw.');
    }
  }

  private async callAIProvider(prompt: string): Promise<string> {
    try {
      const completion = await getOpenAI().chat.completions.create({
        model: CONTENT_MODEL,
        messages: [
          {
            role: "system",
            content: "Je bent een professionele content creator gespecialiseerd in LinkedIn content voor Nederlandse bedrijven. Schrijf altijd in het Nederlands."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      });

      const text = completion.choices[0]?.message?.content?.trim();
      if (!text) {
        throw new Error("Geen content ontvangen van het AI-model.");
      }
      return text;
    } catch (openaiError) {
      console.error("OpenAI (GPT-5.2) content generation failed:", openaiError);
      if (process.env.GROQ_API_KEY) {
        console.log("Fallback naar Groq...");
        const completion = await getGroq().chat.completions.create({
          model: "llama3-8b-8192",
          messages: [
            { role: "system", content: "Je bent een professionele content creator gespecialiseerd in LinkedIn content voor Nederlandse bedrijven. Schrijf altijd in het Nederlands." },
            { role: "user", content: prompt }
          ],
          max_tokens: 1000,
          temperature: 0.7,
        });
        return completion.choices[0].message.content || "";
      }
      throw openaiError;
    }
  }

  private buildContentPrompt(params: ContentGenerationParams): string {
    const strategyPrompts = {
      STORYLINE_SERIE: `Schrijf een deel van een storyline serie. Maak het boeiend en laat de lezer verlangen naar het volgende deel.`,
      TIPS_ADVICE: `Geef praktische tips en advies in een reeks van 3-5 posts.`,
      STANDARD_POST: `Schrijf een standaard LinkedIn post die waarde biedt aan de lezer.`,
      ANNOUNCEMENT: `Maak een spannende aankondiging van een nieuwe feature of product.`,
      CELEBRATION: `Vier een succes, mijlpaal of prestatie.`,
      QUESTION_THREAD: `Start een discussie door een vraag te stellen en deel inzichten.`,
      POLL_DISCUSSION: `Creëer een poll vraag met context en vraag om deelname.`,
      NEWS_PUSH: `Deel breaking news of belangrijke ontwikkelingen.`,
      PHOTO_UPDATE: `Beschrijf een visuele update of momentopname.`,
      BEHIND_SCENES: `Geef een kijkje achter de schermen.`,
      EDUCATIONAL: `Deel leerzame content die professionals helpt.`,
      MILESTONE_UPDATE: `Update over voortgang, resultaten of mijlpalen.`
    };

    const tonePrompts = {
      PROFESSIONAL: `Zakelijk en professioneel taalgebruik.`,
      CASUAL: `Vriendelijk en toegankelijk taalgebruik.`,
      INSPIRING: `Motiverend en inspirerend taalgebruik.`,
      EDUCATIONAL: `Leerzaam en informatief taalgebruik.`,
      URGENT: `Dringend en actueel taalgebruik.`
    };

    let prompt = `Genereer LinkedIn content met de volgende parameters:

Strategie: ${params.strategy}
${strategyPrompts[params.strategy as keyof typeof strategyPrompts] || 'Schrijf een professionele LinkedIn post.'}

Stijl: ${params.tone}
${tonePrompts[params.tone as keyof typeof tonePrompts] || 'Gebruik professionele taal.'}

Bedrijfsinfo: ${params.companyInfo}
Onderwerp: ${params.topic}
Doelgroep: ${params.targetAudience}

`;

    if (params.keyPoints && params.keyPoints.length > 0) {
      prompt += `Belangrijke punten om te behandelen:
${params.keyPoints.map(point => `- ${point}`).join('\n')}

`;
    }

    if (params.callToAction) {
      prompt += `Call-to-action: ${params.callToAction}

`;
    }

    if (params.hashtags && params.hashtags.length > 0) {
      prompt += `Gebruik deze hashtags: ${params.hashtags.join(' ')}

`;
    }

    prompt += `
Schrijf de post alsof je namens het bedrijf spreekt. Gebruik natuurlijke, Nederlandse taal. Houd het tussen 100-300 woorden. Eindig met relevante hashtags en een call-to-action.`;

    return prompt;
  }

  private buildImagePrompt(params: ImageGenerationParams): string {
    const stylePrompts = {
      TEXT_GRAPHIC: `Creëer een tekst-gebaseerde graphic met inspirerende quotes, tips of belangrijke statistieken. Modern design met duidelijke typografie.`,
      VIRTUAL_ILLUSTRATION: `Genereer een moderne digitale illustratie in 2D/3D stijl. Creatief en innovatief ontwerp.`,
      PHOTOREALISTIC: `Maak een realistische, professionele foto die eruitziet als stock fotografie voor bedrijven.`
    };

    return `Genereer een professionele afbeelding voor LinkedIn content van ${params.companyName}.

Stijl: ${params.style}
${stylePrompts[params.style]}

Beschrijving: ${params.description}

De afbeelding moet geschikt zijn voor professionele LinkedIn content en het bedrijf ${params.companyName} vertegenwoordigen. Zorg voor een moderne, professionele uitstraling die past bij Nederlandse bedrijfscommunicatie.`;
  }

  private cleanContent(content: string): string {
    // Remove any unwanted formatting or prefixes
    return content
      .trim()
      .replace(/^["']|["']$/g, '') // Remove surrounding quotes
      .replace(/\n{3,}/g, '\n\n'); // Normalize line breaks
  }
}

export const aiService = new AIService();