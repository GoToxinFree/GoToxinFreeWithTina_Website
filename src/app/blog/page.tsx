import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Clock, User, ArrowRight, FileText, Leaf } from 'lucide-react';
import styles from '../page.module.css';
import './listing.css';

export default async function BlogPage() {
  const allPosts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: { author: true }
  });

  const featuredPost = allPosts[0];
  const remainingPosts = allPosts.slice(1);

  return (
    <div style={{ backgroundColor: 'var(--surface)', minHeight: '100vh' }}>
      <header className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>
          <Link href="/" className={styles.logo}>
            <Leaf size={24} color="var(--accent)" />
            GoToxinFree<span>WithTina</span>
          </Link>
          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>Home</Link>
            <Link href="/about" className={styles.navLink}>About Tina</Link>
            <Link href="/research" className={styles.navLink}>Methodology</Link>
            <Link href="/contact" className={styles.navLink}>Contact</Link>
          </nav>
        </div>
      </header>

      <section className="blogHero">
        <div className="container blogHeroContent">
          <span className="categoryTag" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
            Research & Insights
          </span>
          <h1>The Knowledge Hub</h1>
          <p>
            Evidence-based research, in-depth chemical analysis, and practical guides 
            for families pursuing a life free from environmental toxins.
          </p>
        </div>
      </section>

      <main className="container">
        {featuredPost && (
          <div className="featuredCard">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={featuredPost.imageUrl || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200"} 
              alt={featuredPost.title} 
              className="featuredImage"
            />
            <div className="featuredContent">
              <span className="categoryTag">Latest Research</span>
              <div className="postMeta">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={16} /> {new Date(featuredPost.createdAt).toLocaleDateString()}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={16} /> {featuredPost.author.name || 'Tina'}</span>
              </div>
              <h2>{featuredPost.title}</h2>
              <p style={{ fontSize: '1.1rem', marginBottom: '2.5rem' }}>{featuredPost.excerpt || 'Read our latest in-depth analysis on this environmental health topic...'}</p>
              <Link href={`/blog/${featuredPost.slug}`} className="btn-primary" style={{ width: 'fit-content', padding: '1rem 2rem' }}>
                Read Full Research <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        )}

        {allPosts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '10rem 0' }}>
            <div style={{ width: '80px', height: '80px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: 'var(--secondary)', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
              <FileText size={40} />
            </div>
            <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>No research articles found</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 2rem' }}>Our team is currently finalizing new research papers. Please check back later.</p>
            <Link href="/" className="btn-primary">Return Home</Link>
          </div>
        ) : (
          <div className="blogGrid">
            {remainingPosts.map((post) => (
              <article key={post.id} className="postCard">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={post.imageUrl || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600"} 
                  alt={post.title} 
                  className="postCardImage"
                />
                <div className="postCardContent">
                  <div className="postMeta">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt || 'A summary of our latest findings and methodology...'}</p>
                  <Link href={`/blog/${post.slug}`} className="postReadMore">
                    Read Article <ArrowRight size={18} />
                  </Link>
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
