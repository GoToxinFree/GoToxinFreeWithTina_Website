import Link from 'next/link';
import { ArrowLeft, Leaf } from 'lucide-react';
import styles from './page.module.css';
import headerStyles from '../page.module.css'; // Reusing header/footer styles

export default function About() {
  return (
    <div>
      <header className={headerStyles.header}>
        <div className={`container ${headerStyles.headerContainer}`}>
          <Link href="/" className={headerStyles.logo}>
            <Leaf size={24} color="var(--accent)" />
            GoToxinFree<span>WithTina</span>
          </Link>
          <nav className={headerStyles.nav}>
            <Link href="/" className={headerStyles.navLink}>Home</Link>
            <Link href="/about" className={headerStyles.navLink} style={{color: 'var(--secondary)'}}>About Tina</Link>
            <Link href="/research" className={headerStyles.navLink}>Methodology</Link>
            <Link href="/contact" className={headerStyles.navLink}>Contact</Link>
            <Link href="/#articles" className={headerStyles.navLink}>Articles</Link>
          </nav>
        </div>
      </header>

      <section className={styles.aboutHero}>
        <div className="container">
          <h1>Hi, I'm Tina</h1>
          <p>Advocate, researcher, and your guide to navigating a chemical-heavy world safely.</p>
        </div>
      </section>

      <main className={`container ${styles.aboutMain}`}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <div className={styles.aboutContent}>
          <div className={styles.imageContainer}>
            {/* Placeholder for Tina's Headshot */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" alt="Tina, founder of Go Toxin Free" />
          </div>
          
          <div className={styles.textContent}>
            <h2>My Journey to Toxin-Free Living</h2>
            <p>
              A few years ago, I started experiencing unexplained allergies and fatigue. After countless doctor visits and personal research, I discovered the shocking truth: our daily environment—from our couches to our cleaning supplies—is filled with unregulated, synthetic chemicals.
            </p>
            <p>
              I decided to take control of my environment. I began reading ingredient labels, researching chemical impacts, and swapping out toxic products for natural, safe alternatives. The difference in my health was astounding.
            </p>
            <p>
              <strong>Go Toxin Free With Tina</strong> was born out of a desire to share this research with you. Navigating ingredient lists and scientific studies can be overwhelming. My goal is to simplify this process, providing you with clear, evidence-based insights so you can make informed decisions for yourself and your family.
            </p>
            <p>
              Together, we can create safer homes and advocate for a healthier planet.
            </p>
          </div>
        </div>
      </main>

      <footer className={headerStyles.footer}>
        <div className={`container ${headerStyles.footerBottom}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
          <span>&copy; {new Date().getFullYear()} Go Toxin Free With Tina. All rights reserved.</span>
          <Link href="/login" style={{ color: 'inherit', opacity: 0.3 }} aria-label="Admin Login">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </Link>
        </div>
      </footer>
    </div>
  );
}
