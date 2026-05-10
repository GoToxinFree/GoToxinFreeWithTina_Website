"use client";

import { useState } from 'react';
import { Mail, Check, Loader2 } from 'lucide-react';
import { sendNewsletterSummaryAction } from '@/app/actions/admin';

export default function BroadcastSummaryButton({ postIds }: { postIds: string[] }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleBroadcast = async () => {
    if (postIds.length === 0) {
      alert('No published articles available to summarize.');
      return;
    }

    if (!confirm(`Are you sure you want to send a newsletter summary of the ${postIds.length} most recent articles to all subscribers?`)) {
      return;
    }

    setStatus('loading');

    try {
      const result = await sendNewsletterSummaryAction(postIds);
      if (result.success) {
        setStatus('success');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        alert(result.error || 'Failed to send summary');
        setStatus('error');
      }
    } catch (err: any) {
      alert(err.message);
      setStatus('error');
    }
  };

  return (
    <button 
      onClick={handleBroadcast}
      disabled={status === 'loading' || status === 'success' || postIds.length === 0}
      className="admin-logout-btn"
      style={{ 
        backgroundColor: status === 'success' ? '#dcfce7' : 'white',
        color: status === 'success' ? '#166534' : 'var(--admin-secondary)',
        border: '1px solid var(--admin-border)',
        padding: '0.6rem 1rem',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontWeight: 600,
        fontSize: '0.875rem',
        cursor: (status === 'loading' || postIds.length === 0) ? 'not-allowed' : 'pointer',
        width: 'auto',
        opacity: postIds.length === 0 ? 0.5 : 1
      }}
    >
      {status === 'loading' ? <Loader2 size={18} className="animate-spin" /> : 
       status === 'success' ? <><Check size={18} /> Sent Successfully</> : 
       <><Mail size={18} /> Broadcast Summary</>}
    </button>
  );
}
