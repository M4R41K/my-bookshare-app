import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.home}>
      <h1>Добро пожаловать в BookShare!</h1>
      <p>Арендуйте книги у других пользователей.</p>
    </div>
  );
}

export default Home;