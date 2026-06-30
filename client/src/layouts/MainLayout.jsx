// Layout за защитените страници: горна навигационна лента + <Outlet/>.

import { NavLink, Link, Outlet } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import LogoutButton from '../components/auth/LogoutButton';

export default function MainLayout() {
  const { user } = useAuth();

  return (
    <>
      <nav className="app-nav">
        <div className="app-nav-left">
          <Link to="/projects" className="app-nav-brand">
            Game Editor
          </Link>
          <div className="app-nav-links">
            <NavLink to="/projects">Проекти</NavLink>
          </div>
        </div>

        <div className="app-nav-right">
          {user && (
            <span className="muted">{user.username || user.email}</span>
          )}
          <LogoutButton />
        </div>
      </nav>

      <main className="app-main">
        <Outlet />
      </main>
    </>
  );
}
