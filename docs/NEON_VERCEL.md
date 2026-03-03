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

**Let op:** de waarde moet beginnen met `postgresql://` en mag geen spaties of aanhalingstekens bevatten.

## Neon IP allowlist

Als je in Neon een **IP allowlist** hebt ingesteld, sta dan alle IP’s toe (0.0.0.0/0) of voeg de IP-ranges van Vercel toe, anders kunnen builds geen verbinding maken.

Neon Console → Project → Settings → IP allowlist.
