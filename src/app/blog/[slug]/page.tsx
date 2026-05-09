import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, User, Share2, Leaf, ArrowRight } from 'lucide-react';
import '../blog.css';


import CommentSection from '@/components/blog/CommentSection';

import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Update view count and fetch post
  const post = await prisma.post.update({
    where: { slug },
    data: { views: { increment: 1 } },
    include: { 
      author: true,
      comments: {
        where: { parentId: null, status: 'approved' },
        include: { 
          replies: {
            where: { status: 'approved' }
          } 
        },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!post || (!post.published && !process.env.NODE_ENV?.includes('dev'))) {
    notFound();
  }

  // Calculate reading time
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="main">
      <Header />

      <main>
        <article className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
          <Link href="/blog" className="btn-ghost" style={{ marginBottom: '2rem', marginLeft: '-0.75rem', fontSize: '0.9rem' }}>
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          {post.imageUrl && (
            <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', marginBottom: '2rem', aspectRatio: '21/9' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}

          <header style={{ marginBottom: '3rem' }}>
            {!post.published && (
              <span style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '1rem', display: 'inline-block' }}>
                DRAFT PREVIEW
              </span>
            )}
            <h1 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1.5rem', lineHeight: 1.1 }}>{post.title}</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)' }}>
                  <User size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{post.author.name || 'Tina'}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {readingTime} min read</span>
                    <span>&bull;</span>
                    <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{post.views} views</span>
                <button style={{ background: 'none', border: '1px solid var(--border)', padding: '0.5rem 1rem', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  <Share2 size={16} /> Share
                </button>
              </div>
            </div>
          </header>

          <div className="prose-content" style={{ fontSize: '1.2rem', lineHeight: 1.7, color: 'var(--text-main)' }}>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* New Comment Section */}
          <CommentSection postId={post.id} initialComments={post.comments} />
        </article>

        {/* Related Articles Section */}
        <section style={{ backgroundColor: 'var(--surface)', padding: '5rem 0', borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '3rem', textAlign: 'center' }}>Continue Exploring</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {(await prisma.post.findMany({
                where: { published: true, id: { not: post.id } },
                take: 3,
                orderBy: { createdAt: 'desc' }
              })).map(related => (
                <Link key={related.id} href={`/blog/${related.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="postCard" style={{ height: '100%', margin: 0 }}>
                    <img src={related.imageUrl || ""} alt={related.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px 12px 0 0' }} />
                    <div style={{ padding: '1.5rem' }}>
                      <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.75rem 0' }}>{related.title}</h3>
                      <div className="btn-outline" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', marginTop: '0.5rem', width: 'fit-content' }}>
                        Read Full Insight <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
