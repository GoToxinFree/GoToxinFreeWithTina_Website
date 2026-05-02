"use client";

import { useState } from 'react';
import { Users, Mail, Trash2, UserMinus, UserCheck, Download, Search } from 'lucide-react';
import styles from '../layout.module.css';

interface Subscriber {
  id: string;
  email: string;
  status: string;
  createdAt: string;
}

interface SubscribersClientProps {
  initialSubscribers: Subscriber[];
}

export default function SubscribersClient({ initialSubscribers }: SubscribersClientProps) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>(initialSubscribers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refetch = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/admin/subscribers');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setSubscribers(data);
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'unsubscribed' : 'active';
    // Optimistic update
    setSubscribers(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
    try {
      const res = await fetch(`/api/admin/subscribers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) refetch();
    } catch {
      refetch();
    }
  };

  const deleteSubscriber = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subscriber?')) return;
    setSubscribers(prev => prev.filter(s => s.id !== id));
    try {
      const res = await fetch(`/api/admin/subscribers/${id}`, { method: 'DELETE' });
      if (!res.ok) refetch();
    } catch {
      refetch();
    }
  };

  const filteredSubscribers = subscribers.filter(s =>
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportCSV = () => {
    const headers = ['Email', 'Status', 'Joined Date'];
    const rows = filteredSubscribers.map(s => [s.email, s.status, new Date(s.createdAt).toLocaleDateString()]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    a.click();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--admin-primary)', margin: 0 }}>Newsletter Subscribers</h1>
          <p style={{ color: 'var(--admin-text-muted)', margin: 0 }}>Manage your community and outreach</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={refetch} disabled={isRefreshing} className={styles.btnOutline} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
            {isRefreshing ? 'Refreshing...' : '↻ Refresh'}
          </button>
          <button onClick={exportCSV} className={styles.btnOutline} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className={styles.card} style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--admin-border)', backgroundColor: '#f8fafc', display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative', flexGrow: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
            <input
              type="text"
              placeholder="Search subscribers by email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: '8px', border: '1px solid var(--admin-border)', fontSize: '0.9rem' }}
            />
          </div>
        </div>

        {filteredSubscribers.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--admin-text-muted)' }}>
            <Users size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
            <p>No subscribers found matching your search.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid var(--admin-border)' }}>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--admin-text-muted)' }}>Email Address</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--admin-text-muted)' }}>Status</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--admin-text-muted)' }}>Joined</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--admin-text-muted)', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscribers.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid var(--admin-border)', transition: 'background-color 0.2s' }}>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--admin-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--admin-secondary)' }}>
                        <Mail size={16} />
                      </div>
                      <span style={{ fontWeight: 600, color: 'var(--admin-primary)' }}>{s.email}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      backgroundColor: s.status === 'active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: s.status === 'active' ? '#059669' : '#dc2626'
                    }}>
                      {s.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--admin-text-muted)', fontSize: '0.875rem' }}>
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button
                        onClick={() => toggleStatus(s.id, s.status)}
                        className={styles.btnIcon}
                        title={s.status === 'active' ? 'Unsubscribe' : 'Reactivate'}
                      >
                        {s.status === 'active' ? <UserMinus size={18} /> : <UserCheck size={18} />}
                      </button>
                      <button
                        onClick={() => deleteSubscriber(s.id)}
                        className={`${styles.btnIcon} ${styles.btnDelete}`}
                        title="Delete subscriber"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
