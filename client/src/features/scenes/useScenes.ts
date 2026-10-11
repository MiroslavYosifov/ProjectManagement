import { useCallback, useEffect, useState } from 'react';
import type { Scene } from '@simulations-project-management/shared';
import { deleteScene, listScenes } from './api';
import { getErrorMessage } from '../../common/api/client';

export function useScenes(projectId: string) {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (isCancelled: () => boolean = () => false) => {
    setLoading(true);
    setError(null);
    try {
      const data = await listScenes(projectId);
      if (!isCancelled()) setScenes(data.scenes);
    } catch (err) {
      if (!isCancelled()) setError(getErrorMessage(err, 'Failed to load scenes'));
    } finally {
      if (!isCancelled()) setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    let cancelled = false;
    load(() => cancelled);
    return () => {
      cancelled = true;
    };
  }, [load]);

  async function removeScene(sceneId: string) {
    await deleteScene(projectId, sceneId);
    setScenes((prev) => prev.filter((scene) => scene.id !== sceneId));
  }

  return { scenes, loading, error, reload: () => load(), removeScene };
}
