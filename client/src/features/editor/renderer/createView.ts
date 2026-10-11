import { Graphics, type Container } from 'pixi.js';
import type { Appearance } from '@simulation-engine/core';

export function createView(appearance: Appearance): Container {
  switch (appearance.kind) {
    case 'circle':
      return new Graphics().circle(0, 0, appearance.radius).fill(appearance.color);
    case 'rect':
      return new Graphics()
        .rect(-appearance.width / 2, -appearance.height / 2, appearance.width, appearance.height)
        .fill(appearance.color);
  }
}

export function appearanceKey(appearance: Appearance): string {
  return JSON.stringify(appearance);
}
