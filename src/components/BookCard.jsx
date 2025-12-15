import { Link } from 'react-router-dom';
import '../pages/styles/BookCard.css';

const BookCard = ({ title, year, user, author, onDelete, id }) => {
  return (
    <div className="book-card">
      <div className="book-card-content">
        <div className="mb-4">
          <h3 className="book-card-title">{title}</h3>
          <p className="book-card-author-year">
            {author} - {year}
          </p>
          <p className="book-card-user">
            Añadido por: { user || 'Anónimo'}
          </p>
        </div>

        <div className="book-card-actions">
          <Link to={`/books/${id}`} className="btn-view">
            VER (GET /id)
          </Link>
          <button onClick={() => onDelete(id)} className="btn-delete mt-3">
            ELIMINAR (DELETE)
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;