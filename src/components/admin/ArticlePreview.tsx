"use client";

import { X, ArrowLeft, Clock, User, Share2, Leaf } from 'lucide-react';
import styles from '@/app/page.module.css';
import '@/app/blog/blog.css';

interface ArticlePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    title: string;
    content: string;
    imageUrl?: string;
    published?: boolean;
    authorName?: string;
  };
}

export default function ArticlePreview({ isOpen, onClose, data }: ArticlePreviewProps) {
  if (!isOpen) return null;

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      backgroundColor: 'white', 
      zIndex: 1000, 
      overflowY: 'auto',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      {/* Top Header Bar */}
      <div style={{ 
        position: 'sticky', 
        top: 0, 
        backgroundColor: 'rgba(255,255,255,0.95)', 
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border)',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ backgroundColor: 'var(--admin-secondary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>
            LIVE PREVIEW MODE
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            This is exactly how your article will appear on the live site.
          </span>
        </div>
        <button 
          onClick={onClose}
          style={{ 
            backgroundColor: '#f1f5f9', 
            border: 'none', 
            padding: '0.5rem', 
            borderRadius: '50%', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
        >
          <X size={24} color="#1e293b" />
        </button>
      </div>

      {/* Actual Article Render (Replicating blog/[slug]/page.tsx) */}
      <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
        <header className={styles.header}>
          <div className={`container ${styles.headerContainer}`}>
            <div className={styles.logo}>
              <Leaf size={24} color="var(--accent)" />
              GoToxinFree<span>WithTina</span>
            </div>
            <nav className={styles.nav}>
              <span className={styles.navLink}>Home</span>
              <span className={styles.navLink} style={{color: 'var(--secondary)'}}>Blog</span>
              <span className={styles.navLink}>About Tina</span>
              <span className={styles.navLink}>Contact</span>
            </nav>
          </div>
        </header>

        <main>
          <article className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <ArrowLeft size={16} /> Back to Blog
            </div>

            {data.imageUrl && (
              <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', marginBottom: '2rem', aspectRatio: '21/9' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.imageUrl} alt={data.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}

            <header style={{ marginBottom: '3rem' }}>
              {!data.published && (
                <span style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '1rem', display: 'inline-block' }}>
                  DRAFT PREVIEW
                </span>
              )}
              <h1 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1.5rem', lineHeight: 1.1 }}>{data.title || 'Untitled Research'}</h1>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)' }}>
                    <User size={24} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{data.authorName || 'Tina Pramanik'}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Clock size={14} /> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                </div>
                <div style={{ border: '1px solid var(--border)', padding: '0.5rem 1rem', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                  <Share2 size={16} /> Share
                </div>
              </div>
            </header>

            <div className="prose-content" style={{ fontSize: '1.2rem', lineHeight: 1.7, color: 'var(--text-main)' }}>
              <div dangerouslySetInnerHTML={{ __html: data.content || '<p style="color:#adb5bd">No content yet...</p>' }} />
            </div>
          </article>
        </main>

        <footer className={styles.footer} style={{ marginTop: '5rem' }}>
          <div className="container">
            <div className={styles.footerBottom} style={{ textAlign: 'center' }}>
              &copy; {new Date().getFullYear()} Go Toxin Free With Tina. All rights reserved.
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
