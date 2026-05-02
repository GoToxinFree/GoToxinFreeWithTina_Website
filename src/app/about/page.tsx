import Link from 'next/link';
import { ArrowLeft, BookOpen, FlaskConical, Search, ShieldCheck } from 'lucide-react';
import styles from './page.module.css';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';

export default function About() {
  return (
    <div>
      <Header />

      <section className={styles.aboutHero}>
        <div className="container">
          <h1>Hi, I'm Tina</h1>
          <p>Advocate, researcher, and your guide to navigating a chemical-heavy world safely.</p>
        </div>
      </section>

      <main className={`container ${styles.aboutMain}`}>
        <Link href="/" className="btn-ghost" style={{ marginBottom: '2rem', marginLeft: '-0.75rem' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <div className={styles.aboutContent} style={{ marginBottom: '5rem' }}>
          <div className={styles.imageContainer}>
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

        {/* Methodology Section Merged */}
        <div style={{ paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--primary)', textAlign: 'center', marginBottom: '1rem' }}>My Research Methodology</h2>
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
