"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, AlertCircle, CheckCircle } from 'lucide-react';

interface ProfileFormProps {
  initialData: {
    name: string;
    image: string;
  };
}

export default function ProfileForm({ initialData }: ProfileFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to update profile');

      setStatus({ type: 'success', message: 'Profile updated successfully!' });
      router.refresh();
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {status && (
        <div style={{ 
          padding: '1rem', 
          borderRadius: '8px', 
          backgroundColor: status.type === 'success' ? '#dcfce7' : '#fee2e2',
          color: status.type === 'success' ? '#166534' : '#b91c1c',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          border: '1px solid',
          borderColor: status.type === 'success' ? '#bbf7d0' : '#fecaca'
        }}>
          {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          {status.message}
        </div>
      )}

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Display Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Tina Pramanik"
          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--admin-border)', outline: 'none' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Profile Photo URL</label>
        <input
          type="url"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="https://..."
          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--admin-border)', outline: 'none' }}
        />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>
          Provide a URL to your professional headshot or avatar.
        </p>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ 
            backgroundColor: 'var(--admin-secondary)', 
            color: 'white', 
            border: 'none', 
            padding: '0.75rem 2rem', 
            borderRadius: '8px', 
            fontWeight: 700, 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            opacity: isSubmitting ? 0.7 : 1
          }}
        >
          <Save size={18} />
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}
