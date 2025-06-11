import React, { useState } from 'react';
import styles from './AddBook.module.css';
import { useNavigate } from 'react-router-dom';
import { useRent } from '../../RentContext';

const AddBook = () => {
  const { addNewBook } = useRent();
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    genre: '',
    price: '',
    deposit: '',
    minPeriod: '7',
    description: ''
  });
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    addNewBook(bookData, image);
    
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/profile?tab=books');
    }, 1500);
  };
  return (
    <div className={styles.addBook}>
      <h1>Добавить книгу</h1>
      
      <form onSubmit={handleSubmit} className={styles.bookForm}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Название книги:</label>
            <input
              type="text"
              name="title"
              value={bookData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Автор:</label>
            <input
              type="text"
              name="author"
              value={bookData.author}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Жанр:</label>
            <input
              type="text"
              name="genre"
              value={bookData.genre}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Цена аренды (руб./неделя):</label>
            <input
              type="number"
              name="price"
              value={bookData.price}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
        </div>
        
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Залоговая стоимость (руб.):</label>
            <input
              type="number"
              name="deposit"
              value={bookData.deposit}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Минимальный срок аренды (дней):</label>
            <select
              name="minPeriod"
              value={bookData.minPeriod}
              onChange={handleChange}
            >
              <option value="7">7</option>
              <option value="14">14</option>
              <option value="30">30</option>
            </select>
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <label>Описание книги:</label>
          <textarea
            name="description"
            value={bookData.description}
            onChange={handleChange}
            rows="5"
          ></textarea>
        </div>
        
        <div className={styles.formGroup}>
          <label>Фото обложки:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {image && (
            <div className={styles.imagePreview}>
              <img src={URL.createObjectURL(image)} alt="Предпросмотр" />
            </div>
          )}
        </div>
        
        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Публикация...' : 'Опубликовать'}
        </button>
      </form>
    </div>
  );
};

export default AddBook;