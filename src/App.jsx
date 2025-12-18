import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BookList from './pages/BookList'
import BookDetail from './pages/BookDetail'
import UserDetail from './pages/UserDetail'
import BookForm from './pages/BookForm'
import UserList from './pages/UserList'
import RegisterForm from './pages/RegisterForm'
import LoginForm from './pages/LoginForm'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookList" element={<BookList />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/bookForm" element={<BookForm />} />
          <Route path="/userList" element={<UserList />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
