"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Globe, Eye, Layout, Settings as SettingsIcon } from 'lucide-react';
import Editor from '@/components/admin/Editor';
import EditorTips from '@/components/admin/EditorTips';
import ArticlePreview from '@/components/admin/ArticlePreview';
import styles from '../../layout.module.css';

export default function NewPostPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    published: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState('');

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
      
    setFormData({ ...formData, title, slug });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create post');
      }

      router.push('/admin/posts');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
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
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--admin-primary)', margin: 0 }}>New Article</h1>
            <p style={{ color: 'var(--admin-text-muted)', margin: 0, fontSize: '0.875rem' }}>Drafting a new research insight</p>
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
            type="submit" 
            form="post-form"
            disabled={isSubmitting}
            className={styles.btnAction}
          >
            {isSubmitting ? 'Saving...' : <><Save size={20} /> Save Article</>}
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
        {/* Main Editor Section */}
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

        {/* Sidebar Settings Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Status Card */}
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

          {/* Meta Card */}
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
