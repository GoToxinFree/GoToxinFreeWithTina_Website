"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Globe, Settings as SettingsIcon, Trash2, Eye } from 'lucide-react';
import Editor from '@/components/admin/Editor';
import EditorTips from '@/components/admin/EditorTips';
import ArticlePreview from './ArticlePreview';
import styles from '@/app/admin/layout.module.css';

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
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <Link href="/admin/posts" className={styles.logoutBtn} style={{ backgroundColor: 'white', border: '1px solid var(--admin-border)' }}>
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--admin-primary)', margin: 0 }}>Edit Article</h1>
            <p style={{ color: 'var(--admin-text-muted)', margin: 0, fontSize: '0.875rem' }}>Refining your research</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            type="button"
            onClick={() => setShowPreview(true)}
            className={styles.btnAction}
            style={{ backgroundColor: 'white', color: 'var(--admin-primary)', border: '1px solid var(--admin-border)' }}
          >
            <Eye size={20} /> Preview
          </button>
          
          <button 
            type="button" 
            onClick={handleDelete}
            disabled={isDeleting}
            className={styles.logoutBtn}
            style={{ backgroundColor: 'white', border: '1px solid #fee2e2', color: '#ef4444' }}
            title="Delete Article"
          >
            <Trash2 size={20} />
          </button>

          <button 
            type="submit" 
            form="post-form"
            disabled={isSubmitting}
            className={styles.btnAction}
          >
            {isSubmitting ? 'Saving...' : <><Save size={20} /> Update Article</>}
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

      <form id="post-form" onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className={styles.card} style={{ padding: '2.5rem' }}>
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
          <div className={styles.card} style={{ padding: '1.5rem' }}>
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
              transition: 'all 0.2s'
            }}>
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
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
          </div>

          <div className={styles.card} style={{ padding: '1.5rem' }}>
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
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Cover Image URL</label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://..."
                style={{ width: '100%', padding: '0.625rem', borderRadius: '6px', border: '1px solid var(--admin-border)', fontSize: '0.875rem' }}
              />
            </div>
          </div>
          <EditorTips />
        </div>
      </form>
    </div>
  );
}
