import Link from "next/link";
import { Leaf } from "lucide-react";
import styles from "@/app/page.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logo}>
          <Leaf size={24} color="var(--accent)" />
          GoToxinFree<span>WithTina</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/about" className={styles.navLink}>About</Link>
          <Link href="/contact" className={styles.navLink}>Contact</Link>
          <Link href="/blog" className={styles.navLink}>Articles</Link>
        </nav>
      </div>
    </header>
  );
}
