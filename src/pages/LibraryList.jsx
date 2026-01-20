import { useEffect, useState } from 'react'
import LibraryCard from '../components/LibraryCard'
import Navbar from '../components/navbar'
import './styles/BookList.css'
import { getLibraries, postLibrary, deleteLibrary } from '../services/library.service'

const LibraryList = () => {
  const [libraries, setLibraries] = useState([])
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: ''
  })

    // --- useEffect CUANDO SE HAGA ALGO AUTOMATICAMENTE ---
    useEffect(() => {
        getLibraries()          // PROMESA
        .then((response) => {
            console.log('Libraries fetched:', response.data)
            setLibraries(response.data)
        })
        .catch((error) => {
            console.error('Error fetching liraries:', error)
        })
    }, [])

    const handleDelete = (id) => {
        console.log('Entro en handleDelete?', id)
        deleteLibrary(id)      // PROMESA
          .then(() => {
            console.log('Book deleted?:', id)
            setLibraries(libraries.filter((library) => library.id !== id))
          })
          .catch((error) => {
            console.error('Error deleting book:', error)
          })
      }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
        ...prev,
        [name]: value
        }))
    }


    const handleSubmit = (e) => {                           
        e.preventDefault();

        if (!formData.name) {
            setErrors({ name: { message: "Rellena el campo." } });
            return;
        }
        postLibrary(formData)
        .then((response) => {
            setLibraries(prev => [...prev, response.data]);
            setFormData({ name: '' });
            setErrors({});
        })
        .catch((err) => {
            console.error('Error al guardar la librería:', err);
        });
    };

  return (
    <div>
      <Navbar />
      <header>
        <h2>Lista de librerias. (GET)</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mt-5">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Título"
            />
            {errors.name && (<div className="text-danger mt-2">{errors.name.message}</div>)}
          </div>

          <button type="submit" className="submit-button mt-2">
            Añadir libreria
          </button>
        </form>
      </header>

      <div className="books-grid">
        {libraries.map((library) => (
          <LibraryCard
            onDelete={() => {
              handleDelete(library.id)
            }}
            key={library.id}
            id={library.id}
            name={library.name}
            size={library.size}
          />
        ))}
      </div>
    </div>
  )
}

export default LibraryList
