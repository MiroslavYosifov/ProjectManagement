import { Simulation, type SceneSetup } from '@simulation-engine/core';
import { FixedStepLoop } from './FixedStepLoop';
import type { EditorState, FrameScheduler, Renderer } from './types';

export class EditorController {
  private setup: SceneSetup;
  private simulation: Simulation;
  private state: EditorState = { status: 'idle', tick: 0, dirty: false };
  private readonly listeners = new Set<() => void>();
  private readonly loop: FixedStepLoop;

  constructor(setup: SceneSetup, private readonly renderer: Renderer, scheduler: FrameScheduler) {
    this.setup = structuredClone(setup);
    this.simulation = Simulation.create(this.setup);
    this.loop = new FixedStepLoop(() => this.simulation.step(), () => this.renderFrame(), scheduler);
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
    this.loop.start();
    this.setState({ status: 'playing' });
  }

  pause() {
    if (this.state.status !== 'playing') return;
    this.loop.stop();
    this.setState({ status: 'paused', tick: this.simulation.tick });
  }

  reset() {
    this.loop.stop();
    this.simulation = Simulation.create(this.setup);
    this.render();
    this.setState({ status: 'idle', tick: 0 });
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
    this.listeners.clear();
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
