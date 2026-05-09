import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';

export default function NotFound() {
  return (
    <div className="main">
      <Header />
      <main className="container">
        <div className="error-container">
          <div className="error-code">404</div>
          <h1 className="error-title">Research Not Found</h1>
          <p className="error-text">
            The page you are looking for might have been moved, deleted, or never existed in our database. 
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Home size={18} /> Back to Home
            </Link>
            <Link href="/blog" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Search size={18} /> Search Articles
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
