import { FIXED_DT } from '@simulation-engine/core';
import type { FrameScheduler } from './types';

export const FIXED_DT_MS = FIXED_DT * 1000;
const MAX_STEPS_PER_FRAME = 5;

export class FixedStepLoop {
  private handle: number | null = null;
  private running = false;
  private lastTime: number | null = null;
  private accumulator = 0;

  constructor(
    private readonly onStep: () => void,
    private readonly onFrame: () => void,
    private readonly scheduler: FrameScheduler,
  ) {}

  start() {
    if (this.running) return;
    this.running = true;
    this.lastTime = null;
    this.accumulator = 0;
    this.handle = this.scheduler.request(this.frame);
  }

  stop() {
    this.running = false;
    if (this.handle !== null) {
      this.scheduler.cancel(this.handle);
      this.handle = null;
    }
  }

  private frame = (time: number) => {
    if (this.lastTime !== null) {
      this.accumulator += time - this.lastTime;
      let steps = 0;
      while (this.accumulator >= FIXED_DT_MS && steps < MAX_STEPS_PER_FRAME) {
        this.onStep();
        this.accumulator -= FIXED_DT_MS;
        steps++;
      }
      if (steps === MAX_STEPS_PER_FRAME) this.accumulator = 0;
    }
    this.lastTime = time;
    this.onFrame();
    this.handle = this.running ? this.scheduler.request(this.frame) : null;
  };
}
