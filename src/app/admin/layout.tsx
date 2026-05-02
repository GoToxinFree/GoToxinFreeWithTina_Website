"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { LayoutDashboard, FileText, Settings, LogOut, Home } from 'lucide-react';
import styles from './layout.module.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Admin Portal</h2>
        </div>
        <nav className={styles.sidebarNav}>
          <Link href="/admin" className={`${styles.navItem} ${pathname === '/admin' ? styles.navItemActive : ''}`}>
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link href="/admin/posts" className={`${styles.navItem} ${pathname.startsWith('/admin/posts') ? styles.navItemActive : ''}`}>
            <FileText size={20} />
            Articles
          </Link>
          <Link href="/" className={styles.navItem} style={{ marginTop: '2rem' }}>
            <Home size={20} />
            Live Site
          </Link>
        </nav>
      </aside>
      
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.userActions} style={{ marginLeft: 'auto' }}>
            <button onClick={() => signOut({ callbackUrl: '/' })} className={styles.logoutBtn}>
              <LogOut size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'text-bottom' }} />
              Log Out
            </button>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
