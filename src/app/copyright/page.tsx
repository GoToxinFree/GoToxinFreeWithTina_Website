import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Copyright() {
  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <Header />
      <main className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <h1 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1.5rem', lineHeight: 1.1 }}>Copyright & Terms of Use</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="prose-content" style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--primary)', marginBottom: '1rem' }}>1. Ownership of Content</h2>
            <p>All content on <strong>Go Toxin Free With Tina</strong>, including but not limited to articles, research methodology, text, graphics, logos, images, and software, is the property of Go Toxin Free With Tina or its content suppliers and protected by international copyright laws.</p>
            <p style={{ marginTop: '1rem' }}>The compilation of all content on this site is the exclusive property of Go Toxin Free With Tina.</p>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--primary)', marginBottom: '1rem' }}>2. Allowed Usage</h2>
            <p>You may view, download for caching purposes only, and print pages from the website for your own personal use, subject to the restrictions set out below and elsewhere in these terms and conditions.</p>
            <p style={{ marginTop: '1rem' }}>You may freely share links to our articles and pages on social media, blogs, or other platforms, provided that proper credit is given to Go Toxin Free With Tina.</p>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--primary)', marginBottom: '1rem' }}>3. Restrictions</h2>
            <p>You must not:</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginTop: '1rem', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Republish material from this website (including republication on another website) without prior written consent.</li>
              <li style={{ marginBottom: '0.5rem' }}>Sell, rent or sub-license material from the website.</li>
              <li style={{ marginBottom: '0.5rem' }}>Reproduce, duplicate, copy or otherwise exploit material on this website for a commercial purpose.</li>
              <li style={{ marginBottom: '0.5rem' }}>Edit or otherwise modify any material on the website.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--primary)', marginBottom: '1rem' }}>4. Medical and Scientific Disclaimer</h2>
            <p>The information provided on Go Toxin Free With Tina is for educational and informational purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or before making significant changes to your lifestyle or product usage.</p>
            <p style={{ marginTop: '1rem' }}>While we strive to keep our research accurate and up-to-date, scientific understanding evolves, and we make no guarantees about the absolute accuracy or completeness of the information provided.</p>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--primary)', marginBottom: '1rem' }}>5. Contact</h2>
            <p>If you have any questions or requests regarding the use of our copyrighted material, please contact us at <strong>tina@gotoxinfreewithtina.com</strong>.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
