import { useAuth } from './auth/useAuth.js';
import AuthPage from './pages/AuthPage.jsx';
import HomePage from './pages/HomePage.jsx';

export default function App() {
  const { user } = useAuth();
  return user ? <HomePage /> : <AuthPage />;
}
