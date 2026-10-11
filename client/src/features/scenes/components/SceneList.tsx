import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScenes } from '../useScenes';
import { getErrorMessage } from '../../../common/api/client';

export default function SceneList({ projectId }: { projectId: string }) {
  const { scenes, loading, error, removeScene } = useScenes(projectId);
  const [actionError, setActionError] = useState<string | null>(null);

  async function handleDelete(sceneId: string) {
    setActionError(null);
    try {
      await removeScene(sceneId);
    } catch (err) {
      setActionError(getErrorMessage(err, 'Failed to delete scene'));
    }
  }

  return (
    <section className="scene-list">
      <div className="scene-list-header">
        <h2>Scenes</h2>
        <Link className="btn" to={`/projects/${projectId}/scenes/new`}>New scene</Link>
      </div>

      {loading && <div className="loader loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {actionError && <div className="error">{actionError}</div>}

      {!loading && !error && scenes.length === 0 && <p className="muted">No scenes yet.</p>}

      <ul>
        {scenes.map((scene) => (
          <li key={scene.id} className="scene-row">
            <span className="scene-name">{scene.name}</span>
            <span className="scene-actions">
              <Link className="btn btn-ghost" to={`/projects/${projectId}/scenes/${scene.id}`}>Open</Link>
              <button type="button" className="btn btn-delete" onClick={() => handleDelete(scene.id)}>
                Delete
              </button>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
