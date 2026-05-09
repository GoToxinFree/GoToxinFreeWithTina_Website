'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="main" style={{ backgroundColor: 'var(--surface)' }}>
      <main className="container">
        <div className="error-container">
          <div className="error-code" style={{ color: '#ef4444' }}>503</div>
          <AlertTriangle size={64} color="#ef4444" style={{ marginBottom: '2rem' }} />
          <h1 className="error-title">Service Temporarily Unavailable</h1>
          <p className="error-text">
            We&apos;re currently experiencing some technical difficulties or performing maintenance. 
            Our research team is on it and we&apos;ll be back online shortly.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button 
              onClick={() => reset()} 
              className="btn-primary" 
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <RefreshCcw size={18} /> Try Again
            </button>
            <Link href="/" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Home size={18} /> Go Home
            </Link>
          </div>
          <p style={{ marginTop: '3rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Error Reference: {error.digest || 'unknown_deployment_error'}
          </p>
        </div>
      </main>
    </div>
  );
}
