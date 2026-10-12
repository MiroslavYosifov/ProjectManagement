import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { EntitySetup } from '@simulation-engine/core';
import type { EditorController } from '../core/EditorController';
import type { StartRun } from '../core/types';
import EditorCanvas from './EditorCanvas';
import EditorToolbar from './EditorToolbar';
import SceneSettings from '../../scenes/components/SceneSettings';
import { useEditorState } from './useEditor';
import { useSceneDocument } from './useSceneDocument';
import { startRunUpload } from '../../runs/runUploads';
import type { RunTarget } from '../../runs/api';

function between(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function randomEntity(): EntitySetup {
  const color = Math.floor(Math.random() * 0xffffff);
  return {
    position: { x: between(40, 600), y: between(40, 400) },
    movement: { velocityX: between(-100, 100), velocityY: between(-100, 100) },
    appearance: Math.random() < 0.5
      ? { kind: 'circle', color, radius: between(8, 24) }
      : { kind: 'rect', color, width: between(16, 48), height: between(16, 48) },
  };
}

export default function EditorPage() {
  const { projectId, sceneId } = useParams();
  const { document, loading, error, saving, saveError, save } = useSceneDocument(projectId!, sceneId);
  const [controller, setController] = useState<EditorController | null>(null);
  const state = useEditorState(controller);
  const [name, setName] = useState('');
  const runTarget = useRef<RunTarget | null>(null);

  runTarget.current = document?.sceneId ? { projectId: projectId!, sceneId: document.sceneId } : null;

  const startRun = useCallback<StartRun>(
    (setup) => (runTarget.current ? startRunUpload(runTarget.current, setup) : null),
    [],
  );

  useEffect(() => {
    if (document) setName(document.savedName);
  }, [document?.savedName]);

  const dirty = state.dirty || (document !== null && name !== document.savedName) || document?.sceneId === null;

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  function handleBack(event: MouseEvent<HTMLAnchorElement>) {
    if (dirty && !window.confirm('You have unsaved changes. Leave the editor?')) {
      event.preventDefault();
    }
  }

  function handleAddEntity() {
    if (!controller) return;
    if (state.status === 'idle') {
      controller.updateSetup((setup) => ({ ...setup, entities: [...setup.entities, randomEntity()] }));
    } else {
      controller.dispatch({ type: 'spawnEntity', entity: randomEntity() });
    }
  }

  async function handleSave() {
    if (!controller) return;
    const saved = await save(controller.getSetup(), name.trim());
    if (saved) controller.markSaved();
  }

  if (loading) return <div className="loader loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!document) return null;

  const seed = controller ? controller.getSetup().seed : document.initialSetup.seed;

  return (
    <div className="editor-page">
      <p>
        <Link to={`/projects/${projectId}`} onClick={handleBack}>← Back to project</Link>
        {document.sceneId && (
          <>
            {' · '}
            <Link to={`/projects/${projectId}/scenes/${document.sceneId}/runs`} onClick={handleBack}>Recorded runs</Link>
          </>
        )}
      </p>

      <EditorToolbar
        state={state}
        ready={controller !== null}
        canSave={name.trim().length > 0 && dirty}
        saving={saving}
        onPlay={() => controller?.play()}
        onPause={() => controller?.pause()}
        onReset={() => controller?.reset()}
        onAddEntity={handleAddEntity}
        onSave={handleSave}
      />
      {saveError && <p className="form-error">{saveError}</p>}

      <div className="editor-body">
        <EditorCanvas setup={document.initialSetup} startRun={startRun} onControllerChange={setController} />
        <SceneSettings
          name={name}
          seed={seed}
          disabled={state.status === 'playing'}
          onNameChange={setName}
          onSeedChange={(value) => controller?.updateSetup((setup) => ({ ...setup, seed: value }))}
        />
      </div>
    </div>
  );
}
