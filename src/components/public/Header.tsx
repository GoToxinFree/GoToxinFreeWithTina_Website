"use client";

import { useState } from "react";
import Link from "next/link";
import { Leaf, Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="comp-header">
      <div className={`container comp-header-container`}>
        <Link href="/" className="comp-logo" onClick={() => setIsMenuOpen(false)}>
          <Leaf size={24} color="var(--accent)" />
          GoToxinFree<span>WithTina</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="comp-nav desktop-only">
          <Link href="/" className="comp-nav-link">Home</Link>
          <Link href="/about" className="comp-nav-link">About</Link>
          <Link href="/blog" className="comp-nav-link">Articles</Link>
          <Link href="/contact" className="comp-nav-link">Contact</Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="comp-mobile-toggle mobile-only" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
          style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'none' }}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div style={{
            position: 'fixed',
            top: '70px',
            left: 0,
            width: '100%',
            height: 'calc(100vh - 70px)',
            backgroundColor: 'white',
            zIndex: 1000,
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <Link href="/" className="comp-nav-link" style={{ fontSize: '1.5rem' }} onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/about" className="comp-nav-link" style={{ fontSize: '1.5rem' }} onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link href="/blog" className="comp-nav-link" style={{ fontSize: '1.5rem' }} onClick={() => setIsMenuOpen(false)}>Articles</Link>
            <Link href="/contact" className="comp-nav-link" style={{ fontSize: '1.5rem' }} onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </div>
        )}
      </div>
    </header>
  );
}
