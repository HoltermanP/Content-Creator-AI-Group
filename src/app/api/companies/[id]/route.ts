import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: companyId } = await params;
    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Je bent niet ingelogd of je sessie is verlopen. Log opnieuw in om door te gaan.' },
        { status: 401 }
      );
    }

    // Get user's organization
    const userOrganization = await prisma.userOrganization.findFirst({
      where: { userId: user.id },
      include: { organization: true }
    });

    if (!userOrganization) {
      return NextResponse.json(
        { error: 'Je hebt nog geen organisatie. Herlaad de pagina of log opnieuw in.' },
        { status: 404 }
      );
    }

    const body = await request.json();

    // Check if company exists and belongs to user's organization
    const existingCompany = await prisma.company.findFirst({
      where: {
        id: companyId,
        organizationId: userOrganization.organizationId
      }
    });

    if (!existingCompany) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    // Update company
    const company = await prisma.company.update({
      where: { id: companyId },
      data: {
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
        linkedin: company.linkedinUrl
      },
      createdAt: company.createdAt.toISOString(),
      updatedAt: company.updatedAt.toISOString(),
      postCount: company._count.posts,
      publishedPostCount: company._count.posts
    };

    return NextResponse.json(transformedCompany);
  } catch (error) {
    console.error('Error updating company:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: companyId } = await params;
    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Je bent niet ingelogd of je sessie is verlopen. Log opnieuw in om door te gaan.' },
        { status: 401 }
      );
    }

    // Get user's organization
    const userOrganization = await prisma.userOrganization.findFirst({
      where: { userId: user.id },
      include: { organization: true }
    });

    if (!userOrganization) {
      return NextResponse.json(
        { error: 'Je hebt nog geen organisatie. Herlaad de pagina of log opnieuw in.' },
        { status: 404 }
      );
    }

    // Check if company exists and belongs to user's organization
    const existingCompany = await prisma.company.findFirst({
      where: {
        id: companyId,
        organizationId: userOrganization.organizationId
      }
    });

    if (!existingCompany) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    // Delete company
    await prisma.company.delete({
      where: { id: companyId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting company:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}