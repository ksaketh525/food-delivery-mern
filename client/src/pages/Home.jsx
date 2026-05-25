// client/src/pages/Home.jsx
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative bg-gray-900 h-[600px] flex items-center justify-center">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop" 
            alt="Delicious food spread" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Craving something <span className="text-red-500">delicious?</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 font-medium">
            Get the best meals from your favorite  spots delivered blazing fast to your dorm or class.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/restaurants" 
              className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-red-700 hover:scale-105 transition-all duration-300 shadow-lg shadow-red-600/30"
            >
              Order Now
            </Link>
            <Link 
              to="/login" 
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition-all duration-300"
            >
              Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section (Optional but looks great) */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
            <p className="text-gray-500">Food delivered fresh and hot right to your exact location.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">🍔</div>
            <h3 className="text-xl font-bold mb-2">Best Quality</h3>
            <p className="text-gray-500">We partner only with the highest-rated restaurants.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-bold mb-2">Easy Checkout</h3>
            <p className="text-gray-500">Seamless ordering process designed for students on the go.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;