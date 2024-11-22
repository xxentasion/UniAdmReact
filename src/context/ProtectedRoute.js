import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();

  if (!user || !user.isAuthenticated) {
    // Если пользователь не авторизован, перенаправляем на страницу входа
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== 'admin') {
    // Если требуется доступ только для админа, и роль не админ, перенаправляем
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
