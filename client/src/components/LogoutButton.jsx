import { useState } from 'react';
import { useAuth } from '../auth/useAuth.js';

export default function LogoutButton() {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      await logout();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button className="secondary" onClick={handleClick} disabled={loading}>
      {loading ? 'Exiting...' : 'Exit'}
    </button>
  );
}
