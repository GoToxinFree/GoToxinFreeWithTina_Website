import Link from "next/link";
import { Leaf } from "lucide-react";
import styles from "@/app/page.module.css";
import NewsletterForm from "@/components/blog/NewsletterForm";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
        <div className={styles.footerCol}>
          <Link href="/" className={styles.logo} style={{ color: 'white', marginBottom: '1.5rem', display: 'inline-flex' }} prefetch={false}>
            <Leaf size={24} color="var(--accent)" />
            GoToxinFree<span style={{ color: 'var(--secondary)' }}>WithTina</span>
          </Link>
          <p style={{ opacity: 0.8, maxWidth: '400px', marginBottom: '1.5rem' }}>
            Dedicated to eliminating toxic pollutants and ensuring a safe, sustainable environment for generations to come.
          </p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a href="https://jp.linkedin.com/in/supritidas" target="_blank" rel="noopener noreferrer" style={{ color: 'white', opacity: 0.8 }} aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://www.instagram.com/dr.teena_enviro?igsh=cWE0MGQxaG91MWJ1&utm_source=qr" target="_blank" rel="noopener noreferrer" style={{ color: 'white', opacity: 0.8 }} aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
          </div>
        </div>
        
        <div className={styles.footerCol}>
          <h3>Quick Links</h3>
          <ul className={styles.footerLinks}>
            <li><Link href="/" prefetch={false}>Home</Link></li>
            <li><Link href="/about" prefetch={false}>About Tina</Link></li>
            <li><Link href="/blog" prefetch={false}>Blog & Research</Link></li>
            <li><Link href="/contact" prefetch={false}>Contact</Link></li>
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
            <Link href="/login" style={{ color: 'inherit', opacity: 0.3 }} aria-label="Admin Login" prefetch={false}>
              {/* Subtle Lock Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </Link>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem' }}>
            <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }} prefetch={false}>Privacy Policy</Link>
            <Link href="/copyright" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }} prefetch={false}>Terms & Copyright</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
