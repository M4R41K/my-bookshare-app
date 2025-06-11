import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRent } from '../../RentContext';
import styles from './BookPage.module.css';

const BookPage = () => {
  const { id } = useParams();
  const { books, addRental } = useRent();
  const [rentPeriod, setRentPeriod] = useState(7);
  const [isRented, setIsRented] = useState(false);

  const book = books.find(b => b.id === parseInt(id));

  const calculatePrice = () => {
    if (!book) return 0;
    if (rentPeriod === 7) return book.price;
    if (rentPeriod === 14) return book.price * 1.8;
    if (rentPeriod === 30) return book.price * 3;
    return book.price;
  };

  const handleRent = () => {
    if (!book || !book.available) return;
    addRental(book.id, rentPeriod);
    setIsRented(true);
  };

  if (!book) return <div className={styles.loading}>Книга не найдена</div>;

  return (
    <div className={styles.bookPage}>
      <div className={styles.bookContainer}>
        <div className={styles.bookCover}>
          {book.image ? (
            <img src={book.image} alt={book.title} className={styles.bookImage} />
          ) : (
            book.title.charAt(0)
          )}
        </div>
        
        <div className={styles.bookDetails}>
          <h1>{book.title}</h1>
          <h2>{book.author}</h2>
          
          <div className={styles.meta}>
            <span>Жанр: {book.genre}</span>
          </div>
          
          <p className={styles.description}>{book.description}</p>
          
          {!isRented ? (
            <div className={styles.rentForm}>
              <h3>Арендовать книгу</h3>
              
              <div className={styles.formGroup}>
                <label>Срок аренды:</label>
                <select 
                  value={rentPeriod} 
                  onChange={(e) => setRentPeriod(parseInt(e.target.value))}
                >
                  <option value={7}>7 дней - {book.price} руб.</option>
                  <option value={14}>14 дней - {book.price * 1.8} руб.</option>
                  <option value={30}>30 дней - {book.price * 3} руб.</option>
                </select>
              </div>
              
              <div className={styles.total}>
                Итого: {calculatePrice()} руб.
              </div>
              
              <button 
                onClick={handleRent}
                className={styles.rentButton}
                disabled={!book.available}
              >
                {book.available ? 'Арендовать' : 'Недоступно'}
              </button>
            </div>
          ) : (
            <div className={styles.successMessage}>
              <h3>Книга успешно арендована!</h3>
              <p>Срок аренды: {rentPeriod} дней</p>
              <p>Сумма: {calculatePrice()} руб.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookPage;