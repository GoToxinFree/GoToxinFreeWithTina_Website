"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, FileText, 
  Home, 
  Leaf, ChevronRight, User as UserIcon,
  MessageSquare, Users, Menu, X
} from 'lucide-react';
import { getProfile } from '@/app/actions/admin';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [profile, setProfile] = useState<{ name?: string | null, image?: string | null, email?: string | null } | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    getProfile().then(data => {
      if (data) setProfile(data);
    });
  }, []);

  // Close sidebar on path change (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="admin-container">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 90,
            animation: 'fadeIn 0.2s ease-out'
          }}
          className="mobile-only"
        />
      )}

      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <Link href="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{ backgroundColor: 'white', padding: '0.5rem', borderRadius: '10px', display: 'flex', flexShrink: 0 }}>
                <Leaf size={24} color="var(--admin-secondary)" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
                <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>GoToxinFree</h2>
                <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--admin-secondary)' }}>WithTina</h2>
              </div>
            </div>
            <div style={{ paddingLeft: '3.35rem', fontSize: '0.75rem', fontWeight: 600, opacity: 0.8, color: 'white', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Admin Panel
            </div>
          </Link>
        </div>
        
        <nav className="admin-sidebar-nav">
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0 1.25rem 0.75rem' }}>
            Main Menu
          </div>
          
          <Link href="/admin" className={`admin-nav-item ${pathname === '/admin' ? 'admin-nav-item-active' : ''}`}>
            <LayoutDashboard size={20} />
            Dashboard
            {pathname === '/admin' && <ChevronRight size={16} style={{ marginLeft: 'auto' }} />}
          </Link>
          
          <Link href="/admin/posts" className={`admin-nav-item ${pathname.startsWith('/admin/posts') ? 'admin-nav-item-active' : ''}`}>
            <FileText size={20} />
            Articles
            {pathname.startsWith('/admin/posts') && <ChevronRight size={16} style={{ marginLeft: 'auto' }} />}
          </Link>

          <Link href="/admin/comments" className={`admin-nav-item ${pathname.startsWith('/admin/comments') ? 'admin-nav-item-active' : ''}`}>
            <MessageSquare size={20} />
            Discussions
            {pathname.startsWith('/admin/comments') && <ChevronRight size={16} style={{ marginLeft: 'auto' }} />}
          </Link>

          <Link href="/admin/subscribers" className={`admin-nav-item ${pathname.startsWith('/admin/subscribers') ? 'admin-nav-item-active' : ''}`}>
            <Users size={20} />
            Subscribers
            {pathname.startsWith('/admin/subscribers') && <ChevronRight size={16} style={{ marginLeft: 'auto' }} />}
          </Link>
          
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '1.5rem 1.25rem 0.75rem' }}>
            System
          </div>
          
          <Link href="/admin/profile" className={`admin-nav-item ${pathname === '/admin/profile' ? 'admin-nav-item-active' : ''}`}>
            <UserIcon size={20} />
            My Profile
          </Link>
          
          <Link href="/" className="admin-nav-item">
            <Home size={20} />
            Live Website
          </Link>
        </nav>

        <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {profile?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.image} alt={profile.name || 'Admin'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <UserIcon size={18} />
              )}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile?.name || 'Tina Pramanik'}</div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile?.email || 'Admin'}</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="admin-main-content">
        <header className="admin-top-bar mobile-only" style={{ display: 'none', marginBottom: '1.5rem', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            style={{ background: 'white', border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <Menu size={24} color="var(--admin-primary)" />
          </button>
          <h2 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 800, color: 'var(--admin-primary)' }}>GoToxinFree<span style={{ color: 'var(--admin-secondary)' }}>WithTina</span></h2>
        </header>
        {children}
      </main>
    </div>
  );
}
