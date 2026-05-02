import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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

    return NextResponse.json({ message: 'Thank you for subscribing! Keep an eye on your inbox for research updates.' });
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json({ error: 'Failed to process subscription' }, { status: 500 });
  }
}
