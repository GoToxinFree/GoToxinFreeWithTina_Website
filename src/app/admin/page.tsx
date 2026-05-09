import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PlusCircle, FileText, Clock, ArrowUpRight, MessageSquare, Eye, Users } from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const postsCount = await prisma.post.count();
  
  const totalViewsResult = await prisma.post.aggregate({
    _sum: { views: true }
  });
  const totalViews = totalViewsResult._sum.views || 0;

  const totalComments = await prisma.comment.count();
  const pendingCommentsCount = await prisma.comment.count({ where: { status: 'pending' } });
  const totalSubscribers = await prisma.subscriber.count({ where: { status: 'active' } });

  const recentPosts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { _count: { select: { comments: true } } }
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--admin-primary)', margin: 0 }}>Dashboard</h1>
          <p style={{ color: 'var(--admin-text-muted)', margin: 0, fontSize: '0.9rem' }}>Welcome back, Dr. Tina.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {pendingCommentsCount > 0 && (
            <Link href="/admin/comments" className="admin-logout-btn" style={{ backgroundColor: '#fef3c7', border: '1px solid #f59e0b', color: '#92400e', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 1rem' }}>
              <MessageSquare size={16} /> {pendingCommentsCount} Pending
            </Link>
          )}
          <Link href="/admin/posts/new" className="admin-btn-action">
            <PlusCircle size={18} /> New Article
          </Link>
          <LogoutButton />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        <StatCard 
          title="Total Views" 
          value={totalViews} 
          icon={<Eye size={24} />} 
          color="#3b82f6" 
        />
        <StatCard 
          title="Articles" 
          value={postsCount} 
          icon={<FileText size={24} />} 
          color="var(--admin-secondary)" 
        />
        <StatCard 
          title="Comments" 
          value={totalComments} 
          icon={<MessageSquare size={24} />} 
          color="var(--admin-accent)" 
        />
        <StatCard 
          title="Subscribers" 
          value={totalSubscribers} 
          icon={<Users size={24} />} 
          color="#8b5cf6" 
        />
      </div>

      <div className={"admin-card"} style={{ padding: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--admin-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Clock size={24} /> Recent Activity
          </h2>
          <Link href="/admin/posts" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--admin-secondary)', textDecoration: 'none' }}>
            View All &rarr;
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <h3 style={{ margin: 0, color: 'var(--admin-primary)' }}>No activity yet</h3>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {recentPosts.map(post => (
              <div key={post.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'var(--admin-bg)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--admin-secondary)' }}>
                     <FileText size={20} />
                   </div>
                   <div>
                     <div style={{ fontWeight: 700, color: 'var(--admin-primary)' }}>{post.title}</div>
                     <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{new Date(post.createdAt).toLocaleDateString()} &bull; {post.published ? 'Published' : 'Draft'}</div>
                   </div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--admin-primary)' }}>{post.views}</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--admin-text-muted)', textTransform: 'uppercase' }}>Views</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--admin-primary)' }}>{post._count.comments}</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--admin-text-muted)', textTransform: 'uppercase' }}>Comments</div>
                  </div>
                  <Link href={`/admin/posts/edit/${post.id}`} className={"admin-logout-btn"} style={{ backgroundColor: 'white' }}>
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string, value: number, icon: React.ReactNode, color: string }) {
  return (
    <div className="admin-card" style={{ padding: '1.75rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
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
