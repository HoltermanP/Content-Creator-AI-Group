import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const VOORBEELD_TEMPLATES = [
  {
    name: "Nieuws Update",
    description: "Deel nieuws of een update over je bedrijf",
    category: "Nieuws",
    content: `🚀 **{{onderwerp}}**

{{boodschap}}

{{call_to_action}}

#Nieuws #{{bedrijfsnaam}} #Update`,
    variables: JSON.stringify(["onderwerp", "boodschap", "call_to_action", "bedrijfsnaam"]),
  },
  {
    name: "Thought Leadership",
    description: "Deel je expertise en inzichten",
    category: "Expertise",
    content: `💡 **{{onderwerp}}**

Mijn inzicht: {{inzicht}}

{{toelichting}}

Wat is jouw ervaring hiermee?

#ThoughtLeadership #{{onderwerp}} #Expertise`,
    variables: JSON.stringify(["onderwerp", "inzicht", "toelichting"]),
  },
  {
    name: "Klantverhaal",
    description: "Succesverhaal van een klant",
    category: "Social Proof",
    content: `🎯 **{{klant_naam}}** heeft geweldige resultaten behaald met {{oplossing}}.

{{resultaat}}

"{{quote}}" – {{contact_klant}}

#SuccessStory #Klanttevredenheid #{{bedrijfsnaam}}`,
    variables: JSON.stringify(["klant_naam", "oplossing", "resultaat", "quote", "contact_klant", "bedrijfsnaam"]),
  },
  {
    name: "Tips & Advies",
    description: "Praktische tips voor je doelgroep",
    category: "Educatief",
    content: `📌 **{{aantal}} tips voor {{onderwerp}}**

1. {{tip_1}}
2. {{tip_2}}
3. {{tip_3}}

{{afsluiting}}

#Tips #Advies #{{onderwerp}}`,
    variables: JSON.stringify(["aantal", "onderwerp", "tip_1", "tip_2", "tip_3", "afsluiting"]),
  },
  {
    name: "Product Aankondiging",
    description: "Kondig een nieuw product of feature aan",
    category: "Aankondiging",
    content: `✨ **Grote aankondiging**

We lanceren: **{{product_naam}}**

{{beschrijving}}

{{voordelen}}

Klaar om te beginnen? {{cta}}

#Lancering #Innovatie #{{product_naam}}`,
    variables: JSON.stringify(["product_naam", "beschrijving", "voordelen", "cta"]),
  },
  {
    name: "Mijlpaal Vieren",
    description: "Vier een jubileum of mijlpaal",
    category: "Celebration",
    content: `🎉 **{{mijlpaal}}!**

{{wat_gevierd}}

Dank aan iedereen die dit mogelijk heeft gemaakt. {{dankwoord}}

Op naar de volgende {{periode}}!

#Mijlpaal #Dankbaar #{{bedrijfsnaam}}`,
    variables: JSON.stringify(["mijlpaal", "wat_gevierd", "dankwoord", "periode", "bedrijfsnaam"]),
  },
  {
    name: "Vraag & Discussie",
    description: "Start een gesprek met een vraag",
    category: "Engagement",
    content: `❓ **{{vraag}}**

{{context}}

Ik hoor graag jullie mening in de comments 👇

#Discussie #LinkedIn #{{onderwerp}}`,
    variables: JSON.stringify(["vraag", "context", "onderwerp"]),
  },
  {
    name: "Behind the Scenes",
    description: "Kijkje achter de schermen",
    category: "Behind the Scenes",
    content: `📸 **Achter de schermen**

{{wat_zie_je}}

{{waarom_delen}}

Zo werken wij. {{afsluiting}}

#BehindTheScenes #Team #{{bedrijfsnaam}}`,
    variables: JSON.stringify(["wat_zie_je", "waarom_delen", "afsluiting", "bedrijfsnaam"]),
  },
  {
    name: "Trend & Inzicht",
    description: "Deel een trend of marktontwikkeling",
    category: "Trends",
    content: `📈 **Trend: {{trend_onderwerp}}**

{{ontwikkeling}}

Wat betekent dit voor {{doelgroep}}?

{{advies}}

#Trends #Markt #{{trend_onderwerp}}`,
    variables: JSON.stringify(["trend_onderwerp", "ontwikkeling", "doelgroep", "advies"]),
  },
  {
    name: "Case Study Kort",
    description: "Korte case met resultaat",
    category: "Case Study",
    content: `📊 **Case: {{klant}}**

Uitdaging: {{uitdaging}}
Oplossing: {{oplossing}}
Resultaat: {{resultaat}}

{{cta}}

#CaseStudy #Resultaten #{{bedrijfsnaam}}`,
    variables: JSON.stringify(["klant", "uitdaging", "oplossing", "resultaat", "cta", "bedrijfsnaam"]),
  },
  {
    name: "Vacature",
    description: "Deel een vacature en trek kandidaten aan",
    category: "Vacature",
    content: `💼 **We zoeken: {{functietitel}}**

Bij {{bedrijfsnaam}} zijn we op zoek naar een {{functietitel}} voor ons team.

**Wat ga je doen?**
{{taken}}

**Wat breng je mee?**
{{eisen}}

**Wat bieden wij?**
{{aanbod}}

{{cta}}

#Vacature #Hiring #{{functietitel}} #{{bedrijfsnaam}}`,
    variables: JSON.stringify(["functietitel", "bedrijfsnaam", "taken", "eisen", "aanbod", "cta"]),
  },
];

async function main() {
  const user = await prisma.user.findFirst({
    orderBy: { createdAt: "asc" },
  });

  if (!user) {
    console.log("Geen gebruiker gevonden. Maak eerst een account aan, run daarna: npx prisma db seed");
    return;
  }

  const bestaande = await prisma.template.findMany({
    where: { userId: user.id },
    select: { name: true },
  });
  const bestaandeNamen = new Set(bestaande.map((t) => t.name));

  for (const t of VOORBEELD_TEMPLATES) {
    if (bestaandeNamen.has(t.name)) {
      console.log("Bestaat al:", t.name);
      continue;
    }
    await prisma.template.create({
      data: {
        userId: user.id,
        name: t.name,
        description: t.description,
        category: t.category,
        content: t.content,
        variables: t.variables,
        isPublic: true,
      },
    });
    console.log("Toegevoegd:", t.name);
  }

  console.log("Klaar. Voorbeeldtemplates zijn verwerkt.");

  // Luit de Jong: Premium abo, voldoende credits, admin
  const luit = await prisma.user.findFirst({
    where: { name: { contains: "Luit" } },
    include: {
      subscriptions: { where: { status: "ACTIVE" }, take: 1 },
      credits: { where: { organizationId: null } },
    },
  });
  if (luit) {
    await prisma.user.update({
      where: { id: luit.id },
      data: { role: "ADMIN" },
    });
    const sub = luit.subscriptions[0];
    const PREMIUM_CREDITS_LIMIT = 250; // zoals op landingspagina
    if (sub) {
      await prisma.subscription.update({
        where: { id: sub.id },
        data: { plan: "PREMIUM", creditsLimit: PREMIUM_CREDITS_LIMIT },
      });
    } else {
      await prisma.subscription.create({
        data: {
          userId: luit.id,
          plan: "PREMIUM",
          creditsLimit: PREMIUM_CREDITS_LIMIT,
          status: "ACTIVE",
        },
      });
    }
    const totalCredits = luit.credits.reduce((s, c) => s + c.amount, 0);
    const PREMIUM_CREDITS = PREMIUM_CREDITS_LIMIT;
    if (totalCredits < PREMIUM_CREDITS) {
      await prisma.credit.create({
        data: {
          userId: luit.id,
          amount: PREMIUM_CREDITS - totalCredits,
          type: "PURCHASE",
          description: "Premium abonnement credits (seed)",
        },
      });
    }
    console.log("Luit de Jong: Premium + credits + ADMIN ingesteld.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
