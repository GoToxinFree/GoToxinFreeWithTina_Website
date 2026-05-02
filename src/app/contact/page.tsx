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

      <Footer />
    </div>
  );
}
