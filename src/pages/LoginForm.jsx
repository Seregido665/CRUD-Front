import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from "../services/user.service";
import Navbar from '../components/navbar'
import './styles/BookForm.css'

const LoginForm = () => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({});
  const [loginData, setFormData] = useState({
    email: '',
    password: ''
  })


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLogin = (e) => {
    e.preventDefault()

    if (!loginData.email || !loginData.password) {
      setErrors({ general: { message: "Rellena todos los campos" } });
      return;
    }


    loginUser(loginData)
          .then(() => {
            setErrors({});
            console.log("LOGUEADO")
            navigate('/userList')
          })
          .catch(err => {
            console.log('ERROR EN EL LOGIN:', err)
          });
      };
    

  return (
    <div>
      <Navbar />
      <div className="book-form-card">
        <h2 className="form-title">
          Iniciar Sesion.
        </h2>

        <form onSubmit={handleLogin} className="book-form">
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
            {errors.general && (<div className="text-danger text-center mt-3">{errors.general.message}</div>)}
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