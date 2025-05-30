import { useState, useEffect } from 'react';
import './CartPage.css';

function CartPage({ onCartUpdate }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
    updateCartCount(storedCart); 
  }, []);

  const updateCartCount = (cart) => {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    if (onCartUpdate) {
      onCartUpdate(count); 
    }
  };

  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartCount(updatedCart); 
  };

  const handlePlaceOrder = () => {
    setCart([]);
    localStorage.removeItem('cart');
    alert('Your order has been placed successfully!');
    updateCartCount([]); // Reset the cart count
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h1 className="cart-header">Your Silicone Cart</h1>
      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>${item.price}</p>
              </div>
              <button className="cart-item-remove" onClick={() => handleRemoveItem(index)}>
                Remove
              </button>
            </div>
          ))}
          <h2 className="cart-total">Total: ${totalPrice.toFixed(2)}</h2>
          <button className="cart-checkout-button" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
