# Neon + Vercel

## Environment variables op Vercel

Zet **beide** in Vercel → Project → Settings → Environment Variables:

### 1. `DATABASE_URL` (pooled – voor de app)
- In Neon Console: **Connect** → **Pooled connection** (hostnaam bevat `-pooler`).
- Aanbevolen: voeg toe `&connect_timeout=15`.

Voorbeeld:
```
postgresql://user:pass@ep-xxx-pooler.region.aws.neon.tech/neondb?sslmode=require&channel_binding=require&connect_timeout=15
```

### 2. `DIRECT_URL` (direct – voor migraties)
- In Neon Console: **Connect** → **Direct connection** (hostnaam **zonder** `-pooler`).
- Prisma Migrate gebruikt deze verbinding tijdens de build.
- Aanbevolen: voeg toe `&connect_timeout=15`.

Voorbeeld:
```
postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require&channel_binding=require&connect_timeout=15
```

## Neon IP allowlist

Als je in Neon een **IP allowlist** hebt ingesteld, sta dan alle IP’s toe (0.0.0.0/0) of voeg de IP-ranges van Vercel toe, anders kunnen builds geen verbinding maken.

Neon Console → Project → Settings → IP allowlist.
