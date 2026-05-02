import { prisma } from '@/lib/prisma';
import SubscribersClient from './SubscribersClient';

export default async function SubscribersPage() {
  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const serialized = subscribers.map(s => ({
    ...s,
    createdAt: s.createdAt.toISOString(),
  }));

  return <SubscribersClient initialSubscribers={serialized} />;
}
