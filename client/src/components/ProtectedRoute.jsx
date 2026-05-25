import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useContext(AuthContext);

  // If there is no user logged in, send them to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If this route is for admins only, and the user is NOT an admin, send them home
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // If they pass the checks, let them see the page
  return children;
};

export default ProtectedRoute;