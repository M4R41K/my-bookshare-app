import React, { useState } from 'react';
import { useRent } from '../../RentContext';
import styles from './Catalog.module.css';
import { Link } from 'react-router-dom';

const Catalog = () => {
  const { books } = useRent();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('title');

  const filteredBooks = books
    .filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'title') return a.title.localeCompare(b.title);
      if (sortOption === 'price') return a.price - b.price;
      return 0;
    });

  return (
    <div className={styles.catalog}>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Поиск по названию или автору..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <select 
          value={sortOption} 
          onChange={(e) => setSortOption(e.target.value)}
          className={styles.sortSelect}
        >
          <option value="title">По названию</option>
          <option value="price">По цене</option>
        </select>
      </div>

      <div className={styles.bookGrid}>
        {filteredBooks.map(book => (
          <div key={book.id} className={styles.bookCard}>
            <div className={styles.bookCover}>
              {book.image ? (
                <img src={book.image} alt={book.title} className={styles.bookImage} />
              ) : (
                book.title.charAt(0)
              )}
            </div>
            <div className={styles.bookInfo}>
              <h3>{book.title}</h3>
              <p className={styles.author}>{book.author}</p>
              <p className={styles.price}>{book.price} руб./неделя</p>
              <Link 
                to={`/book/${book.id}`} 
                className={`${styles.rentButton} ${!book.available ? styles.disabled : ''}`}
              >
                {book.available ? 'Арендовать' : 'Недоступно'}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;