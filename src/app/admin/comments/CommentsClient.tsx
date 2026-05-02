"use client";

import { useState } from 'react';
import { 
  MessageSquare, Trash2, CheckCircle,
  Flag, Reply, Filter, Search, Clock
} from 'lucide-react';
import styles from '../layout.module.css';

interface Comment {
  id: string;
  content: string;
  authorName: string;
  authorEmail?: string | null;
  isAdmin: boolean;
  status: string;
  createdAt: string;
  postId: string;
  post: { title: string; slug: string };
  parent?: { content: string; authorName: string } | null;
}

interface CommentsClientProps {
  initialComments: Comment[];
}

export default function CommentsClient({ initialComments }: CommentsClientProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refetchComments = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/admin/comments');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setComments(data);
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    // Optimistic UI update
    setComments(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    try {
      const res = await fetch(`/api/admin/comments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) refetchComments(); // revert on failure
    } catch {
      refetchComments();
    }
  };

  const deleteComment = async (id: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    setComments(prev => prev.filter(c => c.id !== id));
    try {
      const res = await fetch(`/api/admin/comments/${id}`, { method: 'DELETE' });
      if (!res.ok) refetchComments();
    } catch {
      refetchComments();
    }
  };

  const handleReply = async () => {
    if (!replyText.trim() || !replyingTo) return;
    try {
      const res = await fetch(`/api/posts/${replyingTo.postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: replyText,
          authorName: 'Tina Pramanik',
          authorEmail: 'drtinapramanik@gmail.com',
          parentId: replyingTo.id
        }),
      });
      if (res.ok) {
        setReplyingTo(null);
        setReplyText('');
        refetchComments();
      }
    } catch {
      alert('Failed to send reply');
    }
  };

  const filteredComments = comments.filter(c => {
    const matchesSearch = c.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.authorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--admin-primary)', margin: 0 }}>Discussion Moderation</h1>
          <p style={{ color: 'var(--admin-text-muted)', margin: 0 }}>Engage with your community and moderate research feedback</p>
        </div>
        <button onClick={refetchComments} disabled={isRefreshing} style={{ background: 'none', border: '1px solid var(--admin-border)', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--admin-text-muted)' }}>
          {isRefreshing ? 'Refreshing...' : '↻ Refresh'}
        </button>
      </div>

      <div className={styles.card} style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--admin-border)', backgroundColor: '#f8fafc', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flexGrow: 1, minWidth: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
            <input
              type="text"
              placeholder="Search comments by content or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: '8px', border: '1px solid var(--admin-border)', fontSize: '0.9rem' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Filter size={18} color="var(--admin-text-muted)" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--admin-border)', fontSize: '0.9rem', backgroundColor: 'white' }}
            >
              <option value="all">All Comments</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="spam">Spam</option>
            </select>
          </div>
        </div>

        {filteredComments.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--admin-text-muted)' }}>
            <MessageSquare size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
            <p>No comments found matching your criteria.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filteredComments.map((c) => (
              <div key={c.id} style={{ padding: '1.5rem', borderBottom: '1px solid var(--admin-border)', backgroundColor: c.status === 'pending' ? 'rgba(251, 191, 36, 0.03)' : 'transparent' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: c.isAdmin ? 'var(--admin-secondary)' : 'var(--admin-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.isAdmin ? 'white' : 'var(--admin-text-muted)' }}>
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--admin-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {c.authorName}
                        {c.isAdmin && <span style={{ fontSize: '0.65rem', backgroundColor: 'var(--admin-secondary)', color: 'white', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>ADMIN</span>}
                        <span style={{
                          fontSize: '0.65rem',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                          backgroundColor: c.status === 'approved' ? '#dcfce7' : c.status === 'pending' ? '#fef3c7' : '#fee2e2',
                          color: c.status === 'approved' ? '#166534' : c.status === 'pending' ? '#92400e' : '#991b1b',
                          textTransform: 'uppercase'
                        }}>
                          {c.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={12} /> {new Date(c.createdAt).toLocaleString()} &bull;{' '}
                        on <a href={`/blog/${c.post.slug}`} target="_blank" style={{ color: 'var(--admin-secondary)', textDecoration: 'none' }}>{c.post.title}</a>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => updateStatus(c.id, 'approved')} className={styles.logoutBtn} style={{ backgroundColor: 'white', border: '1px solid #dcfce7', color: '#166534' }} title="Approve">
                      <CheckCircle size={18} />
                    </button>
                    <button onClick={() => updateStatus(c.id, 'spam')} className={styles.logoutBtn} style={{ backgroundColor: 'white', border: '1px solid #fee2e2', color: '#991b1b' }} title="Mark as Spam">
                      <Flag size={18} />
                    </button>
                    <button onClick={() => deleteComment(c.id)} className={styles.logoutBtn} style={{ backgroundColor: 'white', border: '1px solid #fee2e2', color: '#ef4444' }} title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {c.parent && (
                  <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#f1f5f9', borderRadius: '8px', fontSize: '0.875rem', color: 'var(--admin-text-muted)', borderLeft: '3px solid var(--admin-border)' }}>
                    <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Replying to {c.parent.authorName}:</div>
                    &quot;{c.parent.content}&quot;
                  </div>
                )}

                <div style={{ fontSize: '1rem', color: 'var(--admin-text-main)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                  {c.content}
                </div>

                <div style={{ marginTop: '1.25rem' }}>
                  <button
                    onClick={() => setReplyingTo(c)}
                    style={{ background: 'none', border: 'none', color: 'var(--admin-secondary)', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: 0 }}
                  >
                    <Reply size={16} /> Quick Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reply Modal */}
      {replyingTo && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div className={styles.card} style={{ maxWidth: '600px', width: '100%', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--admin-primary)' }}>Reply to {replyingTo.authorName}</h2>
            <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px', fontSize: '0.9rem', color: 'var(--admin-text-muted)' }}>
              &quot;{replyingTo.content}&quot;
            </div>
            <textarea
              rows={5}
              placeholder="Type your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--admin-border)', fontSize: '1rem', marginBottom: '1.5rem', resize: 'none' }}
            />
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setReplyingTo(null)} className={styles.logoutBtn} style={{ backgroundColor: 'white', border: '1px solid var(--admin-border)' }}>Cancel</button>
              <button onClick={handleReply} className={styles.btnAction}>Send Reply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
