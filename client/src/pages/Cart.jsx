// client/src/pages/Cart.jsx
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Cart = () => {
  const { cart, removeFromCart, cartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePlaceOrder = async () => {
    if (!address) return setError('Please enter a delivery address');
    try {
      setLoading(true); 
      setError('');
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const orderItems = cart.map(item => ({ name: item.name, qty: item.qty, price: item.price, foodItem: item._id }));
      
      await axios.post('/api/orders', { orderItems, deliveryAddress: address, totalPrice: cartTotal }, config);
      
      clearCart(); 
      setLoading(false); 
      navigate('/orders');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order'); 
      setLoading(false);
    }
  };

  // If the cart is empty, show this beautiful empty state
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-6">🛒</div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 font-medium">Looks like you haven't added any food yet.</p>
        <Link to="/restaurants" className="bg-red-600 text-white px-8 py-3.5 rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30">
          Browse Restaurants
        </Link>
      </div>
    );
  }

  // If the cart has items, show the checkout UI
  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <h2 className="text-3xl font-black text-gray-900 mb-8 border-b border-gray-200 pb-4">Checkout</h2>
      
      {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-semibold border border-red-100">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Side: Order Items & Address */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6 border-b border-gray-50 pb-4">Order Items</h3>
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between items-center py-5 border-b last:border-0 border-gray-50">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                  <p className="text-gray-500 font-medium">${item.price.toFixed(2)} x {item.qty}</p>
                </div>
                <div className="flex items-center space-x-6">
                  <span className="font-black text-xl text-gray-900">${(item.price * item.qty).toFixed(2)}</span>
                  <button onClick={() => removeFromCart(item._id)} className="bg-red-50 text-red-500 w-10 h-10 rounded-full font-black hover:bg-red-100 transition-colors flex items-center justify-center">
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-4">Delivery Address</h3>
            <textarea 
              className="w-full bg-gray-50 border border-gray-200 p-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all font-medium text-gray-700"
              rows="3"
              placeholder="e.g., Room 250, The Radisson Hotel, Gachibowli"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Right Side: Order Summary (Sticky) */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 sticky top-28">
            <h3 className="text-xl font-bold mb-6">Order Summary</h3>
            
            <div className="flex justify-between mb-4 text-gray-500 font-medium">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between mb-6 text-gray-500 font-medium border-b border-gray-100 pb-6">
              <span>Delivery Fee</span>
              <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">FREE</span>
            </div>
            
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-bold text-gray-900">Total</span>
              <span className="text-3xl font-black text-red-600">${cartTotal.toFixed(2)}</span>
            </div>

            {user ? (
              <button 
                onClick={handlePlaceOrder} disabled={loading}
                className="w-full bg-gray-900 text-white px-6 py-4 rounded-xl text-lg font-bold hover:bg-gray-800 disabled:opacity-50 transition-all shadow-lg shadow-gray-900/20"
              >
                {loading ? 'Processing...' : 'Confirm Order'}
              </button>
            ) : (
              <Link to="/login" className="block text-center w-full bg-red-600 text-white px-6 py-4 rounded-xl text-lg font-bold hover:bg-red-700 transition-colors">
                Login to Checkout
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;