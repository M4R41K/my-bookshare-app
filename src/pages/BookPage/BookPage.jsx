import { useParams } from 'react-router-dom';
import styles from './BookPage.module.css';

function BookPage() {
  const { id } = useParams();
  return (
    <div className={styles.bookPage}>
      <h1>Страница книги {id}</h1>
      {/* Детали книги */}
    </div>
  );
}

export default BookPage;