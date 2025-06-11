import React from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <h1>Арендуйте книги у других читателей</h1>
        <p>Экономьте деньги и делитесь любимыми произведениями</p>
        <Link to="/catalog" className={styles.ctaButton}>Начать поиск</Link>
      </section>

      <section className={styles.features}>
        <div className={styles.feature}>
          <h3>Как это работает?</h3>
          <p>1. Найдите интересующую книгу</p>
          <p>2. Арендуйте на нужный срок</p>
          <p>3. Получите книгу и наслаждайтесь чтением</p>
        </div>
      </section>
    </div>
  );
};

export default Home;