import { useState } from 'react';
import { useProjects } from '../../context/ProjectsContext';

export default function ProjectCreateForm({ onSuccess }) {

  const { createProject } = useProjects();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await createProject({ name, description });
      setName('');
      setDescription('');
      onSuccess?.();
    } catch (err) {
      setError(err.message || 'Failed to create project');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}

      <div className='form-title'>
        Create new project
      </div>

      <div className="form-field">
        <label htmlFor="project-name">Name:</label>
        <input
          id="project-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="project-description">Description:</label>
        <textarea
          id="project-description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          autoComplete="description"
          required
        />
      </div>

      <button type="submit" className="btn" disabled={submitting}>
        {submitting ? 'Creating...' : 'Create'}
      </button>
    </form>
  );
}
