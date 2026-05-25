// client/src/pages/Orders.jsx
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const response = await axios.get('/api/orders/myorders', config);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch orders");
        setLoading(false);
      }
    };
    if (user) fetchOrders();
  }, [user]);

  if (loading) return <div className="text-center mt-20 text-xl font-bold text-gray-500">Loading your orders...</div>;

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <h2 className="text-3xl font-black text-gray-900 mb-8 border-b border-gray-200 pb-4">Order History</h2>
      
      {orders.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center">
          <div className="text-5xl mb-4">🧾</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-6 font-medium">You haven't placed any orders with us.</p>
          <Link to="/restaurants" className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">
            Start Ordering
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-50 pb-6 gap-4">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Order #{order._id.substring(18)}</p>
                  <p className="text-sm font-semibold text-gray-900">{new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-sm
                    ${order.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' : ''}
                    ${order.status === 'Preparing' ? 'bg-blue-50 text-blue-700 border border-blue-200' : ''}
                    ${order.status === 'Out for Delivery' ? 'bg-purple-50 text-purple-700 border border-purple-200' : ''}
                    ${order.status === 'Delivered' ? 'bg-green-50 text-green-700 border border-green-200' : ''}
                  `}>
                    {order.status}
                  </span>
                  <p className="font-black text-2xl text-gray-900">${order.totalPrice.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-3">Items</h4>
                  <ul className="space-y-2">
                    {order.orderItems.map((item, index) => (
                      <li key={index} className="text-gray-600 text-sm font-medium flex items-center gap-2">
                        <span className="bg-gray-100 text-gray-800 font-bold px-2 py-0.5 rounded text-xs">{item.qty}x</span> 
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:border-l md:border-gray-100 md:pl-6">
                  <h4 className="text-sm font-bold text-gray-900 mb-3">Delivery Address</h4>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                    {order.deliveryAddress}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;