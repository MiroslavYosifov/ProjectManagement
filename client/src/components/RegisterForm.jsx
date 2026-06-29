import { useState } from 'react';
import { useAuth } from '../auth/useAuth.js';

const initial = { email: '', password: '', username: '' };

export default function RegisterForm() {
  const { register } = useAuth();
  const [form, setForm] = useState(initial);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function update(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register({
        email: form.email,
        password: form.password,
        username: form.username.trim() || undefined,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}

      <label>
        E-mail:
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={update}
          autoComplete="email"
          required
        />
      </label>

      <label>
        Username: <span className="hint">(not required)</span>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={update}
          autoComplete="username"
          minLength={3}
          maxLength={20}
        />
      </label>

      <label>
        Password <span className="hint">(min 8 symbols)</span>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={update}
          autoComplete="new-password"
          minLength={8}
          maxLength={128}
          required
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? 'Registration...' : 'Registration'}
      </button>
    </form>
  );
}
