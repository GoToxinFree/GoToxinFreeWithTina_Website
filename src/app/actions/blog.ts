"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * NEWSLETTER ACTIONS
 */
export async function subscribeToNewsletter(email: string) {
  try {
    if (!email || !email.includes('@')) {
      throw new Error("Please provide a valid email address.");
    }

    // Check if already subscribed
    const existing = await prisma.subscriber.findUnique({
      where: { email }
    });

    if (existing) {
      return { success: true, message: "You are already subscribed! Thank you." };
    }

    await prisma.subscriber.create({
      data: { email }
    });

    return { success: true, message: "Welcome to the community! Check your inbox soon." };
  } catch (error: any) {
    console.error("Newsletter Action Error:", error);
    return { success: false, error: error.message || "Failed to subscribe. Please try again." };
  }
}

/**
 * COMMENT ACTIONS
 */
export async function postComment(data: { 
  postId: string; 
  content: string; 
  authorName: string; 
  authorEmail: string; 
  parentId?: string | null 
}) {
  try {
    const { postId, content, authorName, authorEmail, parentId } = data;

    const comment = await prisma.comment.create({
      data: {
        content,
        authorName,
        authorEmail,
        postId,
        parentId: parentId || null,
        status: "approved" // Default to approved for now as per previous logic
      },
      include: {
        replies: true
      }
    });

    revalidatePath(`/blog/[slug]`, 'page');
    return { success: true, comment };
  } catch (error: any) {
    console.error("Comment Action Error:", error);
    return { success: false, error: error.message || "Failed to post comment." };
  }
}
