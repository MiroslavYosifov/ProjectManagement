import { FIXED_DT } from '@simulation-engine/core';

export function formatTicks(ticks: number) {
  const totalSeconds = Math.floor(ticks * FIXED_DT);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const mmss = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  return hours > 0 ? `${hours}:${mmss}` : mmss;
}

export function formatValue(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}
