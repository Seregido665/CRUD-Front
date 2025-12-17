
import { useEffect, useState } from 'react'
import BookCard from '../components/BookCard'
import Navbar from '../components/navbar'
import './styles/BookList.css'
import { Link } from 'react-router-dom'
import { deleteBook, getBooks } from '../services/books.service'

const BookList = () => {
  const [books, setBooks] = useState([])

  // --- useEffect CUANDO SE HAGA ALGO AUTOMATICAMENTE ---
  useEffect(() => {
    getBooks()          // PROMESA
      .then((response) => {
        console.log('Books fetched:', response.data)
        setBooks(response.data)
      })
      .catch((error) => {
        console.error('Error fetching books:', error)
      })
  }, [])

  // --- ES UN handleDelete Y NO UN useEffect PORQUE EL USUARIO ACTIVA LA ACCION ---
  const handleDelete = (id) => {
    console.log('Entro en handleDelete?', id)
    deleteBook(id)      // PROMESA
      .then(() => {
        console.log('Book deleted?:', id)
        setBooks(books.filter((book) => book.id !== id))
      })
      .catch((error) => {
        console.error('Error deleting book:', error)
      })
  }

  console.log(books)

  return (
    <div>
      <Navbar />
      <header>
        <h2>Lista de libros. (GET)</h2>
        <Link to={`/bookForm`} className="btn-add">
            Añadir libro
        </Link>
      </header>

      <div className="books-grid">
        {books.map((book) => (
          <BookCard
            onDelete={() => {
              handleDelete(book.id)
            }}
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            year={book.year}
            user={book.user}
          />
        ))}
      </div>
    </div>
  )
}

export default BookList
