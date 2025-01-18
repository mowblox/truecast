import * as mailchimp from '@mailchimp/mailchimp_marketing';
import md5 from 'md5';
import { NextRequest } from 'next/server';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});
const MAILCHIMP_AUDIENCE_ID: string = process.env.MAILCHIMP_AUDIENCE_ID as string;

export async function POST(request: NextRequest) {
  const payload: { email: string, tags: string[] } = await request.json();
  try {
    const subscriberHash = md5(payload.email.toLowerCase());
    await mailchimp.lists.getListMember(MAILCHIMP_AUDIENCE_ID, subscriberHash);
    await mailchimp.lists.updateListMemberTags(MAILCHIMP_AUDIENCE_ID, subscriberHash, {
      tags: payload.tags.map(tag => ({ name: tag, status: 'active' }))
    });
    return Response.json({ success: true, message: `We'll send you a notification when it's ready!` });
  } catch (error) {
    // console.log(error);
    try {
      await mailchimp.lists.addListMember(MAILCHIMP_AUDIENCE_ID, {
        email_address: payload.email,
        status: "subscribed",
        tags: payload.tags
      });
      return Response.json({ success: true, message: `We'll send you a notification when it's ready!` });
    } catch (error) {
      console.log(error);
      return Response.json({ success: false, message: 'Failed to subscribe!' });
    }
  }
}