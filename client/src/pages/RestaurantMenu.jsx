import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const RestaurantMenu = () => {
  const { id } = useParams(); // Gets the ID from the URL
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`/api/restaurants/${id}`);
        setRestaurant(response.data.restaurant);
        setMenu(response.data.foodItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu", error);
        setLoading(false);
      }
    };
    fetchMenu();
  }, [id]);

  if (loading) return <div className="text-center py-20 font-bold text-gray-500">Loading menu...</div>;
  if (!restaurant) return <div className="text-center py-20 font-bold text-red-500">Restaurant not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Restaurant Header */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-10 flex items-center justify-between">
        <div>
          <Link to="/" className="text-brand font-bold text-sm mb-4 inline-block hover:underline">← Back to Restaurants</Link>
          <h1 className="text-4xl font-black text-gray-900 mb-2">{restaurant.name}</h1>
          <p className="text-gray-500 font-medium flex items-center gap-2">
            📍 {restaurant.address} <span className="text-gray-300">|</span> ⏱️ {restaurant.deliveryTime || "30-40"} min
          </p>
        </div>
        <div className="hidden md:block text-right">
          <div className="bg-green-50 text-green-700 px-4 py-2 rounded-xl font-black text-lg border border-green-100">
            ⭐ {restaurant.rating || "4.5"}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <h2 className="text-2xl font-black text-gray-900 mb-6">Full Menu</h2>
      
      {menu.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl text-center border border-gray-100">
          <p className="text-gray-500 font-bold text-lg">No food items added to this menu yet.</p>
          <p className="text-gray-400 text-sm mt-2">Go to the Admin Panel to add some delicious options!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menu.map((item) => (
            <div key={item._id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                <span className="text-lg font-black text-brand">Rs.{item.price.toFixed(2)}</span>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 block">
                {item.category || "Main Course"}
              </span>
              <p className="text-gray-500 text-sm mb-6 flex-grow">{item.description}</p>
              
              <button className="w-full bg-gray-50 hover:bg-brand hover:text-white text-gray-900 font-bold py-3 rounded-xl transition-colors border border-gray-200 hover:border-brand">
                + Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;