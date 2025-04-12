import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ cartCount }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-logo">Silicone</div>
      <nav className="nav">
        <div className="nav-links">
          <Link to="/products" className="nav-link">Home</Link>
          <Link to="/cart" className="nav-link">Cart ({cartCount})</Link>
        </div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
}

export default Header;