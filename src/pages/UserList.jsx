import { useEffect, useState } from 'react'
import UserCard from '../components/UserCard'
import Navbar from '../components/navbar'
import './styles/BookList.css'
import { Link } from 'react-router-dom'
import { getUsers, deleteUser } from '../services/user.service'

const UserList = () => {
  const [users, setUsers] = useState([])

  // --- useEffect CUANDO SE HAGA ALGO AUTOMATICAMENTE ---
  useEffect(() => {
    getUsers()          // PROMESA
      .then((response) => {
        console.log('Users fetched:', response.data)
        setUsers(response.data)
      })
      .catch((error) => {
        console.error('Error fetching users:', error)
      })
  }, [])

  const handleDelete = (id) => {
    console.log('Entro en handleDelete?', id)
    deleteUser(id)      // PROMESA
      .then(() => {
        setUsers(users.filter((user) => user.id !== id))
      })
      .catch((error) => {
        console.error('Error deleting user:', error)
      })
  }

  return (
    <div>
      <Navbar />
      <header>
        <h2>Lista de usuarios. (GET)</h2>
        <Link to={`/register`} className="btn-add">
            Registrarse.
        </Link>
        <Link to={`/login`} className="btn-login">
            Iniciar Sesión.
        </Link>
      </header>

      <div className="books-grid">
        {users.map((user) => (
          <UserCard
            onDelete={() => {
              handleDelete(user.id)
            }}
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
          />
        ))}
      </div>
    </div>
  )
}

export default UserList
