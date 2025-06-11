import React, { useState, useRef } from 'react';
import { useRent } from '../../RentContext';
import styles from './Profile.module.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('rentals');
  const { rentals, myBooks, cancelRental, removeBook } = useRent();
  const [userData, setUserData] = useState({
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    paymentMethod: 'Карта **** 1234',
    avatar: null
  });
  const [tempData, setTempData] = useState({ ...userData });
  const fileInputRef = useRef(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempData({
          ...tempData,
          avatar: event.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData({
      ...tempData,
      [name]: value
    });
  };

  const handleSave = () => {
    setUserData({ ...tempData });
    alert('Изменения сохранены!');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'rentals':
        return (
          <div className={styles.tabContent}>
            <h3>Мои аренды</h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Книга</th>
                  <th>Срок</th>
                  <th>Стоимость</th>
                  <th>Статус</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {rentals.map(rental => (
                  <tr key={rental.id}>
                    <td>{rental.title}</td>
                    <td>{rental.period}</td>
                    <td>{rental.price} руб.</td>
                    <td>{rental.status}</td>
                    <td>
                      <button 
                        onClick={() => cancelRental(rental.id)}
                        className={styles.smallButton}
                      >
                        Отменить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'books':
        return (
          <div className={styles.tabContent}>
            <h3>Мои книги</h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Книга</th>
                  <th>Статус</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {myBooks.map(book => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.status}</td>
                    <td>
                      <button 
                        onClick={() => removeBook(book.id)}
                        className={styles.smallButton}
                      >
                        Снять с аренды
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'settings':
        return (
          <div className={styles.tabContent}>
            <h3>Настройки профиля</h3>
            <form className={styles.settingsForm} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.avatarSection}>
                <div 
                  className={styles.avatar} 
                  onClick={() => fileInputRef.current.click()}
                  style={tempData.avatar ? { backgroundImage: `url(${tempData.avatar})` } : null}
                >
                  {!tempData.avatar && (userData.name.match(/\b(\w)/g)?.join('') || 'ИИ')}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <p className={styles.avatarHint}>Нажмите для смены аватарки</p>
              </div>
              
              <div className={styles.formGroup}>
                <label>Имя:</label>
                <input
                  type="text"
                  name="name"
                  value={tempData.name}
                  onChange={handleChange}
                  className={styles.settingsInput}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={tempData.email}
                  onChange={handleChange}
                  className={styles.settingsInput}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Способ оплаты:</label>
                <input
                  type="text"
                  name="paymentMethod"
                  value={tempData.paymentMethod}
                  onChange={handleChange}
                  className={styles.settingsInput}
                />
              </div>
              <button 
                type="button" 
                className={styles.saveButton}
                onClick={handleSave}
              >
                Сохранить изменения
              </button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.profile}>
      <div className={styles.profileHeader}>
        <h2>Мой профиль</h2>
        <div className={styles.userInfo}>
          <div 
            className={styles.avatar}
            style={userData.avatar ? { backgroundImage: `url(${userData.avatar})` } : null}
          >
            {!userData.avatar && (userData.name.match(/\b(\w)/g)?.join('') || 'ИИ')}
          </div>
          <div>
            <h3>{userData.name}</h3>
            <p>{userData.email}</p>
          </div>
        </div>
      </div>

      <div className={styles.tabs}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'rentals' ? styles.active : ''}`}
          onClick={() => setActiveTab('rentals')}
        >
          Мои аренды
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'books' ? styles.active : ''}`}
          onClick={() => setActiveTab('books')}
        >
          Мои книги
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'settings' ? styles.active : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Настройки
        </button>
      </div>

      {renderTabContent()}
    </div>
  );
};

export default Profile;