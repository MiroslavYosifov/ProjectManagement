import type { SceneSetup } from '@simulation-engine/core';
import type { Timestamp } from './common.js';

export type SceneData = SceneSetup;

export type Scene = {
  id: string;
  project_id: string;
  name: string;
  data: SceneData;
  created_at: Timestamp;
  updated_at: Timestamp;
};

export type CreateSceneRequest = {
  name: string;
  data?: SceneData;
};

export type UpdateSceneRequest = Partial<CreateSceneRequest>;

export type SceneListResponse = { scenes: Scene[] };

export type SceneResponse = { scene: Scene };
