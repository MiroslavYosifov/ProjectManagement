// Страница за вход: заглавие + LoginForm + линк към регистрация.

import { Link } from 'react-router-dom';

import LoginForm from '../components/auth/LoginForm';

export default function LoginPage() {
  return (
    <>
      <h1>Login</h1>
      <LoginForm />
      <p className="auth-switch">
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </p>
    </>
  );
}
