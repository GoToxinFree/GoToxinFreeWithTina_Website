"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, Menu, X, ArrowRight } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on path change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className="comp-header">
      <div className={`container comp-header-container`}>
        <Link href="/" className="comp-logo">
          <Leaf size={24} color="var(--accent)" />
          GoToxinFree<span>WithTina</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="comp-nav desktop-only">
          <Link href="/" className={`comp-nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link href="/about" className={`comp-nav-link ${pathname === '/about' ? 'active' : ''}`}>About</Link>
          <Link href="/blog" className={`comp-nav-link ${pathname.startsWith('/blog') ? 'active' : ''}`}>Articles</Link>
          <Link href="/contact" className={`comp-nav-link ${pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="comp-mobile-toggle mobile-only" 
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open Menu"
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'var(--primary)', 
            cursor: 'pointer', 
            display: 'none',
            padding: '0.5rem'
          }}
        >
          <Menu size={28} />
        </button>

        {/* Mobile Slide-in Panel Backdrop */}
        <div 
          className={`comp-mobile-backdrop ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Mobile Slide-in Panel */}
        <aside className={`comp-mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: 'var(--primary)' }}>
              <Leaf size={20} color="var(--accent)" />
              Menu
            </div>
            <button 
              onClick={() => setIsMenuOpen(false)}
              style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <X size={24} color="var(--primary)" />
            </button>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link href="/" className={`comp-nav-link`} style={{ fontSize: '1.25rem', padding: '1rem 0', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between' }}>
              Home <ArrowRight size={18} opacity={0.3} />
            </Link>
            <Link href="/about" className={`comp-nav-link`} style={{ fontSize: '1.25rem', padding: '1rem 0', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between' }}>
              About <ArrowRight size={18} opacity={0.3} />
            </Link>
            <Link href="/blog" className={`comp-nav-link`} style={{ fontSize: '1.25rem', padding: '1rem 0', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between' }}>
              Articles <ArrowRight size={18} opacity={0.3} />
            </Link>
            <Link href="/contact" className={`comp-nav-link`} style={{ fontSize: '1.25rem', padding: '1rem 0', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between' }}>
              Contact <ArrowRight size={18} opacity={0.3} />
            </Link>
          </nav>

          <div style={{ marginTop: 'auto', padding: '1.5rem', backgroundColor: 'var(--surface)', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Ready to live toxin-free?</p>
            <Link href="/contact" className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>Get Started</Link>
          </div>
        </aside>
      </div>
    </header>
  );
}
