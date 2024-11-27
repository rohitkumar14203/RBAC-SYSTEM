import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function PrivateRoute({ children }) {
  const currentUser = useAuthStore(state => state.currentUser);
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Check if user is still active
  if (currentUser.status === 'inactive') {
    useAuthStore.getState().logout();
    return <Navigate to="/login" />;
  }

  return children;
}