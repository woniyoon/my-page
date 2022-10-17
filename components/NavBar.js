import Link from 'next/link';
import styles from '@/styles/NavBar.module.css'

export default function NavBar() {
  return (
    <div className={styles.container}>
      <strong className={styles.name}>FE-J1</strong>
      <nav className={styles.navMenu}>
        <Link href="/about">
          <a className={styles.navMenuName}>about</a>
        </Link>
        <Link href="/experiences">
          <a className={styles.navMenuName}>experiences</a>
        </Link>
        <Link href="/contacts">
          <a className={styles.navMenuName}>contacts</a>
        </Link>
      </nav>
    </div>
  );
}