import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PlusCircle, FileText, Users } from "lucide-react";

export default async function AdminDashboard() {
  // Fetch high-level stats from the database
  const postsCount = await prisma.post.count();
  const publishedCount = await prisma.post.count({ where: { published: true } });
  const draftCount = postsCount - publishedCount;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--primary)' }}>Overview</h1>
        <Link href="/admin/posts/new" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <PlusCircle size={20} /> New Article
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'rgba(0, 166, 206, 0.1)', color: 'var(--secondary)', borderRadius: '8px' }}>
            <FileText size={32} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-muted)' }}>Total Articles</h3>
            <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>{postsCount}</p>
          </div>
        </div>

        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'rgba(76, 175, 80, 0.1)', color: 'var(--accent)', borderRadius: '8px' }}>
            <FileText size={32} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-muted)' }}>Published</h3>
            <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>{publishedCount}</p>
          </div>
        </div>

        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'var(--surface)', color: 'var(--text-muted)', borderRadius: '8px' }}>
            <FileText size={32} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-muted)' }}>Drafts</h3>
            <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>{draftCount}</p>
          </div>
        </div>
      </div>

      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '1rem' }}>Recent Activity</h2>
        {postsCount === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No articles found. Click "New Article" to get started.</p>
        ) : (
          <p style={{ color: 'var(--text-muted)' }}>Your recent articles will appear here.</p>
        )}
      </div>
    </div>
  );
}
