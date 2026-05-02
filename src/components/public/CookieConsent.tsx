"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'var(--primary)',
      color: 'white',
      padding: '1.5rem',
      zIndex: 9999,
      boxShadow: '0 -4px 10px rgba(0,0,0,0.1)'
    }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-start', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>We Value Your Privacy</h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: 0, lineHeight: 1.5, maxWidth: '800px' }}>
              We use cookies to ensure you get the best experience on our website. This includes essential cookies for security and functionality, and analytics to improve our content. 
              Read more about how we use data in our <Link href="/privacy" style={{ textDecoration: 'underline', color: 'white', fontWeight: 600 }}>Privacy Policy</Link>.
            </p>
          </div>
          <button onClick={declineCookies} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: '0.25rem' }} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
          <button onClick={declineCookies} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}>
            Decline Non-Essential
          </button>
          <button onClick={acceptCookies} style={{ backgroundColor: 'var(--accent)', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}>
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
