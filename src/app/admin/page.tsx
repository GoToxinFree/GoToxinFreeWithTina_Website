import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PlusCircle, FileText, BarChart3, Clock, ArrowUpRight } from "lucide-react";
import styles from './layout.module.css';

export default async function AdminDashboard() {
  const postsCount = await prisma.post.count();
  const publishedCount = await prisma.post.count({ where: { published: true } });
  const draftCount = postsCount - publishedCount;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--admin-primary)', margin: 0 }}>Welcome back, Tina</h1>
          <p style={{ color: 'var(--admin-text-muted)', margin: 0, fontSize: '1.1rem' }}>Here's what's happening with your blog today.</p>
        </div>
        <Link href="/admin/posts/new" className={styles.btnAction}>
          <PlusCircle size={20} /> New Research Article
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <StatCard 
          title="Total Articles" 
          value={postsCount} 
          icon={<FileText size={24} />} 
          color="var(--admin-secondary)" 
        />
        <StatCard 
          title="Published Research" 
          value={publishedCount} 
          icon={<ArrowUpRight size={24} />} 
          color="var(--admin-accent)" 
        />
        <StatCard 
          title="Ongoing Drafts" 
          value={draftCount} 
          icon={<Clock size={24} />} 
          color="var(--admin-text-muted)" 
        />
      </div>

      <div className={styles.card} style={{ padding: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--admin-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <BarChart3 size={24} /> Recent Activity
          </h2>
          <Link href="/admin/posts" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--admin-secondary)', textDecoration: 'none' }}>
            View All Articles &rarr;
          </Link>
        </div>

        {postsCount === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ width: '64px', height: '64px', backgroundColor: 'var(--admin-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--admin-text-muted)' }}>
              <FileText size={32} />
            </div>
            <h3 style={{ margin: 0, color: 'var(--admin-primary)' }}>No articles yet</h3>
            <p style={{ color: 'var(--admin-text-muted)', marginBottom: '1.5rem' }}>Start your first research article to see activity here.</p>
            <Link href="/admin/posts/new" className={styles.btnAction}>
              Start Writing
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <p style={{ color: 'var(--admin-text-muted)' }}>You have {postsCount} articles in your database. Head over to the Articles tab to manage them.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string, value: number, icon: React.ReactNode, color: string }) {
  return (
    <div className={styles.card} style={{ padding: '1.75rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
      <div style={{ 
        width: '56px', 
        height: '56px', 
        borderRadius: '16px', 
        backgroundColor: `${color}15`, 
        color: color, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        {icon}
      </div>
      <div>
        <h3 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: 'var(--admin-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {title}
        </h3>
        <p style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: 'var(--admin-primary)' }}>
          {value}
        </p>
      </div>
    </div>
  );
}
