import axios from 'axios';

export interface LinkedInPostData {
  content: string;
  imageUrl?: string;
  title?: string;
  linkUrl?: string;
}

export interface LinkedInCredentials {
  accessToken: string;
  personId?: string;
}

export enum LinkedInMethod {
  DIRECT_API = 'direct_api',
  SHARE_API_V2 = 'share_api_v2',
  BUFFER = 'buffer',
  ZAPIER = 'zapier',
  MAKE_COM = 'make_com',
  COPY_PASTE = 'copy_paste'
}

class LinkedInService {
  private baseURL = 'https://api.linkedin.com/v2';

  async postContent(
    method: LinkedInMethod,
    data: LinkedInPostData,
    credentials?: LinkedInCredentials
  ): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
      switch (method) {
        case LinkedInMethod.DIRECT_API:
          return await this.postViaDirectAPI(data, credentials!);

        case LinkedInMethod.SHARE_API_V2:
          return await this.postViaShareAPIv2(data, credentials!);

        case LinkedInMethod.BUFFER:
          return await this.postViaBuffer(data);

        case LinkedInMethod.ZAPIER:
          return await this.postViaZapier(data);

        case LinkedInMethod.MAKE_COM:
          return await this.postViaMake(data);

        case LinkedInMethod.COPY_PASTE:
          return this.prepareCopyPaste(data);

        default:
          throw new Error(`Unsupported LinkedIn method: ${method}`);
      }
    } catch (error) {
      console.error(`LinkedIn posting error (${method}):`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Onbekende fout bij LinkedIn posting'
      };
    }
  }

  private async postViaDirectAPI(
    data: LinkedInPostData,
    credentials: LinkedInCredentials
  ): Promise<{ success: boolean; url?: string; error?: string }> {
    if (!credentials.accessToken || !credentials.personId) {
      throw new Error('LinkedIn access token en person ID zijn verplicht voor Direct API');
    }

    // Create post data for LinkedIn UGC API
    const postData = {
      author: `urn:li:person:${credentials.personId}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: data.content
          },
          shareMediaCategory: data.imageUrl ? 'IMAGE' : 'NONE',
          ...(data.imageUrl && {
            media: [{
              status: 'READY',
              description: {
                text: data.title || 'GenPostAI Content'
              },
              media: data.imageUrl,
              title: {
                text: data.title || 'GenPostAI Post'
              }
            }]
          })
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    };

    const response = await axios.post(
      `${this.baseURL}/ugcPosts`,
      postData,
      {
        headers: {
          'Authorization': `Bearer ${credentials.accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        }
      }
    );

    if (response.status === 201) {
      const postId = response.data.id;
      return {
        success: true,
        url: `https://www.linkedin.com/feed/update/${postId}/`
      };
    }

    throw new Error('Direct API posting mislukt');
  }

  private async postViaShareAPIv2(
    data: LinkedInPostData,
    credentials: LinkedInCredentials
  ): Promise<{ success: boolean; url?: string; error?: string }> {
    if (!credentials.accessToken) {
      throw new Error('LinkedIn access token is verplicht voor Share API v2');
    }

    // Create share data for LinkedIn Shares API v2
    const shareData = {
      owner: `urn:li:person:${credentials.personId || 'me'}`,
      text: {
        text: data.content
      },
      ...(data.linkUrl && {
        content: {
          contentEntities: [{
            entityLocation: data.linkUrl,
            thumbnails: data.imageUrl ? [{
              resolvedUrl: data.imageUrl
            }] : []
          }],
          title: data.title || 'GenPostAI Content',
          shareMediaCategory: data.imageUrl ? 'IMAGE' : 'ARTICLE'
        }
      })
    };

    const response = await axios.post(
      `${this.baseURL}/shares`,
      shareData,
      {
        headers: {
          'Authorization': `Bearer ${credentials.accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.status === 201) {
      const shareId = response.data.id;
      return {
        success: true,
        url: `https://www.linkedin.com/feed/update/urn:li:share:${shareId}/`
      };
    }

    throw new Error('Share API v2 posting mislukt');
  }

  private async postViaBuffer(data: LinkedInPostData): Promise<{ success: boolean; url?: string; error?: string }> {
    // Buffer integration would require Buffer API key and webhook setup
    // For now, return instructions for manual posting via Buffer
    const bufferContent = `${data.content}\n\n${data.imageUrl ? `[Image: ${data.imageUrl}]` : ''}\n\n${data.linkUrl ? `Link: ${data.linkUrl}` : ''}`;

    return {
      success: true,
      url: undefined, // Will be set when Buffer processes it
      error: `Buffer integratie vereist configuratie. Gebruik deze content: ${bufferContent}`
    };
  }

  private async postViaZapier(data: LinkedInPostData): Promise<{ success: boolean; url?: string; error?: string }> {
    // Zapier webhook integration
    const zapierWebhookUrl = process.env.ZAPIER_LINKEDIN_WEBHOOK;

    if (!zapierWebhookUrl) {
      throw new Error('Zapier webhook URL niet geconfigureerd');
    }

    const response = await axios.post(zapierWebhookUrl, {
      content: data.content,
      imageUrl: data.imageUrl,
      title: data.title,
      linkUrl: data.linkUrl,
      timestamp: new Date().toISOString()
    });

    if (response.status === 200) {
      return {
        success: true,
        url: undefined // Zapier will handle the posting
      };
    }

    throw new Error('Zapier posting mislukt');
  }

  private async postViaMake(data: LinkedInPostData): Promise<{ success: boolean; url?: string; error?: string }> {
    // Make.com (formerly Integromat) webhook integration
    const makeWebhookUrl = process.env.MAKE_LINKEDIN_WEBHOOK;

    if (!makeWebhookUrl) {
      throw new Error('Make.com webhook URL niet geconfigureerd');
    }

    const response = await axios.post(makeWebhookUrl, {
      content: data.content,
      imageUrl: data.imageUrl,
      title: data.title,
      linkUrl: data.linkUrl,
      timestamp: new Date().toISOString()
    });

    if (response.status === 200) {
      return {
        success: true,
        url: undefined // Make.com will handle the posting
      };
    }

    throw new Error('Make.com posting mislukt');
  }

  private prepareCopyPaste(data: LinkedInPostData): { success: boolean; url?: string; error?: string } {
    // Prepare content for manual copy-paste
    const copyContent = `${data.content}\n\n${data.linkUrl ? `${data.linkUrl}\n\n` : ''}${data.imageUrl ? `[Afbeelding: ${data.imageUrl}]\n\n` : ''}#GenPostAI #AIContent`;

    return {
      success: true,
      url: undefined,
      error: `Kopieer en plak deze content handmatig: ${copyContent}`
    };
  }

  // Helper method to get LinkedIn person ID from access token
  async getPersonId(accessToken: string): Promise<string> {
    try {
      const response = await axios.get(`${this.baseURL}/people/~`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      return response.data.id;
    } catch (error) {
      throw new Error('Kon LinkedIn person ID niet ophalen');
    }
  }

  // Validate LinkedIn access token
  async validateToken(accessToken: string): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseURL}/people/~`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
}

export const linkedinService = new LinkedInService();