import { useState } from 'react';
import { useProjects } from '../projects/useProjects.js';

// Форма за създаване на нов проект. description е по избор.
export default function ProjectForm() {
  const { create } = useProjects();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await create({ name, description: description || undefined });
      setName('');
      setDescription('');
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
        Име:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          required
        />
      </label>

      <label>
        Описание <span className="hint">(по избор)</span>:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={1000}
          rows={3}
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? 'Създаване...' : 'Нов проект'}
      </button>
    </form>
  );
}
