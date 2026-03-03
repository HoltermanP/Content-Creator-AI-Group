# Neon + Vercel

## Environment variables op Vercel

Zet in Vercel → Project → Settings → Environment Variables:

### `DATABASE_URL` (verplicht)
- In Neon Console: **Connect** → **Pooled connection** (hostnaam bevat `-pooler`).
- Gebruikt voor de app én voor migraties tijdens de build.
- Voeg toe: `&connect_timeout=15` (helpt bij Neon cold start).

Voorbeeld:
```
postgresql://user:pass@ep-xxx-pooler.region.aws.neon.tech/neondb?sslmode=require&channel_binding=require&connect_timeout=15
```

**Let op:**
- De waarde moet **exact** beginnen met `postgresql://` (geen spaties of aanhalingstekens ervoor).
- Zet de variabele voor **Production** (en eventueel Preview) op het environment dat je gebruikt voor master/Dev.
- In Vercel: plak de URL in het veld *Value* zonder extra aanhalingstekens.

## Bestaande database opnieuw opbouwen (P3005)

Als je een bestaande database koppelt en je krijgt **P3005** ("The database schema is not empty"), zie [NEON_RESET_DATABASE.md](./NEON_RESET_DATABASE.md) om de database leeg te maken zodat migraties opnieuw kunnen draaien.

## Neon IP allowlist

Als je in Neon een **IP allowlist** hebt ingesteld, sta dan alle IP’s toe (0.0.0.0/0) of voeg de IP-ranges van Vercel toe, anders kunnen builds geen verbinding maken.

Neon Console → Project → Settings → IP allowlist.
