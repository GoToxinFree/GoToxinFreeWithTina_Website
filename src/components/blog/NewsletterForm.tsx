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
      <div style={{ padding: '2rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <CheckCircle2 size={48} color="#10b981" />
        <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Success!</h3>
        <p style={{ margin: 0, opacity: 0.8 }}>{message}</p>
        <button 
          onClick={() => setStatus('idle')}
          style={{ background: 'none', border: '1px solid white', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', marginTop: '1rem' }}
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '500px', margin: '0 auto' }}>
        <input 
          type="email" 
          required
          placeholder="Enter your email address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          style={{ flexGrow: 1, padding: '1rem 1.5rem', borderRadius: '8px', border: 'none', fontSize: '1rem', color: 'var(--primary)' }}
        />
        <button 
          disabled={status === 'loading'}
          className="btn-secondary" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: status === 'loading' ? 'rgba(255,255,255,0.5)' : undefined }}
        >
          {status === 'loading' ? 'Joining...' : <>{'Subscribe'} <Send size={18} /></>}
        </button>
      </div>
      {status === 'error' && (
        <p style={{ marginTop: '1rem', color: '#fecaca', fontSize: '0.9rem' }}>{message}</p>
      )}
    </form>
  );
}
