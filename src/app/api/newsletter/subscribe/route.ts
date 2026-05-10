import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendWelcomeEmail } from '@/lib/mail';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const existing = await prisma.subscriber.findUnique({
      where: { email }
    });

    if (existing) {
      if (existing.status === 'unsubscribed') {
        await prisma.subscriber.update({
          where: { email },
          data: { status: 'active' }
        });
        return NextResponse.json({ message: 'Welcome back! Your subscription has been reactivated.' });
      }
      return NextResponse.json({ message: 'You are already subscribed!' });
    }

    await prisma.subscriber.create({
      data: { email }
    });

    try {
      await sendWelcomeEmail(email);
    } catch (mailError) {
      console.error('Failed to send welcome email:', mailError);
      // We don't fail the subscription if email fails
    }

    return NextResponse.json({ message: 'Thank you for subscribing! Check your inbox for a welcome message.' });
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json({ error: 'Failed to process subscription' }, { status: 500 });
  }
}
