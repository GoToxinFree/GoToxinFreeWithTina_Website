"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, FileText, 
  Home, 
  Leaf, ChevronRight, User as UserIcon,
  MessageSquare, Users
} from 'lucide-react';
import { getProfile } from '@/app/actions/admin';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [profile, setProfile] = useState<{ name?: string | null, image?: string | null, email?: string | null } | null>(null);

  useEffect(() => {
    getProfile().then(data => {
      if (data) setProfile(data);
    });
  }, []);

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 800, lineHeight: 1.2 }}>
            <Leaf size={22} color="#10b981" />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <span style={{ color: 'white' }}>GoToxinFree</span>
              <span style={{ color: '#00a6ce' }}>WithTina</span>
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

          <Link href="/admin/profile" className={`admin-nav-item ${pathname === '/admin/profile' ? 'admin-nav-item-active' : ''}`}>
            <UserIcon size={20} />
            My Profile
            {pathname === '/admin/profile' && <ChevronRight size={16} style={{ marginLeft: 'auto' }} />}
          </Link>

          <div style={{ margin: '2rem 0', padding: '0 1rem' }}>
            <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
          </div>

          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0 1.25rem 0.75rem' }}>
            Public Site
          </div>

          <Link href="/" className="admin-nav-item">
            <Home size={20} />
            View Live Site
          </Link>
        </nav>

        <div style={{ padding: '1.5rem', marginTop: 'auto' }}>
          <div style={{ 
            backgroundColor: 'rgba(0,0,0,0.2)', 
            padding: '1rem', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'var(--admin-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {profile?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.image} alt={profile.name || "Admin"} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <UserIcon size={18} color="white" />
              )}
            </div>
            <div style={{ minWidth: 0, overflow: 'hidden' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'white', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{profile?.name || "Loading..."}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Administrator</div>
            </div>
          </div>
        </div>
      </aside>
      
      <main className="admin-main-content">
        <header className="admin-top-bar">
          {/* We handle title inside pages for better control */}
          <div /> 
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
