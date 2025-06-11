import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
import BookPage from './pages/BookPage/BookPage';
import Profile from './pages/Profile/Profile';
import AddBook from './pages/AddBook/AddBook';
import { RentProvider } from './RentContext';
import './App.css';

function App() {
  return (
    <RentProvider>
      <BrowserRouter>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/book/:id" element={<BookPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/add-book" element={<AddBook />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </RentProvider>
  );
}

export default App;