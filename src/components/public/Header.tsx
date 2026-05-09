import Link from "next/link";
import { Leaf } from "lucide-react";

export default function Header() {
  return (
    <header className="comp-header">
      <div className={`container comp-header-container`}>
        <Link href="/" className="comp-logo" prefetch={false}>
          <Leaf size={24} color="var(--accent)" />
          GoToxinFree<span>WithTina</span>
        </Link>
        <nav className="comp-nav">
          <Link href="/" className="comp-nav-link" prefetch={false}>Home</Link>
          <Link href="/about" className="comp-nav-link" prefetch={false}>About</Link>
          <Link href="/blog" className="comp-nav-link" prefetch={false}>Articles</Link>
          <Link href="/contact" className="comp-nav-link" prefetch={false}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}

