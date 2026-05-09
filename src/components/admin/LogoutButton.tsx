"use client";

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';


export default function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: '/' })} 
      className={"admin-btn-outline"} 
      title="Sign Out"
    >
      <LogOut size={20} />
      <span>Logout</span>
    </button>
  );
}
