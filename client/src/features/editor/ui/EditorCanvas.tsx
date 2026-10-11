import { useEffect, useRef, useState } from 'react';
import type { SceneSetup } from '@simulation-engine/core';
import { EditorController } from '../core/EditorController';
import { browserScheduler } from '../core/types';
import { PixiRenderer } from '../renderer/PixiRenderer';
import { getErrorMessage } from '../../../common/api/client';

type EditorCanvasProps = {
  setup: SceneSetup;
  onControllerChange: (controller: EditorController | null) => void;
};

export default function EditorCanvas({ setup, onControllerChange }: EditorCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const host = hostRef.current!;
    let cancelled = false;
    let renderer: PixiRenderer | null = null;
    let controller: EditorController | null = null;

    PixiRenderer.create(host)
      .then((created) => {
        if (cancelled) {
          created.destroy();
          return;
        }
        renderer = created;
        controller = new EditorController(setup, created, browserScheduler);
        onControllerChange(controller);
      })
      .catch((err) => {
        if (!cancelled) setError(getErrorMessage(err, 'Failed to start the renderer'));
      });

    return () => {
      cancelled = true;
      controller?.destroy();
      renderer?.destroy();
      onControllerChange(null);
    };
  }, [setup, onControllerChange]);

  return (
    <div className="editor-canvas" ref={hostRef}>
      {error && <div className="error">{error}</div>}
    </div>
  );
}
