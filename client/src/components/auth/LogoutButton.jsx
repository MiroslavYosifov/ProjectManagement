// Бутон за изход: чисти сесията през useAuth().logout() и връща към /login.

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

export default function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login', { replace: true });
  }

  return (
    <button type="button" className="btn btn-ghost" onClick={handleLogout}>
      Logout
    </button>
  );
}
