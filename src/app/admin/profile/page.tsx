import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import ProfileForm from "@/components/admin/ProfileForm";
import styles from "../layout.module.css";
import { User } from "lucide-react";

export default async function AdminProfilePage() {
  const session = await auth();
  
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email || "drtinapramanik@gmail.com" }
  }) || await prisma.user.findFirst();

  if (!user) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--admin-primary)' }}>No User Account Found</h2>
        <p>Please run <code>npx prisma db seed</code> to set up the default admin account.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--admin-primary)', margin: 0 }}>My Profile</h1>
        <p style={{ color: 'var(--admin-text-muted)', margin: 0 }}>Manage your personal details and public appearance.</p>
      </div>

      <div className={styles.card} style={{ padding: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem', paddingBottom: '2.5rem', borderBottom: '1px solid var(--admin-border)' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '20px', backgroundColor: 'var(--admin-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', overflow: 'hidden' }}>
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.image} alt={user.name || ""} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <User size={40} />
            )}
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--admin-primary)' }}>{user.name || 'Set your name'}</h2>
            <p style={{ margin: 0, color: 'var(--admin-text-muted)' }}>{user.email}</p>
          </div>
        </div>

        <ProfileForm initialData={{ name: user.name || '', image: user.image || '' }} />
      </div>
    </div>
  );
}
