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
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <button 
        onClick={handleNotify}
        disabled={status === 'loading' || status === 'success'}
        className="admin-logout-btn"
        style={{ 
          backgroundColor: status === 'success' ? '#dcfce7' : 'white',
          color: status === 'success' ? '#166534' : 'var(--admin-secondary)',
          border: '1px solid var(--admin-border)',
          width: '32px',
          height: '32px',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          padding: 0
        }}
        title="Notify Subscribers"
      >
        {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : 
         status === 'success' ? <Check size={16} /> : 
         <Send size={16} />}
      </button>
      {error && <span style={{ fontSize: '0.7rem', color: '#b91c1c' }}>{error}</span>}
    </div>
  );
}
