const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    console.log('Creating test user...');

    const hashedPassword = await bcrypt.hash('test123', 12);

    const user = await prisma.user.create({
      data: {
        name: 'Test Gebruiker',
        email: 'test@example.com',
        password: hashedPassword,
      }
    });

    console.log('User created:', user.email);

    // Create organization
    const organization = await prisma.organization.create({
      data: {
        name: 'Test Organisatie',
        slug: 'test-organisatie-' + Date.now(),
      }
    });

    console.log('Organization created:', organization.name);

    // Add user to organization
    await prisma.userOrganization.create({
      data: {
        userId: user.id,
        organizationId: organization.id,
        role: 'OWNER',
      }
    });

    // Create subscription
    await prisma.subscription.create({
      data: {
        userId: user.id,
        organizationId: organization.id,
        plan: 'PLUS',
        creditsLimit: 50,
      }
    });

    // Create credits
    await prisma.credit.create({
      data: {
        userId: user.id,
        organizationId: organization.id,
        amount: 50,
        type: 'PURCHASE',
        description: 'Initiële Plus abonnement credits',
      }
    });

    console.log('Test user setup completed!');
    console.log('Email: test@example.com');
    console.log('Password: test123');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser();