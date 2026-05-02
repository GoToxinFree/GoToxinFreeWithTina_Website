import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, User, Share2, Leaf } from 'lucide-react';
import styles from '../../page.module.css';
import '../blog.css';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: true }
  });

  if (!post || (!post.published && !process.env.NODE_ENV.includes('dev'))) {
    notFound();
  }

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <header className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>
          <Link href="/" className={styles.logo}>
            <Leaf size={24} color="var(--accent)" />
            GoToxinFree<span>WithTina</span>
          </Link>
          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>Home</Link>
            <Link href="/blog" className={styles.navLink} style={{color: 'var(--secondary)'}}>Blog</Link>
            <Link href="/about" className={styles.navLink}>About Tina</Link>
            <Link href="/contact" className={styles.navLink}>Contact</Link>
          </nav>
        </div>
      </header>

      <main>
        <article className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
          <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>
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
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={14} /> {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </div>
              <button style={{ background: 'none', border: '1px solid var(--border)', padding: '0.5rem 1rem', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <Share2 size={16} /> Share
              </button>
            </div>
          </header>

          <div className="prose-content" style={{ fontSize: '1.2rem', lineHeight: 1.7, color: 'var(--text-main)' }}>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </article>
      </main>

      <footer className={styles.footer} style={{ marginTop: '5rem' }}>
        <div className="container">
          <div className={styles.footerBottom} style={{ textAlign: 'center' }}>
            &copy; {new Date().getFullYear()} Go Toxin Free With Tina. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
