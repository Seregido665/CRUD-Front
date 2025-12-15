import { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import './styles/BookDetail.css'
import { getBookById } from '../services/books.service'
import { useParams } from 'react-router-dom';

const BookDetail = () => {
  const [book, setBook] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getBookById(id)       // PROMESA
      .then((response) => {
        const apiBook = response.data;
        setBook(apiBook)
      })
      .catch((error) => {
        console.error('Error fetching book detail:', error)
      })
  }, [id])

  if (!book) { return <p>Loading</p> }

  return (
    <div>
      <Navbar />
      <div className="book-detail-content">
        <h2>{book.title}</h2>
        <h3>{book.author} - {book.year}</h3>
      </div>
    </div>
  )
}

export default BookDetail
