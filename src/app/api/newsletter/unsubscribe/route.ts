import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return new NextResponse('Invalid request', { status: 400 });
    }

    const decodedEmail = decodeURIComponent(email);

    const subscriber = await prisma.subscriber.findUnique({
      where: { email: decodedEmail }
    });

    if (!subscriber) {
      return new NextResponse(`
        <div style="font-family: sans-serif; text-align: center; padding: 50px;">
          <h1>Subscription Not Found</h1>
          <p>We couldn't find a subscription for <strong>${decodedEmail}</strong>.</p>
          <a href="/" style="color: #00a6ce;">Back to Website</a>
        </div>
      `, { headers: { 'Content-Type': 'text/html' } });
    }

    await prisma.subscriber.update({
      where: { email: decodedEmail },
      data: { status: 'unsubscribed' }
    });

    return new NextResponse(`
      <div style="font-family: sans-serif; text-align: center; padding: 50px; color: #1e293b;">
        <div style="max-width: 500px; margin: 0 auto; padding: 40px; border: 1px solid #e2e8f0; border-radius: 12px; background: #f8fafc;">
          <h1 style="color: #004e64;">Unsubscribed Successfully</h1>
          <p style="font-size: 16px; line-height: 1.6;">
            You have been removed from the <strong>Go Toxin Free With Tina</strong> mailing list.
          </p>
          <p style="font-size: 14px; color: #64748b;">
            We're sorry to see you go! You can resubscribe anytime from our homepage.
          </p>
          <div style="margin-top: 30px;">
            <a href="/" style="background: #00a6ce; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">
              Back to Home
            </a>
          </div>
        </div>
      </div>
    `, { headers: { 'Content-Type': 'text/html' } });

  } catch (error) {
    console.error('Unsubscribe error:', error);
    return new NextResponse('An error occurred. Please try again later.', { status: 500 });
  }
}
