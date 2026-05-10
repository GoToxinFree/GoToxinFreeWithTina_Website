"use client";

import { useState } from 'react';
import { User, MessageSquare, Send, Reply, Shield } from 'lucide-react';

interface Comment {
  id: string;
  content: string;
  authorName: string;
  isAdmin: boolean;
  createdAt: string;
  replies?: Comment[];
}

interface CommentSectionProps {
  postId: string;
  initialComments: any[];
}

import { postComment } from '@/app/actions/blog';

export default function CommentSection({ postId, initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(Array.isArray(initialComments) ? initialComments : []);
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !name.trim()) return;

    setIsSubmitting(true);
    try {
      const result = await postComment({
        postId,
        content: newComment,
        authorName: name,
        authorEmail: email,
        parentId: replyTo
      });

      if (result.success && result.comment) {
        const addedComment = result.comment as any;
        if (replyTo) {
          setComments(comments.map(c => 
            c.id === replyTo 
              ? { ...c, replies: [...(c.replies || []), addedComment] }
              : c
          ));
        } else {
          setComments([addedComment, ...comments]);
        }
        setNewComment('');
        setReplyTo(null);
      }
    } catch (error) {
      console.error('Failed to post comment', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section style={{ marginTop: '4rem', paddingTop: '4rem', borderTop: '1px solid var(--border)' }}>
      <h2 style={{ fontSize: '1.75rem', color: 'var(--primary)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <MessageSquare size={24} /> Discussion ({comments.length + comments.reduce((acc, c) => acc + (c.replies?.length || 0), 0)})
      </h2>

      {/* Comment Form */}
      <div className="comment-form-container" style={{ backgroundColor: 'var(--surface)', borderRadius: '12px', marginBottom: '3rem', border: '1px solid var(--border)', overflow: 'hidden' }}>
        <div style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
            {replyTo ? 'Reply to Comment' : 'Leave a Thought'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="comment-form-grid" style={{ marginBottom: '1rem' }}>
              <input 
                type="text" 
                placeholder="Your Name*" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem', backgroundColor: 'white', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--secondary)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
              />
              <input 
                type="email" 
                placeholder="Your Email (private)" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem', backgroundColor: 'white', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--secondary)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>
            <textarea 
              placeholder="Share your perspective or ask a question..." 
              required 
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              style={{ width: '100%', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1.05rem', marginBottom: '1.5rem', resize: 'none', backgroundColor: 'white', outline: 'none', transition: 'border-color 0.2s' }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--secondary)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              {replyTo ? (
                <button 
                  type="button" 
                  onClick={() => setReplyTo(null)}
                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                >
                  Cancel Reply
                </button>
              ) : <div />}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-primary" 
                style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.9rem 2rem', borderRadius: '99px', boxShadow: '0 4px 12px rgba(0, 166, 206, 0.2)' }}
              >
                {isSubmitting ? 'Posting...' : <><Send size={18} /> Post Comment</>}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Comments List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {comments.map((comment) => (
          <div key={comment.id} style={{ display: 'flex', gap: '1.25rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: comment.isAdmin ? 'var(--secondary)' : 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: comment.isAdmin ? 'white' : 'var(--text-muted)' }}>
              <User size={20} />
            </div>
            <div style={{ flexGrow: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--primary)' }}>
                  {comment.authorName}
                  {comment.isAdmin && <span style={{ marginLeft: '0.5rem', fontSize: '0.65rem', backgroundColor: 'var(--secondary)', color: 'white', padding: '0.15rem 0.5rem', borderRadius: '4px', verticalAlign: 'middle' }}>ADMIN</span>}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p style={{ margin: 0, lineHeight: 1.6, color: 'var(--text-main)' }}>{comment.content}</p>
              <button 
                onClick={() => setReplyTo(comment.id)}
                style={{ background: 'none', border: 'none', color: 'var(--secondary)', cursor: 'pointer', fontSize: '0.85rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: 0 }}
              >
                <Reply size={14} /> Reply
              </button>

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div style={{ marginTop: '1.5rem', paddingLeft: '1.5rem', borderLeft: '2px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {comment.replies.map(reply => (
                    <div key={reply.id} style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: reply.isAdmin ? 'var(--secondary)' : 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: reply.isAdmin ? 'white' : 'var(--text-muted)' }}>
                        <User size={16} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                          <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem' }}>
                            {reply.authorName}
                            {reply.isAdmin && <span style={{ marginLeft: '0.5rem', fontSize: '0.65rem', backgroundColor: 'var(--secondary)', color: 'white', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>ADMIN</span>}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {new Date(reply.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.5 }}>{reply.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
