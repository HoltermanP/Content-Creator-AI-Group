# Bestaande Neon-database leegmaken (voor verse migraties)

Als je een **bestaande** Neon-database koppelt en Prisma geeft **P3005** ("The database schema is not empty"), of als een migratie **mislukt** is (**P3009** / **P3018**) en je opnieuw wilt proberen, moet de database eerst leeg zijn voordat `prisma migrate deploy` kan draaien.

## Stap 1: Database leegmaken in Neon

1. Ga naar **Neon Console** → je project → **SQL Editor**.
2. Voer het onderstaande SQL uit. Dit verwijdert alle tabellen in het `public`-schema (inclusief `_prisma_migrations`).

```sql
-- Alle tabellen en het schema verwijderen (inclusief _prisma_migrations)
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO public;
```

3. Klik op **Run**. De database is nu leeg.

## Stap 2: Opnieuw deployen op Vercel

Trigger een nieuwe deploy (Redeploy of push naar master). Tijdens de build voert `prisma migrate deploy` de init-migratie uit en bouwt het schema opnieuw op.

---

**Let op:** Dit verwijdert **alle data** in de database. Doe dit alleen als je de database echt opnieuw wilt opbouwen.
