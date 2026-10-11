import { useCallback, useSyncExternalStore } from 'react';
import type { EditorController } from '../core/EditorController';
import type { EditorState } from '../core/types';

const idleState: EditorState = { status: 'idle', tick: 0, dirty: false };

export function useEditorState(controller: EditorController | null): EditorState {
  const subscribe = useCallback(
    (listener: () => void) => (controller ? controller.subscribe(listener) : () => {}),
    [controller],
  );
  const getSnapshot = useCallback(() => (controller ? controller.getState() : idleState), [controller]);

  return useSyncExternalStore(subscribe, getSnapshot);
}
