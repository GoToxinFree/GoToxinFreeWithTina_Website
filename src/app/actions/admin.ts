"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

/**
 * Ensures the user is an admin before proceeding
 */
async function ensureAdmin() {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
}

/**
 * PROFILE ACTIONS
 */
export async function getProfile() {
  try {
    await ensureAdmin();
    const session = await auth();
    const email = session?.user?.email;
    if (!email) return null;
    
    return await prisma.user.findUnique({
      where: { email },
      select: { name: true, image: true, email: true }
    });
  } catch (error) {
    return null;
  }
}

export async function updateProfile(data: { name: string; image: string }) {
  try {
    await ensureAdmin();

    const session = await auth();
    const email = session?.user?.email;

    if (!email) throw new Error("No user email found");

    await prisma.user.update({
      where: { email },
      data: {
        name: data.name,
        image: data.image
      }
    });

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error: any) {
    console.error("Profile Action Error:", error);
    return { success: false, error: error.message || "Failed to update profile" };
  }
}

/**
 * BLOG MANAGEMENT ACTIONS
 */
export async function updatePost(id: string, data: any) {
  try {
    await ensureAdmin();

    await prisma.post.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        imageUrl: data.imageUrl,
        published: data.published
      }
    });

    revalidatePath("/admin/posts");
    revalidatePath("/blog");
    revalidatePath(`/blog/${data.slug}`);
    return { success: true };
  } catch (error: any) {
    console.error("Update Post Action Error:", error);
    return { success: false, error: error.message || "Failed to update post" };
  }
}

export async function deletePost(id: string) {
  try {
    await ensureAdmin();

    await prisma.post.delete({
      where: { id }
    });

    revalidatePath("/admin/posts");
    revalidatePath("/blog");
    return { success: true };
  } catch (error: any) {
    console.error("Delete Post Action Error:", error);
    return { success: false, error: error.message || "Failed to delete post" };
  }
}

export async function createPost(data: any) {
  try {
    await ensureAdmin();

    const session = await auth();
    const email = session?.user?.email;

    if (!email) throw new Error("No user email found");

    const post = await prisma.post.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        imageUrl: data.imageUrl,
        published: data.published,
        author: {
          connect: { email }
        }
      }
    });

    revalidatePath("/admin/posts");
    revalidatePath("/blog");
    return { success: true, post };
  } catch (error: any) {
    console.error("Create Post Action Error:", error);
    return { success: false, error: error.message || "Failed to create post" };
  }
}

/**
 * SUBSCRIBER MANAGEMENT
 */
export async function toggleSubscriberStatus(id: string, currentStatus: string) {
  try {
    await ensureAdmin();
    const newStatus = currentStatus === 'active' ? 'unsubscribed' : 'active';
    await prisma.subscriber.update({
      where: { id },
      data: { status: newStatus }
    });
    revalidatePath("/admin/subscribers");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteSubscriber(id: string) {
  try {
    await ensureAdmin();
    await prisma.subscriber.delete({ where: { id } });
    revalidatePath("/admin/subscribers");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getSubscribers() {
  try {
    await ensureAdmin();
    return await prisma.subscriber.findMany({ orderBy: { createdAt: 'desc' } });
  } catch (error) {
    return [];
  }
}

/**
 * COMMENT MANAGEMENT
 */
export async function deleteComment(id: string) {
  try {
    await ensureAdmin();
    await prisma.comment.delete({ where: { id } });
    revalidatePath("/admin/comments");
    revalidatePath("/blog/[slug]", "page");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function toggleCommentApproval(id: string, currentPublished: boolean) {
  try {
    await ensureAdmin();
    await prisma.comment.update({
      where: { id },
      data: { status: !currentPublished ? "approved" : "pending" }
    });
    revalidatePath("/admin/comments");
    revalidatePath("/blog/[slug]", "page");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function notifySubscribersOfNewPost(postId: string) {
  try {
    await ensureAdmin();

    const post = await prisma.post.findUnique({
      where: { id: postId }
    });

    if (!post || !post.published) {
      throw new Error("Post not found or not published");
    }

    const subscribers = await prisma.subscriber.findMany({
      where: { status: 'active' },
      select: { email: true }
    });

    if (subscribers.length === 0) {
      return { success: true, message: "No active subscribers to notify." };
    }

    const { sendNewPostNotification } = await import("@/lib/mail");
    const emails = subscribers.map(s => s.email);
    
    const results = await sendNewPostNotification(emails, post);
    const successCount = results.filter(r => r.success).length;

    return { success: true, count: successCount, total: emails.length };
  } catch (error: any) {
    console.error("Newsletter Notification Error:", error);
    return { success: false, error: error.message };
  }
}


export async function sendNewsletterSummaryAction(postIds: string[]) {
  try {
    await ensureAdmin();

    const posts = await prisma.post.findMany({
      where: { id: { in: postIds }, published: true },
      select: { title: true, excerpt: true, slug: true }
    });

    if (posts.length === 0) {
      throw new Error("No published posts found to summarize.");
    }

    const subscribers = await prisma.subscriber.findMany({
      where: { status: 'active' },
      select: { email: true }
    });

    if (subscribers.length === 0) {
      return { success: true, message: "No active subscribers to notify." };
    }

    const { sendNewsletterSummary } = await import("@/lib/mail");
    const emails = subscribers.map(s => s.email);
    
    await sendNewsletterSummary(emails, posts);

    return { success: true, count: emails.length };
  } catch (error: any) {
    console.error("Newsletter Summary Error:", error);
    return { success: false, error: error.message };
  }
}
export async function exportPosts() {
  try {
    await ensureAdmin();
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, data: posts };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
