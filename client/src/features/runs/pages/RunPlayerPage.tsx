import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { MetricSample } from '@simulation-engine/core';
import type { SimulationRun } from '@simulations-project-management/shared';
import { getCheckpoint, getCommands, getMetrics, getRun, type RunTarget } from '../api';
import { ReplayController, type ReplaySource, type ReplayState } from '../core/ReplayController';
import { PixiRenderer } from '../../editor/renderer/PixiRenderer';
import { browserScheduler } from '../../editor/core/types';
import MetricsChart from '../components/MetricsChart';
import { formatTicks } from '../format';
import { getErrorMessage } from '../../../common/api/client';

const MAX_CHART_POINTS = 600;
const SEEK_DEBOUNCE_MS = 150;

function replaySource(target: RunTarget, runId: string): ReplaySource {
  return {
    checkpointAtOrBefore: async (tick) => (await getCheckpoint(target, runId, tick)).checkpoint,
    commands: async (fromTick, toTick) => (await getCommands(target, runId, fromTick, toTick)).commands,
  };
}

function useReplayState(controller: ReplayController | null, endTick: number): ReplayState {
  const fallback = useRef<ReplayState>({ status: 'loading', tick: 0, endTick, error: null });
  const subscribe = useCallback(
    (listener: () => void) => (controller ? controller.subscribe(listener) : () => {}),
    [controller],
  );
  const getSnapshot = useCallback(() => (controller ? controller.getState() : fallback.current), [controller]);
  return useSyncExternalStore(subscribe, getSnapshot);
}

export default function RunPlayerPage() {
  const { projectId, sceneId, runId } = useParams();
  const hostRef = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState<SimulationRun | null>(null);
  const [metrics, setMetrics] = useState<MetricSample[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [controller, setController] = useState<ReplayController | null>(null);
  const [scrubTick, setScrubTick] = useState<number | null>(null);
  const seekTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const endTick = run?.last_tick ?? 0;
  const state = useReplayState(controller, endTick);

  useEffect(() => {
    let cancelled = false;
    const target = { projectId: projectId!, sceneId: sceneId! };
    getRun(target, runId!)
      .then(async ({ run }) => {
        if (cancelled) return;
        setRun(run);
        const step = Math.max(1, Math.ceil(run.last_tick / MAX_CHART_POINTS));
        const { metrics } = await getMetrics(target, run.id, { step });
        if (!cancelled) setMetrics(metrics);
      })
      .catch((err) => {
        if (!cancelled) setError(getErrorMessage(err, 'Failed to load the run'));
      });
    return () => {
      cancelled = true;
    };
  }, [projectId, sceneId, runId]);

  useEffect(() => {
    if (!run) return;
    const host = hostRef.current!;
    let cancelled = false;
    let renderer: PixiRenderer | null = null;
    let created: ReplayController | null = null;

    PixiRenderer.create(host)
      .then((pixi) => {
        if (cancelled) {
          pixi.destroy();
          return;
        }
        renderer = pixi;
        created = new ReplayController(
          replaySource({ projectId: projectId!, sceneId: sceneId! }, run.id),
          run.last_tick,
          pixi,
          browserScheduler,
        );
        setController(created);
        void created.seek(0);
      })
      .catch((err) => {
        if (!cancelled) setError(getErrorMessage(err, 'Failed to start the renderer'));
      });

    return () => {
      cancelled = true;
      created?.destroy();
      renderer?.destroy();
      setController(null);
    };
  }, [run, projectId, sceneId]);

  useEffect(() => () => {
    if (seekTimer.current) clearTimeout(seekTimer.current);
  }, []);

  function seek(tick: number) {
    setScrubTick(tick);
    if (seekTimer.current) clearTimeout(seekTimer.current);
    seekTimer.current = setTimeout(() => {
      setScrubTick(null);
      void controller?.seek(tick);
    }, SEEK_DEBOUNCE_MS);
  }

  if (error) return <div className="error">{error}</div>;
  if (!run) return <div className="loader loading">Loading...</div>;

  const playing = state.status === 'playing' || state.status === 'buffering';
  const shownTick = scrubTick ?? state.tick;

  return (
    <div className="run-player">
      <p>
        <Link to={`/projects/${projectId}/scenes/${sceneId}/runs`}>← Back to runs</Link>
      </p>

      <div className="editor-toolbar">
        {playing ? (
          <button type="button" className="btn" onClick={() => controller?.pause()} disabled={!controller}>Pause</button>
        ) : (
          <button type="button" className="btn" onClick={() => controller?.play()} disabled={!controller || state.status === 'loading'}>Play</button>
        )}
        <span className="editor-status muted">
          {state.status} · {formatTicks(shownTick)} / {formatTicks(endTick)} · tick {shownTick}
          {run.status !== 'completed' ? ` · ${run.status}` : ''}
        </span>
      </div>
      {state.error && <p className="form-error">{state.error}</p>}

      <input
        className="run-timeline"
        type="range"
        min={0}
        max={endTick}
        value={shownTick}
        onChange={(event) => seek(Number(event.target.value))}
        disabled={!controller}
        aria-label="Timeline"
      />

      <div className="editor-canvas" ref={hostRef} />

      <h3>Metrics</h3>
      <MetricsChart metrics={metrics} endTick={endTick} currentTick={shownTick} onSeek={seek} />
    </div>
  );
}
