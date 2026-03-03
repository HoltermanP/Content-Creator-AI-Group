# GenPostAI - AI-gedreven LinkedIn Content Creatie

Een moderne Next.js applicatie voor het genereren van professionele LinkedIn content met AI.

## 🚀 Snel Starten

### 1. Environment Variables Opzetten

Maak een `.env.local` bestand aan in de root van het project:

```bash
# Database
DATABASE_URL="file:./dev.db"

# NextAuth.js Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-min-32-chars"

# Email Configuration (voor email verificatie)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="jouw-email@gmail.com"
EMAIL_SERVER_PASSWORD="jouw-app-wachtwoord"
EMAIL_FROM="noreply@genpostai.com"

# OpenAI API Key (voor AI functies)
OPENAI_API_KEY="jouw-openai-api-key"
```

### 2. Database Opzetten

```bash
# Database migreren
npx prisma migrate dev

# Prisma Studio (optioneel, voor database beheer)
npx prisma studio
```

### 3. Development Server Starten

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

## 📧 Email Verificatie Setup

Voor volledige functionaliteit moet je email verificatie opzetten:

### Gmail SMTP (Aanbevolen)
1. Ga naar je Google Account instellingen
2. Activeer "2-staps verificatie"
3. Genereer een "App wachtwoord" voor GenPostAI
4. Gebruik dit app wachtwoord in `EMAIL_SERVER_PASSWORD`

### Alternatieve Email Providers
Je kunt ook andere SMTP providers gebruiken zoals:
- SendGrid
- Mailgun
- AWS SES
- Postmark

## ✨ Belangrijke Features

- **AI Content Generatie**: Automatische LinkedIn posts met GPT-4
- **Bedrijfsprofielen**: Beheer meerdere bedrijven
- **Email Verificatie**: Beveiligde login flow
- **Website Import**: Automatisch bedrijfsinformatie ophalen
- **Content Planning**: Geplande posts beheren
- **Analytics**: Prestaties bijhouden

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Authentication**: NextAuth.js
- **Database**: SQLite met Prisma ORM
- **UI**: Shadcn/ui + Tailwind CSS
- **AI**: OpenAI GPT-4
- **Email**: Nodemailer voor verificatie

## 📝 Development

```bash
# Dependencies installeren
npm install

# Development server
npm run dev

# Build voor productie
npm run build

# Linting
npm run lint
```

## 🚀 Deployment

De app is geoptimaliseerd voor deployment op Vercel, Netlify of andere moderne hosting platforms.

Voor productie deployment, zorg ervoor dat alle environment variables correct zijn ingesteld in je hosting platform.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
