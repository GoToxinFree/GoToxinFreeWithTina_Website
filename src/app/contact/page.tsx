"use client";

import Link from 'next/link';
import { Mail, MapPin, Phone, ArrowLeft } from 'lucide-react';
import styles from './page.module.css';
import headerStyles from '../page.module.css';

export default function Contact() {
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
            <Link href="/research" className={headerStyles.navLink}>Methodology</Link>
            <Link href="/contact" className={headerStyles.navLink} style={{color: 'var(--secondary)'}}>Contact</Link>
          </nav>
        </div>
      </header>

      <section className={styles.contactHero}>
        <div className="container">
          <h1>Get in Touch</h1>
          <p>Have questions about a product, or want to collaborate on research? I'd love to hear from you.</p>
        </div>
      </section>

      <main className={`container ${styles.contactMain}`}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className={styles.contactLayout}>
          <div className={styles.contactInfo}>
            <h2>Let's Connect</h2>
            <p>
              Navigating a toxin-free life is a community effort. Whether you're an individual looking for advice, a brand seeking rigorous testing, or a fellow researcher, please reach out.
            </p>

            <div className={styles.infoItem}>
              <Mail className={styles.infoIcon} size={24} />
              <span>tina@gotoxinfreewithtina.com</span>
            </div>
            <div className={styles.infoItem}>
              <Phone className={styles.infoIcon} size={24} />
              <span>+81 80-6429-7228</span>
            </div>
            <div className={styles.infoItem}>
              <MapPin className={styles.infoIcon} size={24} />
              <span>1-1-6-1406 UR Oyata , Adachi-ku, Tokyo, Japan, 120-0001</span>
            </div>
          </div>

          <div className={styles.contactForm}>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Your Name" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="your@email.com" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea id="message" rows={5} placeholder="How can I help you?" required></textarea>
              </div>
              <button type="submit" className={`btn-primary ${styles.submitBtn}`}>
                Send Message
              </button>
            </form>
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
