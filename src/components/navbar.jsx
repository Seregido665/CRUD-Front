import { Link } from 'react-router-dom';
import '../pages/styles/navbar.css'


const Navbar = () => {
  return (
    <div>
        <nav className="navbar">
            <Link to={`/`} className="nav-link home">
                HOME
            </Link>
            <Link to={`/bookList`} className="nav-link">
                Libros
            </Link>
            <Link to={`/libraryList`} className="nav-link">
                Librerias
            </Link>
            <Link to={`/userList`} className="nav-link">
                Usuarios
            </Link>
        </nav>

    </div>
  );
};

export default Navbar;