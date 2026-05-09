'use client';

import { AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'sans-serif', backgroundColor: '#f8fafc' }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '100vh', 
          textAlign: 'center', 
          padding: '2rem' 
        }}>
          <AlertTriangle size={64} color="#ef4444" style={{ marginBottom: '1.5rem' }} />
          <h1 style={{ fontSize: '2rem', color: '#1e293b', marginBottom: '1rem' }}>Critical System Error</h1>
          <p style={{ color: '#64748b', maxWidth: '500px', marginBottom: '2rem', lineHeight: 1.6 }}>
            A critical error occurred in the application core. We are working to restore service as quickly as possible.
          </p>
          <button 
            onClick={() => reset()}
            style={{ 
              backgroundColor: '#00a6ce', 
              color: 'white', 
              border: 'none', 
              padding: '0.75rem 1.5rem', 
              borderRadius: '8px', 
              fontWeight: 600, 
              cursor: 'pointer' 
            }}
          >
            Attempt Recovery
          </button>
        </div>
      </body>
    </html>
  );
}
