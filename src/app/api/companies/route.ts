import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's organization
    const userOrganization = await prisma.userOrganization.findFirst({
      where: { userId: session.user.id },
      include: { organization: true }
    });

    if (!userOrganization) {
      return NextResponse.json({ error: 'User not in an organization' }, { status: 404 });
    }

    // Get all companies for the organization
    const companies = await prisma.company.findMany({
      where: {
        organizationId: userOrganization.organizationId
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
        linkedin: company.linkedinUrl,
        twitter: null,
        facebook: null
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
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's organization
    const userOrganization = await prisma.userOrganization.findFirst({
      where: { userId: session.user.id },
      include: { organization: true }
    });

    if (!userOrganization) {
      return NextResponse.json({ error: 'User not in an organization' }, { status: 404 });
    }

    const body = await request.json();

    // Create company
    const company = await prisma.company.create({
      data: {
        organizationId: userOrganization.organizationId,
        name: body.name,
        industry: body.industry,
        description: body.description,
        website: body.website,
        linkedinUrl: body.linkedinUrl || body.socialLinks?.linkedin,
        logo: body.logo
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
        linkedin: company.linkedinUrl,
        twitter: null,
        facebook: null
      },
      createdAt: company.createdAt.toISOString(),
      updatedAt: company.updatedAt.toISOString(),
      postCount: company._count.posts,
      publishedPostCount: company._count.posts
    };

    return NextResponse.json(transformedCompany, { status: 201 });
  } catch (error) {
    console.error('Error creating company:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}