// client/src/pages/AdminDashboard.jsx
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [restaurants, setRestaurants] = useState([]); // Store restaurants for the dropdown
  
  // Restaurant State
  const [resName, setResName] = useState('');
  const [resAddress, setResAddress] = useState('');
  const [resImageUrl, setResImageUrl] = useState('');

  // Food Item State
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [foodName, setFoodName] = useState('');
  const [foodDesc, setFoodDesc] = useState('');
  const [foodPrice, setFoodPrice] = useState('');
  const [foodCategory, setFoodCategory] = useState('');

  // Kick out non-admins
  useEffect(() => { if (!user || user.role !== 'admin') navigate('/'); }, [user, navigate]);

  // Fetch Orders AND Restaurants when page loads
  useEffect(() => { 
    if (user?.role === 'admin') {
      fetchOrders();
      fetchRestaurants();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const response = await axios.get('/api/admin/orders', config);
      setOrders(response.data);
    } catch (error) { console.error("Error fetching orders"); }
  };

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('/api/restaurants');
      setRestaurants(response.data);
      // Auto-select the first restaurant in the dropdown if available
      if(response.data.length > 0) setSelectedRestaurant(response.data[0]._id);
    } catch (error) { console.error("Error fetching restaurants"); }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`/api/admin/orders/${orderId}/status`, { status: newStatus }, config);
      fetchOrders();
    } catch (error) { alert('Failed to update status'); }
  };

  // Submit Restaurant
  const handleAddRestaurant = async (e) => {
  e.preventDefault();
  try {
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    
    // Include imageUrl in the object sent to the server
    await axios.post('/api/admin/restaurants', { 
      name: resName, 
      address: resAddress,
      imageUrl: resImageUrl // ← ADD THIS LINE
    }, config);

    setResName(''); 
    setResAddress(''); 
    setResImageUrl(''); // ← ADD THIS LINE
    alert('Restaurant added!');
    fetchRestaurants(); 
  } catch (error) { alert('Failed to add restaurant'); }
};

  // Submit Food Item
  const handleAddFood = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post('/api/admin/food', {
        restaurant: selectedRestaurant,
        name: foodName,
        description: foodDesc,
        price: foodPrice,
        category: foodCategory
      }, config);
      
      // Clear form
      setFoodName(''); setFoodDesc(''); setFoodPrice(''); setFoodCategory('');
      alert('Food item added successfully!');
    } catch (error) { alert('Failed to add food item'); }
  };

  return (
    <div className="container mx-auto px-6 py-10 max-w-7xl">
      <h2 className="text-3xl font-black text-gray-900 mb-8 border-b pb-4">Admin Control Panel</h2>

      {/* Top Row: Add Restaurant & Add Food */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        
            {/* Add Restaurant Form */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold mb-4">Add New Restaurant</h3>
              <form onSubmit={handleAddRestaurant} className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-1">Name</label>
                  <input type="text" className="w-full bg-gray-50 border p-2.5 rounded-xl" value={resName} onChange={(e) => setResName(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-1">Address</label>
                  <input type="text" className="w-full bg-gray-50 border p-2.5 rounded-xl" value={resAddress} onChange={(e) => setResAddress(e.target.value)} required />
                </div>
                {/* ↓ ADD THIS NEW IMAGE URL FIELD ↓ */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-1">Image URL</label>
                  <input type="text" className="w-full bg-gray-50 border p-2.5 rounded-xl" placeholder="https://example.com/image.jpg" value={resImageUrl} onChange={(e) => setResImageUrl(e.target.value)} required />
                </div>
                {/* ↑ ADD THIS NEW IMAGE URL FIELD ↑ */}
                <button type="submit" className="w-full bg-gray-900 text-white p-3 rounded-xl font-bold hover:bg-gray-800">Create Restaurant</button>
              </form>
            </div>
            

        {/* Add Food Form */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-4">Add Food to Menu</h3>
          <form onSubmit={handleAddFood} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">Select Restaurant</label>
              <select className="w-full bg-gray-50 border p-2.5 rounded-xl" value={selectedRestaurant} onChange={(e) => setSelectedRestaurant(e.target.value)} required>
                {restaurants.map(res => (
                  <option key={res._id} value={res._id}>{res.name}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1">Item Name</label>
                <input type="text" className="w-full bg-gray-50 border p-2.5 rounded-xl" value={foodName} onChange={(e) => setFoodName(e.target.value)} required />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1">Price (INR)</label>
                <input type="number" step="0.01" className="w-full bg-gray-50 border p-2.5 rounded-xl" value={foodPrice} onChange={(e) => setFoodPrice(e.target.value)} required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1">Category</label>
                <input type="text" className="w-full bg-gray-50 border p-2.5 rounded-xl" placeholder="e.g. Mains, Sides" value={foodCategory} onChange={(e) => setFoodCategory(e.target.value)} required />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1">Description</label>
                <input type="text" className="w-full bg-gray-50 border p-2.5 rounded-xl" value={foodDesc} onChange={(e) => setFoodDesc(e.target.value)} required />
              </div>
            </div>
            <button type="submit" className="w-full bg-red-600 text-white p-3 rounded-xl font-bold hover:bg-red-700">Add to Menu</button>
          </form>
        </div>
      </div>

      {/* Bottom Row: Orders Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold">Live Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Order ID</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Customer</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Total</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm font-medium text-gray-900">#{order._id.substring(18)}</td>
                  <td className="p-4">
                    <div className="text-sm font-bold text-gray-900">{order.user?.name || 'Unknown'}</div>
                    <div className="text-xs text-gray-500">{order.deliveryAddress}</div>
                  </td>
                  <td className="p-4 text-sm font-bold text-green-600">INR{order.totalPrice.toFixed(2)}</td>
                  <td className="p-4">
                    <select 
                      className="text-sm font-bold px-3 py-1.5 rounded-full outline-none cursor-pointer border bg-white"
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;