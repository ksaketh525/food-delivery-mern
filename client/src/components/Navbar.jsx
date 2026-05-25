import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Calculate total items in cart
  const cartItemCount = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Left: Logo & Links */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-3xl">🍔</span>
              <span className="text-2xl font-black tracking-tight text-gray-900">hungry<span className="text-brand">Bites</span></span>
            </Link>
            
            <div className="hidden md:flex items-center gap-6 text-gray-600 font-semibold">
              <Link to="/restaurants" className="hover:text-brand transition-colors">Restaurants</Link>
              {user && <Link to="/orders" className="hover:text-brand transition-colors">My Orders</Link>}
            </div>
          </div>

          {/* Right: Cart & Auth */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link to="/cart" className="flex items-center gap-2 text-gray-700 hover:text-brand font-semibold transition-colors">
              <span className="text-xl">🛒</span>
              <span className="hidden sm:block">Cart</span>
              {cartItemCount > 0 && (
                <span className="bg-brand text-white text-xs font-bold px-2 py-0.5 rounded-full">{cartItemCount}</span>
              )}
            </Link>

            <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

            {user ? (
              <div className="flex items-center gap-4">
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-sm font-bold bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-lg hover:bg-yellow-200">
                    Admin
                  </Link>
                )}
                <span className="hidden md:block text-sm font-bold text-gray-700">Hi, {user.name.split(' ')[0]}</span>
                <button onClick={handleLogout} className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-bold text-gray-600 hover:text-brand transition-colors">Log in</Link>
                <Link to="/register" className="text-sm font-bold bg-brand text-white px-5 py-2.5 rounded-xl hover:bg-brandDark transition-colors shadow-sm">
                  Sign up
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;