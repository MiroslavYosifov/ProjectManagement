// 404 страница за непознати маршрути.

import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="auth-shell">
      <div style={{ textAlign: 'center' }}>
        <h1>404</h1>
        <p className="muted">Page not found.</p>
        <p>
          <Link to="/">Go home</Link>
        </p>
      </div>
    </div>
  );
}
