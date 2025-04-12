import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import Header from './components/Header';
import './App.css';

function App() {
  const [cartCount, setCartCount] = useState(0);

  const handleCartUpdate = (count) => {
    setCartCount(count); // Update the cart count in the state
  };

  return (
    <Router>
      <Header cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/products" element={<ProductListingPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage onCartUpdate={handleCartUpdate} />} />
      </Routes>
    </Router>
  );
}

export default App;
