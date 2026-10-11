import { Application, Container } from 'pixi.js';
import type { EntityId, SimulationSnapshot } from '@simulation-engine/core';
import type { Renderer } from '../core/types';
import { appearanceKey, createView } from './createView';

type EntityView = { view: Container; key: string };

export class PixiRenderer implements Renderer {
  private readonly views = new Map<EntityId, EntityView>();

  private constructor(
    private readonly app: Application,
    private readonly entities: Container,
  ) {}

  static async create(host: HTMLElement): Promise<PixiRenderer> {
    const app = new Application();
    await app.init({ autoStart: false, resizeTo: host, background: 0x1e1e2e, antialias: true });

    const world = new Container();
    const entities = new Container();
    world.addChild(entities);
    app.stage.addChild(world);
    host.appendChild(app.canvas);

    return new PixiRenderer(app, entities);
  }

  draw(snapshot: SimulationSnapshot) {
    const seen = new Set<EntityId>();

    for (const entity of snapshot.entities) {
      seen.add(entity.id);
      const key = appearanceKey(entity.appearance);
      let current = this.views.get(entity.id);

      if (current && current.key !== key) {
        current.view.destroy();
        current = undefined;
      }
      if (!current) {
        current = { view: createView(entity.appearance), key };
        this.entities.addChild(current.view);
        this.views.set(entity.id, current);
      }

      current.view.position.set(entity.position.x, entity.position.y);
    }

    for (const [id, { view }] of this.views) {
      if (!seen.has(id)) {
        view.destroy();
        this.views.delete(id);
      }
    }

    this.app.render();
  }

  destroy() {
    this.views.clear();
    this.app.destroy({ removeView: true }, { children: true });
  }
}
