// client/src/pages/Menu.jsx
import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const Menu = () => {
  const { id } = useParams();
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        // 1. Change the URL to match our backend route
        const response = await axios.get(`/api/restaurants/${id}`);
        
        // 2. Extract the foodItems array from the response object
        setFoodItems(response.data.foodItems);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu:", error);
        setLoading(false);
      }
    };
    fetchMenu();
  }, [id]);

  if (loading) return <div className="min-h-[60vh] flex justify-center items-center text-xl font-bold text-gray-500">Loading delicious menu...</div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Restaurant Header Area */}
      <div className="bg-gray-900 text-white py-16 px-6 mb-12 shadow-inner">
        <div className="container mx-auto max-w-6xl">
          <Link to="/restaurants" className="text-gray-400 hover:text-white flex items-center gap-2 mb-6 transition-colors w-fit font-semibold">
            ← Back to Restaurants
          </Link>
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Restaurant Menu</h2>
          <p className="text-gray-400 text-lg font-medium">Browse our selection and add your favorites to the cart.</p>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="container mx-auto px-6 max-w-6xl">
        {foodItems.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl shadow-sm text-center border border-gray-100">
            <p className="text-xl text-gray-500 font-medium">No items available for this restaurant yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foodItems.map((item) => (
              <div key={item._id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                    <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">{item.category}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">{item.description}</p>
                </div>
                
                <div className="flex justify-between items-center mt-4 border-t border-gray-50 pt-4">
                  <span className="font-black text-2xl text-gray-900">Rs. {item.price.toFixed(2)}</span>
                  <button 
                    className="bg-red-50 text-red-600 px-5 py-2.5 rounded-full font-bold hover:bg-red-600 hover:text-white transition-colors duration-300 shadow-sm"
                    onClick={() => {
                      addToCart(item);
                      // Simple visual feedback (you can swap this for a toast notification later!)
                      alert(`Added ${item.name} to cart!`); 
                    }}
                  >
                    Add +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;