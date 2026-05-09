"use client";

import { useActionState } from 'react';
import Link from 'next/link';
import { Send, CheckCircle2 } from 'lucide-react';

import { subscribeToNewsletter } from '@/app/actions/blog';

export default function NewsletterForm() {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: unknown, formData: FormData) => {
      try {
        const result = await subscribeToNewsletter(formData);
        // Ensure we return the correct branch of the union
        if (result.success) return { success: true, message: result.message || '' };
        return { success: false, message: (result as { error?: string }).error || 'Failed to subscribe' };
      } catch {
        return { success: false, message: 'Failed to connect to the server' };
      }
    },
    { success: false, message: '' }
  );

  if (state.success) {
    return (
      <div style={{ padding: '1.5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981' }}>
          <CheckCircle2 size={20} />
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Success!</h3>
        </div>
        <p style={{ margin: 0, opacity: 0.9, fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)' }}>{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} style={{ width: '100%', maxWidth: '400px' }}>
      <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
        <input
          type="email"
          name="email"
        required
        placeholder="Enter your email address"
        disabled={isPending}
        style={{
          display: 'block',
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
        type="submit"
        disabled={isPending}
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
          opacity: isPending ? 0.7 : 1,
          transition: 'background-color 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--secondary-hover)'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--secondary)'}
      >
        {isPending ? (
          <div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        ) : (
          <Send size={16} style={{ marginLeft: '-2px' }} />
        )}
      </button>
      </div>
      {!state.success && state.message && (
        <p style={{ marginTop: '0.75rem', color: '#fca5a5', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <span style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#fca5a5' }} />
          {state.message}
        </p>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}} />
      <div style={{ marginTop: '0.75rem', textAlign: 'center', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
        By subscribing, you agree to our <Link href="/privacy" style={{ textDecoration: 'underline', color: 'inherit' }}>Privacy Policy</Link>.
      </div>
    </form>
  );
}
