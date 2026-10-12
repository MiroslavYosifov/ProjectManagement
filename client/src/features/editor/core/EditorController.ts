import { Recorder, Simulation, type Command, type SceneSetup } from '@simulation-engine/core';
import { FixedStepLoop } from './FixedStepLoop';
import type { EditorState, FrameScheduler, Renderer, StartRun } from './types';
import type { RunSink } from '../../runs/core/RunUpload';

export class EditorController {
  private setup: SceneSetup;
  private simulation: Simulation;
  private recorder: Recorder | null = null;
  private run: RunSink | null = null;
  private state: EditorState = { status: 'idle', tick: 0, dirty: false, recording: false };
  private readonly listeners = new Set<() => void>();
  private readonly loop: FixedStepLoop;

  constructor(
    setup: SceneSetup,
    private readonly renderer: Renderer,
    scheduler: FrameScheduler,
    private readonly startRun: StartRun | null = null,
  ) {
    this.setup = structuredClone(setup);
    this.simulation = Simulation.create(this.setup);
    this.loop = new FixedStepLoop(() => this.step(), () => this.renderFrame(), scheduler);
    this.render();
  }

  getState = (): EditorState => this.state;

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  play() {
    if (this.state.status === 'playing') return;
    if (this.state.status === 'idle') this.beginRecording();
    this.loop.start();
    this.setState({ status: 'playing', recording: this.recorder !== null });
  }

  pause() {
    if (this.state.status !== 'playing') return;
    this.loop.stop();
    this.recorder?.flush();
    this.setState({ status: 'paused', tick: this.simulation.tick });
  }

  reset() {
    this.loop.stop();
    this.endRecording();
    this.simulation = Simulation.create(this.setup);
    this.render();
    this.setState({ status: 'idle', tick: 0, recording: false });
  }

  dispatch(command: Command) {
    if (this.state.status === 'idle') {
      throw new Error('Commands can only be sent to a running simulation');
    }
    if (this.recorder) this.recorder.enqueue(command);
    else this.simulation.enqueue(command);
  }

  getSetup(): SceneSetup {
    return structuredClone(this.setup);
  }

  updateSetup(change: (setup: SceneSetup) => SceneSetup) {
    if (this.state.status === 'playing') {
      throw new Error('Cannot change the scene setup while the simulation is playing');
    }
    this.setup = change(structuredClone(this.setup));
    this.setState({ dirty: true });
    this.reset();
  }

  markSaved() {
    this.setState({ dirty: false });
  }

  destroy() {
    this.loop.stop();
    this.endRecording();
    this.listeners.clear();
  }

  private step() {
    if (this.recorder) this.recorder.step();
    else this.simulation.step();
  }

  private beginRecording() {
    const run = this.startRun?.(structuredClone(this.setup)) ?? null;
    if (!run) return;
    this.run = run;
    this.recorder = new Recorder(this.simulation, (chunk) => run.push(chunk));
  }

  private endRecording() {
    this.recorder?.finish();
    this.run?.finish();
    this.recorder = null;
    this.run = null;
  }

  private renderFrame() {
    this.render();
    if (this.simulation.tick !== this.state.tick) {
      this.setState({ tick: this.simulation.tick });
    }
  }

  private render() {
    this.renderer.draw(this.simulation.getSnapshot());
  }

  private setState(patch: Partial<EditorState>) {
    this.state = { ...this.state, ...patch };
    for (const listener of this.listeners) listener();
  }
}
