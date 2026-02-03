import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Je bent niet ingelogd of je sessie is verlopen. Log opnieuw in om door te gaan.' },
        { status: 401 }
      );
    }

    // Get or create user's organization
    let userOrganization = await prisma.userOrganization.findFirst({
      where: { userId: user.id },
      include: { organization: true }
    });

    if (!userOrganization) {
      // Auto-create organization for user (zelfde flow als bij sign-in)
      const orgName = user.name || (user.email ?? 'user').split('@')[0];
      const organization = await prisma.organization.create({
        data: {
          name: `${orgName}'s Organisatie`,
          slug: `org-${user.id.slice(0, 8)}-${Date.now()}`,
        }
      });
      await prisma.userOrganization.create({
        data: {
          userId: user.id,
          organizationId: organization.id,
          role: 'OWNER',
        }
      });
      await prisma.subscription.create({
        data: {
          userId: user.id,
          organizationId: organization.id,
          plan: 'PLUS',
          creditsLimit: 50,
        }
      });
      await prisma.credit.create({
        data: {
          userId: user.id,
          organizationId: organization.id,
          amount: 50,
          type: 'PURCHASE',
          description: 'Initiële Plus abonnement credits',
        }
      });
      userOrganization = await prisma.userOrganization.findFirst({
        where: { userId: user.id },
        include: { organization: true }
      });
    }

    // Get all companies for the organization
    const companies = await prisma.company.findMany({
      where: {
        organizationId: userOrganization!.organizationId
      },
      include: {
        _count: {
          select: {
            posts: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Transform to match frontend interface
    const transformedCompanies = companies.map(company => ({
      id: company.id,
      name: company.name,
      industry: company.industry,
      description: company.description,
      website: company.website,
      logo: company.logo,
      linkedinUrl: company.linkedinUrl,
      location: null, // Not in schema, can be derived from other fields
      employeeCount: null, // Not in schema
      founded: null, // Not in schema
      targetAudience: null, // Not in schema
      brandVoice: null, // Not in schema
      keyTopics: [], // Not in schema
      socialLinks: {
        linkedin: company.linkedinUrl
      },
      createdAt: company.createdAt.toISOString(),
      updatedAt: company.updatedAt.toISOString(),
      postCount: company._count.posts,
      publishedPostCount: company._count.posts // For now, assume all posts are published
    }));

    return NextResponse.json(transformedCompanies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Je bent niet ingelogd of je sessie is verlopen. Log opnieuw in om door te gaan.' },
        { status: 401 }
      );
    }

    // Get or create user's organization (zelfde flow als GET)
    let userOrganization = await prisma.userOrganization.findFirst({
      where: { userId: user.id },
      include: { organization: true }
    });

    if (!userOrganization) {
      const orgName = user.name || (user.email ?? 'user').split('@')[0];
      const organization = await prisma.organization.create({
        data: {
          name: `${orgName}'s Organisatie`,
          slug: `org-${user.id.slice(0, 8)}-${Date.now()}`,
        }
      });
      await prisma.userOrganization.create({
        data: {
          userId: user.id,
          organizationId: organization.id,
          role: 'OWNER',
        }
      });
      await prisma.subscription.create({
        data: {
          userId: user.id,
          organizationId: organization.id,
          plan: 'PLUS',
          creditsLimit: 50,
        }
      });
      await prisma.credit.create({
        data: {
          userId: user.id,
          organizationId: organization.id,
          amount: 50,
          type: 'PURCHASE',
          description: 'Initiële Plus abonnement credits',
        }
      });
      userOrganization = await prisma.userOrganization.findFirst({
        where: { userId: user.id },
        include: { organization: true }
      });
    }

    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    if (!name) {
      return NextResponse.json(
        { error: 'Bedrijfsnaam is verplicht' },
        { status: 400 }
      );
    }

    // Create company
    const company = await prisma.company.create({
      data: {
        organizationId: userOrganization!.organizationId,
        name,
        industry: body.industry || null,
        description: body.description || null,
        website: body.website || null,
        linkedinUrl: body.linkedinUrl || body.socialLinks?.linkedin || null,
        logo: body.logo || null
      },
      include: {
        _count: {
          select: {
            posts: true
          }
        }
      }
    });

    // Transform to match frontend interface
    const transformedCompany = {
      id: company.id,
      name: company.name,
      industry: company.industry,
      description: company.description,
      website: company.website,
      logo: company.logo,
      linkedinUrl: company.linkedinUrl,
      location: null,
      employeeCount: null,
      founded: null,
      targetAudience: null,
      brandVoice: null,
      keyTopics: [],
      socialLinks: {
        linkedin: company.linkedinUrl
      },
      createdAt: company.createdAt.toISOString(),
      updatedAt: company.updatedAt.toISOString(),
      postCount: company._count.posts,
      publishedPostCount: company._count.posts
    };

    return NextResponse.json(transformedCompany, { status: 201 });
  } catch (error) {
    console.error('Error creating company:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}