import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BookList from './pages/BookList'
import BookDetail from './pages/BookDetail'
import BookForm from './pages/BookForm'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookList" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/bookForm" element={<BookForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
