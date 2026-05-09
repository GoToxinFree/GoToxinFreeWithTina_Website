import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
  let posts: Awaited<ReturnType<typeof getLatestPosts>> = [];
  let user: { image: string | null } | null = null;
  let fetchError = null;

  try {
    posts = await getLatestPosts();
    // Fetch the admin user to get their profile photo
    user = await prisma.user.findFirst({ select: { image: true } });
  } catch (err: unknown) {
    console.error("Home page fetch error:", err);
    fetchError = (err as Error).message;
  }

  const ownerImage = user?.image || "/owner.jpeg";

  return (
    <div className="main">
      {fetchError && (
        <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
          Database Error: {fetchError}. Please ensure the database is initialized.
        </div>
      )}
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="home-hero">
        <div className={`container home-hero-content`}>
          <h1 className="animate-fade-in">Hi, I&apos;m Dr. Supriti Das (Ph.D.)</h1>
          <p className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            A **Global Environmental Researcher** decoding the science of toxins. I translate years of rigorous scientific study into simple, actionable steps for a safer, cleaner life.
          </p>
          <div className="home-hero-buttons animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Link href="#articles" className="btn-primary">
              Explore the Research
            </Link>
            <Link href="/about" className="btn-secondary" style={{ borderColor: 'white', color: 'white' }} prefetch={false}>
              The Story Behind the Science
            </Link>
          </div>
        </div>
      </section>

      {/* Mini About Section */}
      <section className="bg-surface section-padding">
        <div className="container home-about-section">
          <div style={{ flexShrink: 0, width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', border: '4px solid white', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ownerImage} alt="Dr. Supriti Das" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>Evidence-Based Advocacy</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '1.05rem', textAlign: 'justify', hyphens: 'auto' }}>
              With a background spanning elite research institutions in **India and Japan**, I have dedicated my career to understanding how environmental toxins affect our health. I founded this blog to bridge the gap between high-level laboratory research and our everyday homes—cutting through the noise to find what truly keeps us safe.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', width: '100%', maxWidth: '450px', marginTop: '1.5rem' }}>
              <Link href="/about" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', flex: 1, padding: '0.75rem 0.5rem', fontSize: '0.9rem', whiteSpace: 'nowrap' }} prefetch={false}>
                About My Mission <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', flex: 1, padding: '0.75rem 0.5rem', fontSize: '0.9rem', whiteSpace: 'nowrap' }} prefetch={false}>
                Get in Touch <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content (Blog Grid) */}
      <main className="container home-blog-section" id="articles">
        <div className="home-section-header centered">
          <h2>Latest Insights & Research</h2>
        </div>

        <div className="grid-3">
          {posts.length === 0 ? (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
              Our research team is currently preparing new insights. Check back soon!
            </p>
          ) : (
            posts.map(post => (
              <article key={post.id} className="home-card">
                <div className="home-card-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.imageUrl || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600"} alt={post.title} />
                </div>
                <div className="home-card-content">
                  <time className="home-card-date">{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                  <h3 className="home-card-title">{post.title}</h3>
                  <p className="home-card-excerpt">{post.excerpt || post.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...'}</p>
                  <Link href={`/blog/${post.slug}`} className="btn-outline" style={{ width: 'fit-content', marginTop: '1rem' }} prefetch={false}>
                    Read Full Article <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="home-section-footer">
          <Link href="/blog" className="btn-outline" style={{ minWidth: '200px', justifyContent: 'center' }} prefetch={false}>
            View All Articles <ArrowRight size={16} />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
