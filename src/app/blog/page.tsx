import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Clock, User, ArrowRight, FileText, Leaf, Search, Tag as TagIcon, Send } from 'lucide-react';
import styles from '../page.module.css';
import './listing.css';
import NewsletterForm from '@/components/blog/NewsletterForm';

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ q?: string; tag?: string }> }) {
  const { q, tag } = await searchParams;

  const allPosts = await prisma.post.findMany({
    where: { 
      published: true,
      AND: [
        q ? { title: { contains: q } } : {},
        tag ? { tags: { some: { name: tag } } } : {}
      ]
    },
    orderBy: { createdAt: 'desc' },
    include: { author: true, tags: true }
  });

  const featuredPost = !q && !tag ? allPosts[0] : null;
  const listPosts = !q && !tag ? allPosts.slice(1) : allPosts;

  const allTags = await prisma.tag.findMany({
    where: { posts: { some: { published: true } } }
  });

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
            Evidence-based research and practical guides for toxin-free living.
          </p>
          
          {/* Search Bar */}
          <div style={{ marginTop: '2.5rem', maxWidth: '600px', margin: '2.5rem auto 0', position: 'relative' }}>
            <form action="/blog" method="GET">
              <Search size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.5)' }} />
              <input 
                name="q"
                type="text" 
                placeholder="Search research articles..." 
                defaultValue={q}
                style={{ 
                  width: '100%', 
                  padding: '1.25rem 1.25rem 1.25rem 3.5rem', 
                  borderRadius: '99px', 
                  border: 'none', 
                  backgroundColor: 'rgba(255,255,255,0.1)', 
                  color: 'white', 
                  fontSize: '1.1rem',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  outline: 'none'
                }} 
              />
            </form>
          </div>
        </div>
      </section>

      <main className="container">
        {/* Tag Filters */}
        {allTags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '3rem', justifyContent: 'center' }}>
             <Link href="/blog" style={{ textDecoration: 'none' }}>
               <span style={{ 
                 padding: '0.5rem 1.25rem', 
                 borderRadius: '99px', 
                 fontSize: '0.875rem', 
                 fontWeight: 600,
                 backgroundColor: !tag ? 'var(--secondary)' : 'white',
                 color: !tag ? 'white' : 'var(--text-muted)',
                 border: '1px solid var(--border)',
                 transition: 'all 0.2s'
               }}>All Topics</span>
             </Link>
             {allTags.map(t => (
               <Link key={t.id} href={`/blog?tag=${t.name}`} style={{ textDecoration: 'none' }}>
                 <span style={{ 
                   padding: '0.5rem 1.25rem', 
                   borderRadius: '99px', 
                   fontSize: '0.875rem', 
                   fontWeight: 600,
                   backgroundColor: tag === t.name ? 'var(--secondary)' : 'white',
                   color: tag === t.name ? 'white' : 'var(--text-muted)',
                   border: '1px solid var(--border)',
                   transition: 'all 0.2s',
                   display: 'flex',
                   alignItems: 'center',
                   gap: '0.35rem'
                 }}><TagIcon size={14} /> {t.name}</span>
               </Link>
             ))}
          </div>
        )}

        {(q || tag) && (
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>
              {allPosts.length} Results for {q ? `"${q}"` : ''} {tag ? `in #${tag}` : ''}
            </h2>
            <Link href="/blog" style={{ color: 'var(--secondary)', fontSize: '0.9rem' }}>Clear all filters</Link>
          </div>
        )}

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
            {listPosts.map((post) => (
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

      {/* Newsletter Section */}
      <section style={{ backgroundColor: 'var(--primary)', padding: '5rem 0', marginTop: '5rem', color: 'white' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Stay Updated</h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem' }}>
            Get the latest toxin-free research and guides delivered straight to your inbox. 
            No spam, just evidence-based health insights.
          </p>
          <NewsletterForm />
        </div>
      </section>

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
