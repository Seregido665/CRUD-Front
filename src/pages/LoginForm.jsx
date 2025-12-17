import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from "../services/user.service";
//import { postBook } from '../services/books.service'
import Navbar from '../components/navbar'
import './styles/BookForm.css'

const LoginForm = ({ initialData = {} }) => {
  const navigate = useNavigate()
  const [loginData, setFormData] = useState({
    email: initialData.email || '',
    password: initialData.password || ''
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
    if (!loginData.name || !loginData.email || !loginData.password) {
      return
    }

    loginUser(loginData)
          .then(() => {
            navigate('/userList')
          })
          .catch(err => {
            console.error('Error login user:', err)
          });
      };
    

  return (
    <div>
      <Navbar />
      <div className="book-form-card">
        <h2 className="form-title">
          Iniciar Sesion.
        </h2>

        <form onSubmit={handleSubmit} className="book-form">
          <div className="form-group">
            <input
              type="text"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Correo"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>

          <button 
            type="submit" 
            className={`submit-button`}
          >
            INICIAR SESIÓN
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm