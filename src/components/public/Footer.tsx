import Link from "next/link";
import { Leaf } from "lucide-react";
import styles from "@/app/page.module.css";
import NewsletterForm from "@/components/blog/NewsletterForm";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
        <div className={styles.footerCol}>
          <Link href="/" className={styles.logo} style={{ color: 'white', marginBottom: '1.5rem', display: 'inline-flex' }}>
            <Leaf size={24} color="var(--accent)" />
            GoToxinFree<span style={{ color: 'var(--secondary)' }}>WithTina</span>
          </Link>
          <p style={{ opacity: 0.8, maxWidth: '400px' }}>
            Dedicated to eliminating toxic pollutants and ensuring a safe, sustainable environment for generations to come.
          </p>
        </div>
        
        <div className={styles.footerCol}>
          <h3>Quick Links</h3>
          <ul className={styles.footerLinks}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Tina</Link></li>
            <li><Link href="/blog">Blog & Research</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        
        <div className={styles.footerCol} style={{ flexGrow: 1.5 }}>
          <h3>Subscribe to Newsletter</h3>
          <p style={{ opacity: 0.8, marginBottom: '1.5rem' }}>
            Get the latest research and tips on toxin-free living delivered straight to your inbox.
          </p>
          <NewsletterForm />
        </div>
      </div>
      
      <div className="container">
        <div className={styles.footerBottom} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>&copy; {new Date().getFullYear()} Go Toxin Free With Tina. All rights reserved.</span>
            <Link href="/login" style={{ color: 'inherit', opacity: 0.3 }} aria-label="Admin Login">
              {/* Subtle Lock Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </Link>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem' }}>
            <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="/copyright" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Terms & Copyright</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
