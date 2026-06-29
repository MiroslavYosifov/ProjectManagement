import { useState } from 'react';
import { useProjects } from '../projects/useProjects.js';

// Един проект: преглед с inline редакция и изтриване.
// Само OWNER може да трие, EDITOR/OWNER могат да редактират (огледало на бекенда).
export default function ProjectItem({ project }) {
  const { update, remove } = useProjects();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description ?? '');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const canEdit = project.role === 'EDITOR' || project.role === 'OWNER';
  const canDelete = project.role === 'OWNER';

  async function handleSave(e) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await update(project.id, { name, description });
      setEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  function handleCancel() {
    setName(project.name);
    setDescription(project.description ?? '');
    setError(null);
    setEditing(false);
  }

  async function handleDelete() {
    if (!window.confirm(`Да изтрия ли проекта „${project.name}“?`)) return;
    setError(null);
    setBusy(true);
    try {
      await remove(project.id);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  if (editing) {
    return (
      <li className="project-item">
        <form className="form" onSubmit={handleSave}>
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
            Описание:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={1000}
              rows={3}
            />
          </label>
          <div className="project-actions">
            <button type="submit" disabled={busy}>
              {busy ? 'Запазване...' : 'Запази'}
            </button>
            <button
              type="button"
              className="secondary"
              onClick={handleCancel}
              disabled={busy}
            >
              Отказ
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="project-item">
      {error && <p className="error">{error}</p>}
      <div className="project-head">
        <h3>{project.name}</h3>
        <span className="role-badge">{project.role}</span>
      </div>
      {project.description && (
        <p className="project-desc">{project.description}</p>
      )}
      {(canEdit || canDelete) && (
        <div className="project-actions">
          {canEdit && (
            <button
              type="button"
              className="secondary"
              onClick={() => setEditing(true)}
              disabled={busy}
            >
              Редактирай
            </button>
          )}
          {canDelete && (
            <button
              type="button"
              className="secondary"
              onClick={handleDelete}
              disabled={busy}
            >
              Изтрий
            </button>
          )}
        </div>
      )}
    </li>
  );
}
