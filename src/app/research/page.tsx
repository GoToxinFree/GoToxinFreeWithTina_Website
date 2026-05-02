import Link from 'next/link';
import { BookOpen, FlaskConical, Search, ShieldCheck, ArrowLeft } from 'lucide-react';
import styles from './page.module.css';
import headerStyles from '../page.module.css'; // Reusing header/footer styles

export default function Research() {
  return (
    <div>
      <header className={headerStyles.header}>
        <div className={`container ${headerStyles.headerContainer}`}>
          <Link href="/" className={headerStyles.logo}>
            GoToxinFree<span style={{color: 'var(--secondary)'}}>WithTina</span>
          </Link>
          <nav className={headerStyles.nav}>
            <Link href="/" className={headerStyles.navLink}>Home</Link>
            <Link href="/about" className={headerStyles.navLink}>About Tina</Link>
            <Link href="/research" className={headerStyles.navLink} style={{color: 'var(--secondary)'}}>Methodology</Link>
            <Link href="/contact" className={headerStyles.navLink}>Contact</Link>
            <Link href="/#articles" className={headerStyles.navLink}>Articles</Link>
          </nav>
        </div>
      </header>

      <section className={styles.researchHero}>
        <div className="container">
          <h1>My Research Methodology</h1>
          <p>Science-backed, independent, and rigorous. Here is how I vet the information and products shared on this platform.</p>
        </div>
      </section>

      <main className={`container ${styles.researchMain}`}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <p className={styles.introText}>
          As a researcher, I know that navigating the world of "green" and "natural" products is filled with greenwashing. Marketing claims mean nothing without empirical evidence. My process is designed to cut through the noise and deliver actionable, scientifically sound advice for a toxin-free life.
        </p>

        <div className={styles.methodologyGrid}>
          <div className={styles.methodCard}>
            <div className={styles.methodIcon}>
              <BookOpen size={24} />
            </div>
            <h3>1. Scientific Literature Review</h3>
            <p>I rely on peer-reviewed studies published in reputable medical and environmental science journals (e.g., PubMed, The Lancet). I do not base conclusions on isolated, non-replicated studies or brand-sponsored research.</p>
          </div>

          <div className={styles.methodCard}>
            <div className={styles.methodIcon}>
              <Search size={24} />
            </div>
            <h3>2. Ingredient Deep-Dives</h3>
            <p>Every product recommended is subjected to a strict ingredient analysis. I cross-reference chemical compounds with databases like the EWG (Environmental Working Group) and the EPA's list of chemicals of concern.</p>
          </div>

          <div className={styles.methodCard}>
            <div className={styles.methodIcon}>
              <FlaskConical size={24} />
            </div>
            <h3>3. Independent Verification</h3>
            <p>I prioritize products and materials that hold respected third-party certifications, such as MADE SAFE®, GOTS (Global Organic Textile Standard), and OEKO-TEX®, ensuring objective safety standards are met.</p>
          </div>

          <div className={styles.methodCard}>
            <div className={styles.methodIcon}>
              <ShieldCheck size={24} />
            </div>
            <h3>4. Zero Brand Interference</h3>
            <p>My research is completely independent. I do not accept payment from brands to alter reviews or hide the presence of toxins. If a formulation changes, the review is updated immediately.</p>
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
