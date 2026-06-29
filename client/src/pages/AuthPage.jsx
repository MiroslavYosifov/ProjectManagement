import { useState } from 'react';
import LoginForm from '../components/LoginForm.jsx';
import RegisterForm from '../components/RegisterForm.jsx';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const isLogin = mode === 'login';

  return (
    <div className="auth-page">
      <div className="card">
        <h1>{isLogin ? 'Вход' : 'Регистрация'}</h1>

        {isLogin ? <LoginForm /> : <RegisterForm />}

        <button
          type="button"
          className="link"
          onClick={() => setMode(isLogin ? 'register' : 'login')}
        >
          {isLogin
            ? 'Have no account? Register'
            : 'Have account? Login'}
        </button>
      </div>
    </div>
  );
}
