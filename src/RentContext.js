import { createContext, useState, useContext } from 'react';

const RentContext = createContext();

export const RentProvider = ({ children }) => {
  const [rentals, setRentals] = useState([]);
  const [books, setBooks] = useState([
    { id: 1, title: "Мастер и Маргарита", author: "Михаил Булгаков", price: 100, available: true },
    { id: 2, title: "Преступление и наказание", author: "Фёдор Достоевский", price: 90, available: true },
    { id: 3, title: "1984", author: "Джордж Оруэлл", price: 120, available: true },
    { id: 4, title: "Гарри Поттер и философский камень", author: "Джоан Роулинг", price: 150, available: true },
    { id: 5, title: "Война и мир", author: "Лев Толстой", price: 240, available: true },
    { id: 6, title: "Горе от ума", author: "Александр Грибоедов", price: 150, available: true },
    { id: 7, title: "Евгений Онегин", author: "Александр Пушкин", price: 50, available: true },
    { id: 8, title: "Герой нашего времени", author: "Михаил Лермонтов", price: 120, available: true }
  ]);
  const [myBooks, setMyBooks] = useState([]);

  const addNewBook = (bookData, image) => {
    const newBook = {
      id: Date.now(), // Временный ID (в реальном приложении будет с сервера)
      ...bookData,
      available: true,
      image: image ? URL.createObjectURL(image) : null
    };
    setBooks([...books, newBook]);
    setMyBooks([...myBooks, { ...newBook, status: "Доступна" }]);
    
    return newBook;
  };

  const addRental = (bookId, period) => {
    const bookToRent = books.find(book => book.id === bookId);
    if (!bookToRent || !bookToRent.available) return;

    let price;
    switch (period) {
      case 14: price = bookToRent.price * 1.8; break;
      case 30: price = bookToRent.price * 3; break;
      default: price = bookToRent.price;
    }

    setRentals([...rentals, {
      ...bookToRent,
      period: `${period} дней`,
      price,
      status: "Активна",
      rentDate: new Date().toISOString()
    }]);

    setBooks(books.map(book => 
      book.id === bookId ? {...book, available: false} : book
    ));
  };

  const cancelRental = (bookId) => {
    setRentals(rentals.filter(rental => rental.id !== bookId));
    setBooks(books.map(book => 
      book.id === bookId ? {...book, available: true} : book
    ));
  };

  return (
    <RentContext.Provider 
      value={{ 
        books, 
        rentals, 
        myBooks,
        addNewBook,
        addRental,
        cancelRental,
        removeBook: (bookId) => {
          setBooks(books.filter(b => b.id !== bookId));
          setMyBooks(myBooks.filter(b => b.id !== bookId));
        }
      }}
    >
      {children}
    </RentContext.Provider>
  );
};

export const useRent = () => useContext(RentContext);