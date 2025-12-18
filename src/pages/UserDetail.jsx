import { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import './styles/BookDetail.css'
import { getUserById } from '../services/user.service'
import { useParams } from 'react-router-dom';

const UserDetail = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  // --- useEffect CUANDO SE HAGA ALGO AUTOMATICAMENTE ---
  useEffect(() => {
    getUserById(id)       // PROMESA
      .then((response) => {
        setUser(response.data)
      })
      .catch((error) => {
        console.error('Error fetching user detail:', error)
      })
  }, [id])

  if (!user) { return <p>Loading</p> }

  return (
    <div>
      <Navbar />
      <div className="user-detail-content">
        <h2>{user.name}</h2>
        <h3>{user.email}</h3>
      </div>
    </div>
  )
}

export default UserDetail
