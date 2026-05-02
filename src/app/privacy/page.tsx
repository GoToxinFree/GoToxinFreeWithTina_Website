import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <Header />
      <main className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <h1 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1.5rem', lineHeight: 1.1 }}>Privacy Policy</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="prose-content" style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--primary)', marginBottom: '1rem' }}>1. Introduction</h2>
            <p>Welcome to <strong>Go Toxin Free With Tina</strong> ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.</p>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--primary)', marginBottom: '1rem' }}>2. The Data We Collect About You</h2>
            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginTop: '1rem', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Identity Data</strong> includes first name, last name, or username when you leave a comment on our blog.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Contact Data</strong> includes email address when you subscribe to our newsletter, leave a comment, or contact us.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--primary)', marginBottom: '1rem' }}>3. How We Use Your Personal Data</h2>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginTop: '1rem', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Newsletter Subscription:</strong> To send you our email newsletter containing research updates and tips. You can unsubscribe at any time by contacting us or clicking the unsubscribe link in our emails.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Blog Comments:</strong> To display your comments on our website and facilitate community discussion. Your email address is stored for verification purposes but is not publicly displayed.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Website Improvement:</strong> To use data analytics to improve our website, products/services, marketing, customer relationships, and experiences.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--primary)', marginBottom: '1rem' }}>4. Cookies and Local Storage</h2>
            <p>Our website uses cookies and local storage to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site.</p>
            <p style={{ marginTop: '1rem' }}>We use the following types of cookies:</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginTop: '1rem', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Strictly necessary cookies:</strong> These are cookies that are required for the operation of our website, such as authenticating administrators.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Preference storage:</strong> We use local browser storage to remember whether you have accepted or declined our cookie consent banner.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--primary)', marginBottom: '1rem' }}>5. Data Security</h2>
            <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. Our database is securely hosted and access is restricted to authorized administrators only.</p>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--primary)', marginBottom: '1rem' }}>6. Your Legal Rights</h2>
            <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginTop: '1rem', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Request access to your personal data.</li>
              <li style={{ marginBottom: '0.5rem' }}>Request correction of your personal data.</li>
              <li style={{ marginBottom: '0.5rem' }}>Request erasure of your personal data (e.g., deleting your comments or removing you from our newsletter).</li>
              <li style={{ marginBottom: '0.5rem' }}>Object to processing of your personal data.</li>
            </ul>
            <p>If you wish to exercise any of the rights set out above, please contact us at <strong>tina@gotoxinfreewithtina.com</strong>.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
