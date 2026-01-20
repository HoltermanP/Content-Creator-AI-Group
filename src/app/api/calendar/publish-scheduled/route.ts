import { NextRequest, NextResponse } from "next/server";
import { linkedinService, LinkedInMethod } from "@/lib/linkedin";
import { prisma } from "@/lib/prisma";

// This endpoint can be called by a cron job or manually to publish scheduled posts
export async function POST(request: NextRequest) {
  try {
    // Check for authorization header (for cron jobs)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60 * 1000);

    // Find posts that are scheduled to be published within the next 5 minutes
    const scheduledPosts = await prisma.post.findMany({
      where: {
        status: 'SCHEDULED',
        scheduledAt: {
          gte: fiveMinutesAgo,
          lte: fiveMinutesFromNow
        }
      },
      include: {
        user: {
          include: {
            accounts: {
              where: { provider: 'linkedin' }
            }
          }
        },
        company: true
      }
    });

    const results = [];

    for (const post of scheduledPosts) {
      try {
        // Default to copy-paste method if no LinkedIn account is connected
        let method = LinkedInMethod.COPY_PASTE;
        let credentials = undefined;

        const linkedinAccount = post.user.accounts[0];
        if (linkedinAccount?.access_token) {
          // Try to validate token and use Direct API if valid
          const isValid = await linkedinService.validateToken(linkedinAccount.access_token);
          if (isValid) {
            method = LinkedInMethod.DIRECT_API;
            credentials = {
              accessToken: linkedinAccount.access_token,
              personId: linkedinAccount.providerAccountId
            };
          }
        }

        // Post to LinkedIn
        const postData = {
          content: post.content,
          imageUrl: post.imageUrl || undefined,
          title: post.title
        };

        const result = await linkedinService.postContent(method, postData, credentials);

        if (result.success) {
          // Update post status
          await prisma.post.update({
            where: { id: post.id },
            data: {
              status: 'PUBLISHED',
              publishedAt: new Date(),
              linkedinUrl: result.url
            }
          });

          // Create analytics entry (only if organization exists)
          if (post.organizationId) {
            await prisma.analytics.create({
              data: {
                postId: post.id,
                organizationId: post.organizationId,
                date: new Date()
              }
            });
          }

          results.push({
            postId: post.id,
            success: true,
            linkedinUrl: result.url,
            method
          });
        } else {
          // Mark as failed
          await prisma.post.update({
            where: { id: post.id },
            data: {
              status: 'FAILED'
            }
          });

          results.push({
            postId: post.id,
            success: false,
            error: result.error
          });
        }

      } catch (error) {
        console.error(`Failed to publish post ${post.id}:`, error);

        // Mark as failed
        await prisma.post.update({
          where: { id: post.id },
          data: {
            status: 'FAILED'
          }
        });

        results.push({
          postId: post.id,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return NextResponse.json({
      message: `Processed ${scheduledPosts.length} scheduled posts`,
      results
    });

  } catch (error) {
    console.error("Scheduled publishing error:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan bij het publiceren van geplande posts" },
      { status: 500 }
    );
  }
}