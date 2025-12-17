import { Link } from 'react-router-dom'
import './styles/Home.css'

const Home = () => {
  return (
    <div>
      <div>
        <header>
          <h1 className="mb-4">
            Fullstack: Operaciones CRUD App
          </h1>
            <h3>MongoDB + Express + Postman + React + Node.js</h3>
            <p>Aplicación para practicar el flujo de trabajo completo: backend + frontend.</p>
        </header>

        <div className="buttons-container">
          <Link to="/bookList">
            <button className="action-button books-btn">
              <span>Libros</span>
            </button>
          </Link>

          <Link to="/userList">
            <button className="action-button users-btn">
              <span>Usuarios</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home