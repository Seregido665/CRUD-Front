import { Link } from 'react-router-dom';
import '../pages/styles/BookCard.css';

const UserCard = ({ name, email, /*password,*/ id }) => {
  return (
    <div className="book-card">
      <div className="book-card-content">
        <div className="mb-4">
          <h3 className="book-card-title">{name}</h3>
          <p className="book-card-author-year">
            {email}
          </p>
        </div>

        <div className="book-card-actions">
          <Link to={`/books/${id}`} className="btn-view">
            VER (GET /id)
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserCard;