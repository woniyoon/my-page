import Link from 'next/link';
import styles from '@/styles/NavBar.module.css'
import {useRouter} from 'next/router';

export default function NavBar() {
  const router = useRouter();
  
  return (
    <div className={styles.container}>
      <strong className={styles.name}>FE-J1</strong>
      <nav className={styles.navMenu}>
        {
          menuNames.map((menu, index) => {
            return (
            <Link 
              key={`nav-menu-${index}`}
              href={menu.path}
            >
              <a
                className={`${styles.navMenuName} ${router.pathname === menu.path ? styles.currentMenu : ''}`}
              >
                {menu.title}
              </a>
            </Link>);
          })
        }
      </nav>
    </div>
  );
}

const menuNames = [
  {
    title: 'about',
    path: '/about',
  },
  {
    title: 'experiences',
    path: '/experiences',
  },
  {
    title: 'contacts',
    path: '/contacts',
  },
];