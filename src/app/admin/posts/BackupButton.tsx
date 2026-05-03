"use client";

import { useState } from 'react';
import { Download } from "lucide-react";
import styles from "../layout.module.css";

export default function BackupButton() {
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      const response = await fetch('/api/admin/posts/export');
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to download backup');
      }
      
      const data = await response.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      const fileName = `gotoxinfree-articles-backup-${new Date().toISOString().split('T')[0]}.json`;
      
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
      className={styles.btnOutline} 
      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: isExporting ? 'wait' : 'pointer' }}
    >
      <Download size={20} /> 
      {isExporting ? 'Preparing Backup...' : 'Backup Articles'}
    </button>
  );
}
