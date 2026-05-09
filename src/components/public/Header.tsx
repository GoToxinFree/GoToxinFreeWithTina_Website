import Link from "next/link";
import { Leaf } from "lucide-react";
import styles from "@/app/page.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logo} prefetch={false}>
          <Leaf size={24} color="var(--accent)" />
          GoToxinFree<span>WithTina</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink} prefetch={false}>Home</Link>
          <Link href="/about" className={styles.navLink} prefetch={false}>About</Link>
          <Link href="/blog" className={styles.navLink} prefetch={false}>Articles</Link>
          <Link href="/contact" className={styles.navLink} prefetch={false}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}
