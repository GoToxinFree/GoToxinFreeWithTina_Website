"use client";

import { useState } from 'react';
import { Upload, RefreshCw } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function RestoreButton() {
  const [isRestoring, setIsRestoring] = useState(false);
  const router = useRouter();

  const handleRestore = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!confirm('Warning: This will restore articles and overwrite images. Are you sure you want to proceed?')) {
      e.target.value = '';
      return;
    }

    setIsRestoring(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/posts/restore', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Restore failed');
      }

      alert(result.message || 'Restore successful!');
      router.refresh();
    } catch (error) {
      console.error('Restore failed:', error);
      alert('Restore failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsRestoring(false);
      e.target.value = '';
    }
  };

  return (
    <div style={{ display: 'inline-block' }}>
      <input
        type="file"
        id="restore-upload"
        accept=".zip"
        style={{ display: 'none' }}
        onChange={handleRestore}
        disabled={isRestoring}
      />
      <button 
        onClick={() => document.getElementById('restore-upload')?.click()} 
        disabled={isRestoring}
        className={"admin-btn-outline"} 
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: isRestoring ? 'wait' : 'pointer', borderColor: 'var(--admin-accent)', color: 'var(--admin-accent)' }}
      >
        {isRestoring ? <RefreshCw size={20} className="animate-spin" /> : <Upload size={20} />} 
        {isRestoring ? 'Restoring...' : 'Restore Backup'}
      </button>
    </div>
  );
}
