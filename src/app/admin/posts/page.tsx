import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PlusCircle, Edit, Trash2, Eye } from "lucide-react";

import BackupButton from "./BackupButton";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: true }
  });

  return (
    <div>
      <div className="admin-header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--primary)', margin: 0 }}>Articles</h1>
        <div className="admin-header-actions" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <BackupButton />
          <Link href="/admin/posts/new" className={"admin-btn-action"}>
            <PlusCircle size={20} /> New Article
          </Link>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '8px', border: '1px solid var(--border)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '1rem' }}>Title</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem' }}>Date</th>
              <th style={{ padding: '1rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No articles found. <Link href="/admin/posts/new" style={{ color: 'var(--secondary)' }}>Create your first one!</Link>
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{post.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/{post.slug}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '4px', 
                      fontSize: '0.75rem', 
                      fontWeight: 600,
                      backgroundColor: post.published ? 'rgba(76, 175, 80, 0.1)' : 'var(--surface)',
                      color: post.published ? 'var(--accent)' : 'var(--text-muted)'
                    }}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <Link href={`/blog/${post.slug}`} target="_blank" style={{ color: 'var(--text-muted)' }} title="View Live">
                        <Eye size={18} />
                      </Link>
                      <Link href={`/admin/posts/edit/${post.id}`} style={{ color: 'var(--secondary)' }} title="Edit">
                        <Edit size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
