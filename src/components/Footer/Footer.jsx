import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Контакты</h3>
          <p>Телефон: +7 (123) 456-78-90</p>
          <p>Email: info@bookshare.ru</p>
        </div>
        <div className={styles.footerSection}>
          <h3>Адрес</h3>
          <p>г. Москва, ул. Книжная, д. 10</p>
          <p>Работаем: Пн-Пт 9:00-18:00</p>
        </div>
        <div className={styles.footerSection}>
          <h3>Соцсети</h3>
          <p>VK: @bookshare</p>
          <p>Telegram: @bookshare_news</p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© 2025 BookShare. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;