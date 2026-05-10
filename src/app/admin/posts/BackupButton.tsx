"use client";

import { useState } from 'react';
import { Download } from "lucide-react";

export default function BackupButton() {
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      const res = await fetch('/api/admin/posts/export');
      if (!res.ok) throw new Error('Backup failed');
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      const fileName = `gotoxinfree-backup-${new Date().toISOString().split('T')[0]}.zip`;
      
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Backup failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button 
      onClick={handleDownload} 
      disabled={isExporting}
      className={"admin-btn-outline"} 
      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: isExporting ? 'wait' : 'pointer' }}
    >
      <Download size={20} /> 
      {isExporting ? 'Preparing ZIP...' : 'Full Backup (ZIP)'}
    </button>
  );
}
