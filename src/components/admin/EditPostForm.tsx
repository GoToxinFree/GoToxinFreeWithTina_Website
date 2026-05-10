"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Globe, Settings as SettingsIcon, Trash2, Eye } from 'lucide-react';
import Editor from '@/components/admin/Editor';
import EditorTips from '@/components/admin/EditorTips';
import ArticlePreview from './ArticlePreview';


interface EditPostFormProps {
  post: any;
}

import { updatePost, deletePost } from '@/app/actions/admin';

export default function EditPostForm({ post }: EditPostFormProps) {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || '',
    content: post.content,
    imageUrl: post.imageUrl || '',
    published: post.published,
    notifySubscribers: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({ ...formData, title });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const result = await updatePost(post.id, formData);

      if (!result.success) {
        throw new Error(result.error || 'Failed to update post');
      }

      router.push('/admin/posts');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this article? This action cannot be undone.')) return;
    
    setIsDeleting(true);
    try {
      const result = await deletePost(post.id);

      if (!result.success) throw new Error(result.error || 'Failed to delete post');

      router.push('/admin/posts');
      router.refresh();
    } catch (err: any) {
      alert(err.message);
      setIsDeleting(false);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <header className="admin-header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <Link href="/admin/posts" className={"admin-logout-btn"} style={{ backgroundColor: 'white', border: '1px solid var(--admin-border)' }}>
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--admin-primary)', margin: 0 }}>Edit Article</h1>
            <p style={{ color: 'var(--admin-text-muted)', margin: 0, fontSize: '0.875rem' }}>Refining your research</p>
          </div>
        </div>
        
        <div className="admin-header-actions" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            type="button"
            onClick={() => setShowPreview(true)}
            className={"admin-btn-action"}
            style={{ backgroundColor: 'white', color: 'var(--admin-primary)', border: '1px solid var(--admin-border)' }}
          >
            <Eye size={20} /> Preview
          </button>
          
          <button 
            type="button" 
            onClick={handleDelete}
            disabled={isDeleting}
            className={"admin-logout-btn"}
            style={{ backgroundColor: 'white', border: '1px solid #fee2e2', color: '#ef4444' }}
            title="Delete Article"
          >
            <Trash2 size={20} />
          </button>

          <button 
            type="submit" 
            form="post-form"
            disabled={isSubmitting}
            className={"admin-btn-action"}
          >
            {isSubmitting ? 'Saving...' : (
              formData.published ? <><Globe size={20} /> Update & Publish</> : <><Save size={20} /> Update Draft</>
            )}
          </button>
        </div>
      </header>

      <ArticlePreview 
        isOpen={showPreview} 
        onClose={() => setShowPreview(false)} 
        data={{
          title: formData.title,
          content: formData.content,
          imageUrl: formData.imageUrl,
          published: formData.published
        }}
      />

      {error && (
        <div style={{ padding: '1rem 1.5rem', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #fca5a5', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontWeight: 700 }}>Error:</span> {error}
        </div>
      )}

      <form id="post-form" className="admin-editor-grid" onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className={"admin-card"} style={{ padding: '2.5rem' }}>
            <input
              type="text"
              required
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="Enter article title..."
              style={{ 
                width: '100%', 
                border: 'none', 
                borderBottom: '2px solid transparent',
                fontSize: '2.5rem', 
                fontWeight: 800, 
                color: 'var(--admin-primary)',
                outline: 'none',
                marginBottom: '1.5rem',
                padding: '0.5rem 0',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderBottomColor = 'var(--admin-secondary)'}
              onBlur={(e) => e.target.style.borderBottomColor = 'transparent'}
            />

            <Editor 
              content={formData.content} 
              onChange={(content) => setFormData({ ...formData, content })} 
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className={"admin-card"} style={{ padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--admin-primary)' }}>
              <Globe size={18} /> Visibility
            </h3>
            
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem', 
              padding: '1rem', 
              backgroundColor: formData.published ? 'rgba(16, 185, 129, 0.05)' : 'rgba(100, 116, 139, 0.05)',
              borderRadius: '8px',
              cursor: 'pointer',
              border: '1px solid',
              borderColor: formData.published ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
              transition: 'all 0.2s',
              marginBottom: formData.published ? '1rem' : 0
            }}>
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked, notifySubscribers: e.target.checked ? formData.notifySubscribers : false })}
                style={{ width: '20px', height: '20px', accentColor: 'var(--admin-accent)' }}
              />
              <div>
                <span style={{ display: 'block', fontWeight: 600, color: formData.published ? 'var(--admin-accent)' : 'var(--admin-text-main)' }}>
                  {formData.published ? 'Published' : 'Draft'}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>
                  {formData.published ? 'Visible to everyone' : 'Only visible to you'}
                </span>
              </div>
            </label>

            {formData.published && (
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                padding: '1rem', 
                backgroundColor: 'rgba(0, 166, 206, 0.05)',
                borderRadius: '8px',
                cursor: 'pointer',
                border: '1px solid rgba(0, 166, 206, 0.2)',
                transition: 'all 0.2s'
              }}>
                <input
                  type="checkbox"
                  checked={formData.notifySubscribers}
                  onChange={(e) => setFormData({ ...formData, notifySubscribers: e.target.checked })}
                  style={{ width: '20px', height: '20px', accentColor: 'var(--admin-secondary)' }}
                />
                <div>
                  <span style={{ display: 'block', fontWeight: 600, color: 'var(--admin-secondary)' }}>
                    Notify Subscribers
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>
                    Send email alert on save
                  </span>
                </div>
              </label>
            )}
          </div>

          <div className={"admin-card"} style={{ padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--admin-primary)' }}>
              <SettingsIcon size={18} /> Configuration
            </h3>
            
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>URL Slug</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)', fontSize: '0.875rem' }}>/blog/</span>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  style={{ width: '100%', padding: '0.625rem 0.625rem 0.625rem 3.5rem', borderRadius: '6px', border: '1px solid var(--admin-border)', fontSize: '0.875rem', backgroundColor: 'var(--admin-bg)' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Excerpt</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief summary..."
                rows={3}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--admin-border)', fontSize: '0.875rem', resize: 'none' }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '1rem', fontSize: '1rem', fontWeight: 700, color: 'var(--admin-primary)' }}>Feature Image</label>
              
              <div 
                className="admin-upload-zone"
                onClick={() => document.getElementById('image-upload')?.click()}
                style={{ 
                  position: 'relative',
                  width: '100%',
                  minHeight: '220px',
                  border: '2px dashed var(--admin-border)',
                  borderRadius: '16px',
                  backgroundColor: 'var(--admin-bg)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  padding: formData.imageUrl ? '0' : '2rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--admin-secondary)';
                  e.currentTarget.style.backgroundColor = 'rgba(0, 166, 206, 0.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--admin-border)';
                  e.currentTarget.style.backgroundColor = 'var(--admin-bg)';
                }}
              >
                {formData.imageUrl ? (
                  <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <img 
                      src={formData.imageUrl} 
                      alt="Preview" 
                      style={{ width: '100%', height: '220px', objectFit: 'cover' }} 
                    />
                    <div style={{ 
                      position: 'absolute', 
                      inset: 0, 
                      backgroundColor: 'rgba(0,0,0,0.4)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      opacity: 0, 
                      transition: 'opacity 0.2s' 
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                    >
                      <span style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem', backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '99px', backdropFilter: 'blur(4px)' }}>
                        Click to Change Image
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(0, 166, 206, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: 'var(--admin-secondary)' }}>
                      <Globe size={32} />
                    </div>
                    <span style={{ fontWeight: 700, color: 'var(--admin-primary)', marginBottom: '0.25rem' }}>Upload or Drop Image</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>JPG, PNG, WEBP (Max 5MB)</span>
                  </>
                )}
                
                <input
                  type="file"
                  accept="image/*"
                  id="image-upload"
                  style={{ display: 'none' }}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const data = new FormData();
                    data.append('file', file);

                    try {
                      const res = await fetch('/api/admin/upload', {
                        method: 'POST',
                        body: data,
                      });
                      if (!res.ok) throw new Error('Upload failed');
                      const { url } = await res.json();
                      setFormData({ ...formData, imageUrl: url });
                    } catch (err: any) {
                      setError('Image upload failed: ' + err.message);
                    }
                  }}
                />
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>External Image URL</label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="Paste URL here..."
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    borderRadius: '8px', 
                    border: '1px solid var(--admin-border)', 
                    fontSize: '0.875rem',
                    backgroundColor: 'white'
                  }}
                />
              </div>
            </div>
          </div>
          <EditorTips />
        </div>
      </form>
    </div>
  );
}
