import { signOut } from 'next-auth/react';
import styles from './Header.module.css';

export default function Header({ username }) {
  const welcomeBackText = `Welcome back, ${username}`;

  return (
    <header className={styles.header}>
      <span>{welcomeBackText}</span>

      <button className={styles.logout} type="button" onClick={signOut}>
        signout
      </button>
    </header>
  );
}
