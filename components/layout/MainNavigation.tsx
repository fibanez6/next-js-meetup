import Link from "next/link";
import styles from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>React Meetup</div>
      <nav>
        <ul>
          <li><Link href='/'>All Meetups</Link></li>
          <li><Link href='/meetups/new'>Add new Meetup</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;