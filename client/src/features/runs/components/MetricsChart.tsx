import { useState, type MouseEvent } from 'react';
import type { MetricSample } from '@simulation-engine/core';
import { formatTicks, formatValue } from '../format';

type MetricsChartProps = {
  metrics: MetricSample[];
  endTick: number;
  currentTick: number;
  onSeek: (tick: number) => void;
};

const LABELS: Record<string, string> = {
  entityCount: 'Entities',
  movingEntityCount: 'Moving entities',
  averageSpeed: 'Average speed',
};

const HEIGHT = 100;

function nearestSample(metrics: MetricSample[], tick: number) {
  let best = metrics[0];
  for (const sample of metrics) {
    if (Math.abs(sample.tick - tick) < Math.abs(best.tick - tick)) best = sample;
  }
  return best;
}

function MetricChart({ name, metrics, endTick, currentTick, onSeek }: MetricsChartProps & { name: string }) {
  const [hoverTick, setHoverTick] = useState<number | null>(null);
  const values = metrics.map((sample) => sample.values[name] ?? 0);
  const min = Math.min(0, ...values);
  const max = Math.max(...values, min + 1);
  const span = Math.max(endTick, 1);
  const x = (tick: number) => (tick / span) * 100;
  const y = (value: number) => HEIGHT - ((value - min) / (max - min)) * HEIGHT;
  const points = metrics.map((sample, i) => `${x(sample.tick)},${y(values[i])}`).join(' ');
  const hovered = hoverTick === null ? null : nearestSample(metrics, hoverTick);

  function tickAt(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const fraction = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    return Math.round(fraction * span);
  }

  return (
    <figure className="metric-chart">
      <figcaption>
        <span>{LABELS[name] ?? name}</span>
        <span className="muted">{formatValue(nearestSample(metrics, currentTick).values[name] ?? 0)}</span>
      </figcaption>
      <div className="metric-chart-body">
        <div className="metric-chart-axis muted">
          <span>{formatValue(max)}</span>
          <span>{formatValue(min)}</span>
        </div>
        <div
          className="metric-chart-plot"
          onPointerMove={(event) => setHoverTick(tickAt(event))}
          onPointerLeave={() => setHoverTick(null)}
          onClick={(event) => onSeek(tickAt(event))}
        >
          <svg viewBox={`0 0 100 ${HEIGHT}`} preserveAspectRatio="none" role="img" aria-label={`${LABELS[name] ?? name} over time`}>
            <line className="metric-chart-grid" x1="0" x2="100" y1={HEIGHT} y2={HEIGHT} vectorEffect="non-scaling-stroke" />
            <polyline className="metric-chart-line" points={points} vectorEffect="non-scaling-stroke" />
            <line className="metric-chart-cursor" x1={x(currentTick)} x2={x(currentTick)} y1="0" y2={HEIGHT} vectorEffect="non-scaling-stroke" />
            {hovered && (
              <line className="metric-chart-crosshair" x1={x(hovered.tick)} x2={x(hovered.tick)} y1="0" y2={HEIGHT} vectorEffect="non-scaling-stroke" />
            )}
          </svg>
          {hovered && (
            <div
              className="metric-chart-dot"
              style={{ left: `${x(hovered.tick)}%`, top: `${(y(hovered.values[name] ?? 0) / HEIGHT) * 100}%` }}
            />
          )}
          {hovered && (
            <div className="metric-chart-tooltip" style={{ left: `${Math.min(x(hovered.tick), 80)}%` }}>
              <strong>{formatValue(hovered.values[name] ?? 0)}</strong>
              <span className="muted"> at {formatTicks(hovered.tick)}</span>
            </div>
          )}
        </div>
      </div>
    </figure>
  );
}

export default function MetricsChart(props: MetricsChartProps) {
  if (props.metrics.length === 0) return <p className="muted">No metrics recorded yet.</p>;
  const names = Object.keys(props.metrics[0].values);

  return (
    <div className="metric-charts">
      {names.map((name) => <MetricChart key={name} name={name} {...props} />)}
    </div>
  );
}
