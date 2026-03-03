#!/usr/bin/env sh
# Retry prisma migrate deploy (handig bij Neon cold start tijdens Vercel build)
MAX_ATTEMPTS=3
DELAY=5
attempt=1

while [ $attempt -le $MAX_ATTEMPTS ]; do
  echo "Prisma migrate deploy (poging $attempt/$MAX_ATTEMPTS)..."
  if npx prisma migrate deploy; then
    echo "Migratie geslaagd."
    exit 0
  fi
  if [ $attempt -lt $MAX_ATTEMPTS ]; then
    echo "Mislukt. Wacht ${DELAY}s voor retry..."
    sleep $DELAY
  fi
  attempt=$((attempt + 1))
done
echo "Migratie mislukt na $MAX_ATTEMPTS pogingen."
exit 1
