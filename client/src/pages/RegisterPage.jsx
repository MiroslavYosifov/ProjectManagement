// Страница за регистрация: заглавие + RegisterForm + линк към вход.

import { Link } from 'react-router-dom';

import RegisterForm from '../components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <>
      <h1>Register</h1>
      <RegisterForm />
      <p className="auth-switch">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </>
  );
}
