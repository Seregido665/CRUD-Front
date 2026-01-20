import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { registerUser, getUserById } from "../services/user.service";
import Navbar from '../components/navbar'
import './styles/BookForm.css'

const RegisterForm = () => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({});
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '' // Añadido para confirmar contraseña
  })
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getUserById(id)
        .then(res => {
          setRegisterData({
            name: res.data.name,
            email: res.data.email,
            password: res.data.password,
            passwordConfirm: ''
          });
        })
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRegistration = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!registerData.name) {newErrors.name = { message: "Falta el nombre." };}
    if (!registerData.email) {newErrors.email = { message: "Falta el email." };}
    if (!registerData.password) {newErrors.password = { message: "Falta la contraseña." };}
    if (!registerData.passwordConfirm) {newErrors.passwordConfirm = { message: "Confirma la contraseña." };}

    if (registerData.password !== registerData.passwordConfirm) {
      newErrors.passwordConfirm = {
        message: "Las contraseñas no coinciden."
      };
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Si no hay errores, proceder con el registro
    registerUser(registerData)
      .then(res => {
        console.log('Usuario registrado:', res.data);
        navigate('/login'); // O la ruta que necesites
      })
      .catch(err => {
        console.error('Error al registrar:', err);
        setErrors({ general: { message: "Error al registrar usuario" } });
      });
  }

  return (
    <div>
      <Navbar />
      <div className="book-form-card">
        <h2 className="form-title">
          Registrarse.
        </h2>

        <form onSubmit={handleRegistration} className="book-form">
          <div className="form-group">
            <input
              name="name"
              value={registerData.name}
              onChange={handleChange}
              placeholder="Nombre"
            />
            {errors.name && (<div className="text-danger mt-2">{errors.name.message}</div>)}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleChange}
              placeholder="Correo"
            />
            {errors.email && (<div className="text-danger mt-2">{errors.email.message}</div>)}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            {errors.password && (<div className="text-danger mt-2">{errors.password.message}</div>)}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="passwordConfirm"
              value={registerData.passwordConfirm}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
            {errors.passwordConfirm && (<div className="text-danger mt-2">{errors.passwordConfirm.message}</div>)}
          </div>

          {errors.general && (<div className="text-danger mt-2">{errors.general.message}</div>)}

          <button type="submit">
            REGISTRARSE
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm