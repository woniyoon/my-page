import Link from 'next/link';
import styles from '@/styles/SideBar.module.css'

export default function SideBar() {
  return (
    <div className={styles.container}>
      <strong className={styles.name}>Jae.Y</strong>
      <nav className={styles.navMenu}>
        <Link href="/about">
          <a style={{marginTop: 5}}>about</a>
        </Link>
        <Link href="/works">
          <a style={{marginTop: 5}}>works</a>
        </Link>
        <Link href="/contacts">
          <a style={{marginTop: 5}}>contacts</a>
        </Link>
      </nav>
    </div>
  );
}