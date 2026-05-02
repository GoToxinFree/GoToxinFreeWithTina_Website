import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ArrowLeft, Clock, User } from 'lucide-react';
import styles from '../page.module.css';

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: { author: true }
  });

  return (
    <div style={{ backgroundColor: 'var(--surface)', minHeight: '100vh' }}>
      <header className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>
          <Link href="/" className={styles.logo}>
            GoToxinFree<span style={{color: 'var(--secondary)'}}>WithTina</span>
          </Link>
          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>Home</Link>
            <Link href="/about" className={styles.navLink}>About Tina</Link>
            <Link href="/research" className={styles.navLink}>Methodology</Link>
            <Link href="/contact" className={styles.navLink}>Contact</Link>
          </nav>
        </div>
      </header>

      <main className="container" style={{ padding: '4rem 0' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '1rem' }}>Blog & Research</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '800px' }}>
            In-depth analysis, product reviews, and evidence-based research on living a toxin-free life.
          </p>
        </div>

        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', backgroundColor: 'white', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <h2 style={{ color: 'var(--primary)' }}>No articles published yet</h2>
            <p style={{ color: 'var(--text-muted)' }}>Check back soon for new research and insights.</p>
            <Link href="/" className="btn-primary" style={{ marginTop: '1.5rem', display: 'inline-block' }}>Back to Home</Link>
          </div>
        ) : (
          <div className={styles.blogGrid}>
            {posts.map((post) => (
              <article key={post.id} className={styles.articleCard}>
                <div className={styles.articleImage}>
                  {post.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.imageUrl} alt={post.title} />
                  ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 166, 206, 0.05)', color: 'var(--secondary)' }}>
                      <FileText size={48} />
                    </div>
                  )}
                </div>
                <div className={styles.articleContent}>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {new Date(post.createdAt).toLocaleDateString()}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><User size={14} /> {post.author.name || 'Tina'}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt || 'Read our latest research on this topic...'}</p>
                  <Link href={`/blog/${post.slug}`} className={styles.readMore}>Read Full Article &rarr;</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerBottom} style={{ textAlign: 'center' }}>
            &copy; {new Date().getFullYear()} Go Toxin Free With Tina. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Stub for Lucide component
const FileText = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
);
