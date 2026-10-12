import { Replayer, type Checkpoint, type TimedCommand } from '@simulation-engine/core';
import { FixedStepLoop } from '../../editor/core/FixedStepLoop';
import type { FrameScheduler, Renderer } from '../../editor/core/types';

export interface ReplaySource {
  checkpointAtOrBefore(tick: number): Promise<Checkpoint>;
  commands(fromTick: number, toTick: number): Promise<TimedCommand[]>;
}

export type ReplayStatus = 'loading' | 'paused' | 'playing' | 'buffering' | 'error';

export type ReplayState = {
  status: ReplayStatus;
  tick: number;
  endTick: number;
  error: string | null;
};

export const COMMAND_WINDOW_TICKS = 3600;
const PREFETCH_MARGIN_TICKS = 600;

export class ReplayController {
  private replayer: Replayer | null = null;
  private loadedUntil = 0;
  private generation = 0;
  private fetching = false;
  private wantsPlay = false;
  private state: ReplayState;
  private readonly listeners = new Set<() => void>();
  private readonly loop: FixedStepLoop;

  constructor(
    private readonly source: ReplaySource,
    endTick: number,
    private readonly renderer: Renderer,
    scheduler: FrameScheduler,
  ) {
    this.state = { status: 'loading', tick: 0, endTick, error: null };
    this.loop = new FixedStepLoop(() => this.step(), () => this.renderFrame(), scheduler);
  }

  getState = (): ReplayState => this.state;

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  async seek(tick: number): Promise<void> {
    const target = Math.max(0, Math.min(Math.round(tick), this.state.endTick));
    const generation = ++this.generation;
    this.loop.stop();
    this.fetching = false;
    this.setState({ status: 'loading', tick: target, error: null });

    try {
      const checkpoint = await this.source.checkpointAtOrBefore(target);
      const until = Math.min(target + COMMAND_WINDOW_TICKS, this.state.endTick);
      const commands = await this.source.commands(checkpoint.tick, until);
      if (generation !== this.generation) return;

      const replayer = new Replayer(checkpoint, commands);
      replayer.advanceTo(target);
      this.replayer = replayer;
      this.loadedUntil = until;
      this.render();
      this.setState({ status: this.wantsPlay ? 'playing' : 'paused', tick: replayer.tick });
      if (this.wantsPlay) this.loop.start();
    } catch (error) {
      if (generation !== this.generation) return;
      this.fail(error);
    }
  }

  play() {
    this.wantsPlay = true;
    if (this.state.tick >= this.state.endTick) {
      void this.seek(0);
      return;
    }
    if (this.state.status !== 'paused') return;
    this.loop.start();
    this.setState({ status: 'playing' });
  }

  pause() {
    this.wantsPlay = false;
    if (this.state.status !== 'playing' && this.state.status !== 'buffering') return;
    this.loop.stop();
    this.setState({ status: 'paused' });
  }

  destroy() {
    this.generation++;
    this.loop.stop();
    this.listeners.clear();
  }

  private step() {
    const replayer = this.replayer;
    if (!replayer) return;

    if (replayer.tick >= this.state.endTick) {
      this.wantsPlay = false;
      this.loop.stop();
      this.setState({ status: 'paused', tick: replayer.tick });
      return;
    }

    const allLoaded = this.loadedUntil >= this.state.endTick;
    if (!allLoaded && replayer.tick >= this.loadedUntil) {
      if (this.state.status !== 'buffering') this.setState({ status: 'buffering' });
      this.prefetch();
      return;
    }

    replayer.step();
    if (!allLoaded && replayer.tick > this.loadedUntil - PREFETCH_MARGIN_TICKS) this.prefetch();
  }

  private prefetch() {
    if (this.fetching) return;
    this.fetching = true;
    const generation = this.generation;
    const from = this.loadedUntil;
    const to = Math.min(from + COMMAND_WINDOW_TICKS, this.state.endTick);

    this.source.commands(from, to)
      .then((commands) => {
        if (generation !== this.generation || !this.replayer) return;
        this.replayer.addCommands(commands);
        this.loadedUntil = to;
        if (this.state.status === 'buffering') this.setState({ status: 'playing' });
      })
      .catch((error) => {
        if (generation === this.generation) this.fail(error);
      })
      .finally(() => {
        if (generation === this.generation) this.fetching = false;
      });
  }

  private fail(error: unknown) {
    this.loop.stop();
    this.wantsPlay = false;
    this.setState({ status: 'error', error: error instanceof Error ? error.message : 'Failed to load the run' });
  }

  private renderFrame() {
    if (!this.replayer) return;
    this.render();
    if (this.replayer.tick !== this.state.tick) this.setState({ tick: this.replayer.tick });
  }

  private render() {
    if (this.replayer) this.renderer.draw(this.replayer.getSnapshot());
  }

  private setState(patch: Partial<ReplayState>) {
    this.state = { ...this.state, ...patch };
    for (const listener of this.listeners) listener();
  }
}
