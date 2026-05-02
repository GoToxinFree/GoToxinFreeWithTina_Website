"use client";

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Leaf } from 'lucide-react';
import { signIn } from 'next-auth/react';

function LoginForm() {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get('error');
  
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Use next-auth/react client-side signIn instead of Server Action
      // It handles the redirect automatically and allows us to stay on page if we set redirect: false
      const res = await signIn("nodemailer", { 
        email, 
        redirect: false,
        callbackUrl: '/admin'
      });

      if (res?.error) {
        setMessage(`Error: ${res.error}`);
      } else if (res?.ok) {
        setMessage('Success! Check your email for the secure magic link. You can safely close this window.');
      }
    } catch (err: any) {
      setMessage(`Unexpected error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '400px', backgroundColor: 'white', padding: '3rem 2rem', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', textAlign: 'center' }}>
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 800, fontSize: '1.5rem', textDecoration: 'none', marginBottom: '2rem' }}>
        <Leaf size={24} color="var(--accent)" />
        GoToxinFree
      </Link>
      
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Admin Portal</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>
        Enter your authorized email address to receive a secure login link.
      </p>

      {(message || errorParam) && (
        <div style={{ 
          padding: '1rem', 
          backgroundColor: message.includes('Success') ? '#dcfce7' : '#fee2e2', 
          color: message.includes('Success') ? '#166534' : '#b91c1c', 
          borderRadius: '4px', 
          marginBottom: '1.5rem',
          fontSize: '0.9rem',
          textAlign: 'left'
        }}>
          {message || (errorParam === 'Configuration' ? 'Server configuration error. Please check your SMTP settings.' : 'Access Denied or Login Failed.')}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tina@gotoxinfreewithtina.com"
          style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '1rem', width: '100%' }}
        />
        <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ width: '100%', opacity: isSubmitting ? 0.7 : 1 }}>
          {isSubmitting ? 'Sending...' : 'Send Magic Link'}
        </button>
      </form>

      <div style={{ marginTop: '2rem' }}>
        <Link href="/" className="btn-ghost" style={{ fontSize: '0.875rem' }}>
          <ArrowLeft size={14} /> Back to Homepage
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--surface)', alignItems: 'center', justifyContent: 'center' }}>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
