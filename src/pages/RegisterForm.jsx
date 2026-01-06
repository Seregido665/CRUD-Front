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
    password: ''
  })
  const { id } = useParams();

    useEffect(() => {
    if (id) {
      getUserById(id)
        .then(res => {
          setRegisterData({
            name: res.data.name,
            email: res.data.email,
            password: res.data.password
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
    e.preventDefault()
    console.log("HoeeeeeeeeeeeeeelaBUENAS")
    if (!registerData.name || !registerData.email || !registerData.password) {
      const newErrors = {};
      if (!registerData.name) newErrors.name = { message: "Falta el nombre." };
      if (!registerData.email) newErrors.email = { message: "Falta el email." };
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(registerData.email)) { newErrors.email = { message: "Formato incorrect." }; }
      if (registerData.password.length < 8) newErrors.password = { message: "Debe tener al menos 8 caracteres" };
      
      setErrors(newErrors);
      return;
    }

    registerUser(registerData)
      .then(() => {
        console.log("HolaBUENAS")
        setErrors({});
        navigate('/userList')
      })
      .catch(err => {
        setErrors(err.response.data.errors);
      });
  };
    

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
              type="email"      // HACE REFERENCIA AL User.model.js DEL back
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

          <button 
            type="submit" 
          >
            REGISTRARSE
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm