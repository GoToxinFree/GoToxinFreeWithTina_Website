"use client";

import { useState } from 'react';
import { Send, Check, Loader2 } from 'lucide-react';
import { notifySubscribersOfNewPost } from '@/app/actions/admin';

export default function NotifyButton({ postId, isPublished }: { postId: string, isPublished: boolean }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  if (!isPublished) return null;

  const handleNotify = async () => {
    if (!confirm('Are you sure you want to send a newsletter notification for this article to all active subscribers?')) {
      return;
    }

    setStatus('loading');
    setError(null);

    try {
      const result = await notifySubscribersOfNewPost(postId);
      if (result.success) {
        setStatus('success');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setError(result.error || 'Failed to send notification');
        setStatus('error');
      }
    } catch (err: any) {
      setError(err.message);
      setStatus('error');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <button 
        onClick={handleNotify}
        disabled={status === 'loading' || status === 'success'}
        style={{ 
          background: 'none',
          border: 'none',
          color: status === 'success' ? '#10b981' : 'var(--admin-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          padding: '4px',
          opacity: status === 'loading' ? 0.5 : 1,
          transition: 'color 0.2s ease'
        }}
        title="Notify Subscribers"
      >
        {status === 'loading' ? <Loader2 size={18} className="animate-spin" /> : 
         status === 'success' ? <Check size={18} /> : 
         <Send size={18} />}
      </button>
      {error && <span style={{ fontSize: '0.6rem', color: '#ef4444', position: 'absolute', marginTop: '30px' }}>{error}</span>}
    </div>
  );
}
