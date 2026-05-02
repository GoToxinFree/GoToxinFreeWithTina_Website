"use client";

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Failed to connect to the server');
    }
  };

  if (status === 'success') {
    return (
      <div style={{ padding: '1.5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981' }}>
          <CheckCircle2 size={20} />
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Success!</h3>
        </div>
        <p style={{ margin: 0, opacity: 0.9, fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)' }}>{message}</p>
        <button 
          onClick={() => setStatus('idle')}
          style={{ background: 'none', border: 'none', color: 'var(--secondary)', textAlign: 'left', padding: 0, cursor: 'pointer', fontSize: '0.85rem', marginTop: '0.5rem', textDecoration: 'underline' }}
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
      <input 
        type="email" 
        required
        placeholder="Enter your email address" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === 'loading'}
        style={{ 
          width: '100%', 
          padding: '1rem 3.5rem 1rem 1.5rem', 
          borderRadius: '999px', 
          border: '1px solid rgba(255,255,255,0.2)', 
          backgroundColor: 'rgba(255,255,255,0.05)',
          fontSize: '1rem', 
          color: 'white',
          outline: 'none',
          transition: 'all 0.2s ease',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
        }}
        onFocus={(e) => e.target.style.borderColor = 'var(--secondary)'}
        onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
      />
      <button 
        disabled={status === 'loading'}
        title="Subscribe"
        style={{ 
          position: 'absolute',
          right: '0.4rem',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'var(--secondary)',
          color: 'white',
          border: 'none',
          width: '2.6rem',
          height: '2.6rem',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          opacity: status === 'loading' ? 0.7 : 1,
          transition: 'background-color 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--secondary-hover)'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--secondary)'}
      >
        {status === 'loading' ? (
          <div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        ) : (
          <Send size={16} style={{ marginLeft: '-2px' }} />
        )}
      </button>
      {status === 'error' && (
        <p style={{ marginTop: '0.75rem', color: '#fca5a5', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <span style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#fca5a5' }} />
          {message}
        </p>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}} />
    </form>
  );
}
