import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">BookShare</Link>
      </div>
      <nav className={styles.nav}>
        <Link to="/catalog">Каталог</Link>
        <Link to="/profile">Профиль</Link>
        <Link to="/add-book">Добавить книгу</Link>
      </nav>
    </header>
  );
};

export default Header;