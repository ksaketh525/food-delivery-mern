import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('/api/restaurants');
        setRestaurants(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load restaurants. Please try again later.');
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-brand rounded-full animate-spin mb-4"></div>
      <p className="text-gray-500 font-bold text-lg">Finding the best spots...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-[60vh] flex justify-center items-center">
      <div className="bg-red-50 text-brand p-6 rounded-2xl font-bold text-center border border-red-100 max-w-md">
        <span className="text-3xl block mb-2">😕</span>
        {error}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-2">Explore</h2>
        <p className="text-gray-500 text-lg font-medium">Top-rated spots delivering right to your door.</p>
      </div>

      {restaurants.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl text-center shadow-sm border border-gray-100">
          <span className="text-4xl block mb-4">🏪</span>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No restaurants found</h3>
          <p className="text-gray-500">Check back later for new additions!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((restaurant) => (
            <Link 
              to={`/restaurant/${restaurant._id}`} 
              key={restaurant._id} 
              className="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <img 
                  src={restaurant.imageUrl || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=60"} 
                  alt={restaurant.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-black text-gray-800 shadow-sm flex items-center gap-1">
                  ⭐ {restaurant.rating || "4.5"}
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-black text-gray-900 mb-1">{restaurant.name}</h3>
                <p className="text-gray-500 text-sm font-medium mb-6 flex items-center gap-1.5 line-clamp-1">
                  📍 {restaurant.address}
                </p>
                
                <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-400">30-40 min</span>
                  <span className="text-brand font-bold group-hover:text-brandDark transition-colors flex items-center gap-1">
                    View Menu <span className="text-lg">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Restaurants;