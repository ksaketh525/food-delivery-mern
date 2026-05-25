import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      login(response.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center px-4 py-12">
      <div className="bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/40 w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Welcome Back</h2>
          <p className="text-gray-500 font-medium">Sign in to order your favorites.</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-brand p-4 rounded-xl mb-6 text-sm font-bold border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-bold mb-2 text-sm ml-1">Email</label>
            <input 
              type="email" 
              className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all font-medium" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="user@gmail.com"
              required 
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2 text-sm ml-1">Password</label>
            <input 
              type="password" 
              className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all font-medium" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-brand text-white py-4 rounded-2xl font-black text-lg hover:bg-brandDark hover:shadow-lg hover:shadow-brand/30 transition-all duration-300 mt-4 disabled:opacity-70"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <p className="text-center mt-8 text-gray-500 font-medium">
          New to hungryBites? <Link to="/register" className="text-brand hover:text-brandDark font-bold ml-1">Create account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;