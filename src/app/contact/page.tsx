"use client";

import Link from 'next/link';
import { Mail, MapPin, Phone, ArrowLeft, Leaf } from 'lucide-react';
import styles from './page.module.css';
import headerStyles from '../page.module.css';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';

export default function Contact() {
  return (
    <div>
      <Header />

      <section className={styles.contactHero}>
        <div className="container">
          <h1>Get in Touch</h1>
          <p>Have questions about a product, or want to collaborate on research? I'd love to hear from you.</p>
        </div>
      </section>

      <main className={`container ${styles.contactMain}`}>
        <Link href="/" className="btn-ghost" style={{ marginBottom: '2rem', marginLeft: '-0.75rem' }}>
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
              <span>drsupriti@gotoxinfreewithtina.com</span>
            </div>
            <div className={styles.infoItem}>
              <Phone className={styles.infoIcon} size={24} />
              <span>+81 80-6429-7228</span>
            </div>
            <div className={styles.infoItem}>
              <MapPin className={styles.infoIcon} size={24} />
              <span>Tokyo, Japan -120 0001</span>
            </div>
            <div className={styles.infoItem} style={{ marginTop: '1rem' }}>
              <a href="https://jp.linkedin.com/in/supritidas" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'inherit', textDecoration: 'none' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.infoIcon}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                <span>LinkedIn Profile</span>
              </a>
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

      <Footer />
    </div>
  );
}
