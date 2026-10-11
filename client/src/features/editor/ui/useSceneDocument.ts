import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEmptySetup, isSceneSetup, type SceneSetup } from '@simulation-engine/core';
import { createScene, getScene, updateScene } from '../../scenes/api';
import { getErrorMessage } from '../../../common/api/client';

export type SceneDocument = {
  sceneId: string | null;
  savedName: string;
  initialSetup: SceneSetup;
};

function randomSeed() {
  return Math.floor(Math.random() * 2 ** 31);
}

export function useSceneDocument(projectId: string, sceneId: string | undefined) {
  const navigate = useNavigate();
  const [document, setDocument] = useState<SceneDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const createdSceneId = useRef<string | null>(null);

  useEffect(() => {
    if (sceneId && sceneId === createdSceneId.current) return;

    if (!sceneId) {
      setDocument({ sceneId: null, savedName: '', initialSetup: createEmptySetup(randomSeed()) });
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    getScene(projectId, sceneId)
      .then(({ scene }) => {
        if (cancelled) return;
        if (!isSceneSetup(scene.data)) {
          setError('This scene was saved in a format the editor does not support.');
          return;
        }
        setDocument({ sceneId: scene.id, savedName: scene.name, initialSetup: scene.data });
      })
      .catch((err) => {
        if (!cancelled) setError(getErrorMessage(err, 'Failed to load scene'));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [projectId, sceneId]);

  async function save(setup: SceneSetup, name: string) {
    if (!document) return false;
    setSaving(true);
    setSaveError(null);
    try {
      if (document.sceneId) {
        await updateScene(projectId, document.sceneId, { name, data: setup });
        setDocument({ ...document, savedName: name });
      } else {
        const { scene } = await createScene(projectId, { name, data: setup });
        createdSceneId.current = scene.id;
        setDocument({ ...document, sceneId: scene.id, savedName: name });
        navigate(`/projects/${projectId}/scenes/${scene.id}`, { replace: true });
      }
      return true;
    } catch (err) {
      setSaveError(getErrorMessage(err, 'Failed to save scene'));
      return false;
    } finally {
      setSaving(false);
    }
  }

  return { document, loading, error, saving, saveError, save };
}
