import Link from "next/link";
import { Leaf, ArrowRight } from "lucide-react";
import styles from "./page.module.css";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import { prisma } from "@/lib/prisma";

// Fetch latest published articles from DB
async function getLatestPosts() {
  return await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 3,
  });
}

export default async function Home() {
  let posts: any[] = [];
  let fetchError = null;

  try {
    posts = await getLatestPosts();
  } catch (err: any) {
    console.error("Home page fetch error:", err);
    fetchError = err.message;
  }

  return (
    <div className={styles.main}>
      {fetchError && (
        <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
          Database Error: {fetchError}. Please ensure the database is initialized.
        </div>
      )}
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <h1 className="animate-fade-in">Hi, I'm Tina. Let's live toxin-free.</h1>
          <p className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            I'm a researcher and advocate dedicated to uncovering the truth about everyday chemicals. Join me in creating a healthier, safer environment for our families.
          </p>
          <div className={`${styles.heroButtons} animate-fade-in`} style={{ animationDelay: "0.2s" }}>
            <Link href="#articles" className="btn-primary">
              Read Latest Research
            </Link>
            <Link href="/about" className="btn-secondary" style={{ borderColor: 'white', color: 'white' }}>
              Read My Story
            </Link>
          </div>
        </div>
      </section>

      {/* Mini About Section */}
      <section className="bg-surface section-padding">
        <div className="container" style={{ display: 'flex', gap: '3rem', alignItems: 'center', maxWidth: '900px' }}>
          <div style={{ flexShrink: 0, width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', border: '4px solid white', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300" alt="Tina" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>Welcome to my corner of the internet</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '1.05rem' }}>
              Navigating product labels and scientific studies shouldn't be a full-time job. I'm here to translate the complex research into simple, actionable steps you can take today to protect your health.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <Link href="/about" style={{ color: 'var(--secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                Learn more about my journey <ArrowRight size={16} />
              </Link>
              <Link href="/contact" style={{ color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                Get in touch <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content (Blog Grid) */}
      <main className={`container ${styles.blogSection}`} id="articles">
        <div className={styles.sectionHeader}>
          <h2>Latest Insights & Research</h2>
          <Link href="/blog" style={{ color: 'var(--secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            View All Articles <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid-3">
          {posts.length === 0 ? (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
              Our research team is currently preparing new insights. Check back soon!
            </p>
          ) : (
            posts.map(post => (
              <article key={post.id} className={styles.card}>
                <div className={styles.cardImage}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.imageUrl || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600"} alt={post.title} />
                </div>
                <div className={styles.cardContent}>
                  <time className={styles.cardDate}>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                  <h3 className={styles.cardTitle}>{post.title}</h3>
                  <p className={styles.cardExcerpt}>{post.excerpt || post.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...'}</p>
                  <Link href={`/blog/${post.slug}`} className={styles.cardReadMore}>
                    Read Full Article <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
