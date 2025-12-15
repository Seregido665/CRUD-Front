import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postBook } from '../services/books.service'
import Navbar from '../components/navbar'
import './styles/BookForm.css'

const BookForm = ({ initialData = {} }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    author: initialData.author || '',
    year: initialData.year || '',
    user: initialData.user || ''
  })


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    /*if (!formData.title || !formData.author || !formData.year || !formData.user) {
      return
    }*/

    try {
      postBook(formData)
      navigate('/bookList')
    } catch (err) {
      console.error(err)
    }
  }
    

  return (
    <div>
      <Navbar />
      <div className="book-form-card">
        <h2 className="form-title">
          Nuevo Libro (POST)
        </h2>

        <form onSubmit={handleSubmit} className="book-form">
          <div className="form-group">
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Título"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Autor"
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Año"
              min="1440"
              max="2025"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              id="user"
              name="user"
              value={formData.user}
              onChange={handleChange}
              placeholder="Añadido por:"
            />
          </div>

          <button 
            type="submit" 
            className={`submit-button`}
          >
            AÑADIR
          </button>
        </form>
      </div>
    </div>
  )
}

export default BookForm