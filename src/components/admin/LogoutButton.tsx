"use client";

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import styles from '@/app/admin/layout.module.css';

export default function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: '/' })} 
      className={styles.btnOutline} 
      title="Sign Out"
    >
      <LogOut size={20} />
      <span>Logout</span>
    </button>
  );
}
