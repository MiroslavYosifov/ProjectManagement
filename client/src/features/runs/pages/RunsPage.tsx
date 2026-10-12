import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { SimulationRun } from '@simulations-project-management/shared';
import { listRuns } from '../api';
import { formatTicks } from '../format';
import { getErrorMessage } from '../../../common/api/client';

export default function RunsPage() {
  const { projectId, sceneId } = useParams();
  const [runs, setRuns] = useState<SimulationRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listRuns({ projectId: projectId!, sceneId: sceneId! })
      .then(({ runs }) => {
        if (!cancelled) setRuns(runs);
      })
      .catch((err) => {
        if (!cancelled) setError(getErrorMessage(err, 'Failed to load runs'));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [projectId, sceneId]);

  return (
    <section className="runs-page">
      <p>
        <Link to={`/projects/${projectId}/scenes/${sceneId}`}>← Back to editor</Link>
      </p>
      <h2>Recorded runs</h2>

      {loading && <div className="loader loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {!loading && !error && runs.length === 0 && (
        <p className="muted">No runs yet. Press Play in the editor of a saved scene to record one.</p>
      )}

      <ul>
        {runs.map((run) => (
          <li key={run.id} className="scene-row">
            <span>
              <span className="scene-name">{new Date(run.started_at).toLocaleString()}</span>
              <span className="muted"> · {formatTicks(run.last_tick)} · </span>
              <span className={`run-status run-status-${run.status}`}>{run.status}</span>
            </span>
            <Link className="btn btn-ghost" to={`/projects/${projectId}/scenes/${sceneId}/runs/${run.id}`}>Replay</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
