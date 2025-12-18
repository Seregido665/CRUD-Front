import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { postBook, getBookById, editBook } from '../services/books.service'
import Navbar from '../components/navbar'
import './styles/BookForm.css'

const BookForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: '',
    user: ''
  })
  const { id } = useParams();

  useEffect(() => {
  if (id) {
    getBookById(id)
      .then(res => {
        setFormData({
          title: res.data.title,
          author: res.data.author,
          year: res.data.year,
          user: res.data.user
        });
      })
      .catch(err => console.error(err));
  }
}, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.author || !formData.year || !formData.user) {
      return;
    }

    try {
      if (id) {
        // Editar libro
        await editBook(id, formData);
      } else {
        // Crear libro
        await postBook(formData);
      }

      navigate('/bookList');
    } catch (err) {
      console.error('Error al guardar el libro:', err);
    }
  };



    

  return (
    <div>
      <Navbar />
      <div className="book-form-card">
        <h2 className="form-title">
          {id ? 'Editar Libro' : 'Nuevo Libro'}
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

          <button type="submit" className="submit-button">
            {id ? 'Actualizar' : 'Añadir'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default BookForm