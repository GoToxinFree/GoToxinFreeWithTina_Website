import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditPostForm from "@/components/admin/EditPostForm";

export const dynamic = 'force-dynamic';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    notFound();
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <EditPostForm post={post} />
    </div>
  );
}
