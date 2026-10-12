import type { EditorState } from '../core/types';

type EditorToolbarProps = {
  state: EditorState;
  ready: boolean;
  canSave: boolean;
  saving: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onAddEntity: () => void;
  onSave: () => void;
};

export default function EditorToolbar({
  state,
  ready,
  canSave,
  saving,
  onPlay,
  onPause,
  onReset,
  onAddEntity,
  onSave,
}: EditorToolbarProps) {
  const playing = state.status === 'playing';

  return (
    <div className="editor-toolbar">
      {playing ? (
        <button type="button" className="btn" onClick={onPause} disabled={!ready}>Pause</button>
      ) : (
        <button type="button" className="btn" onClick={onPlay} disabled={!ready}>Play</button>
      )}
      <button type="button" className="btn btn-ghost" onClick={onReset} disabled={!ready}>Reset</button>
      <button type="button" className="btn btn-ghost" onClick={onAddEntity} disabled={!ready}>
        Add entity
      </button>

      <span className="editor-status muted">
        {state.status} · tick {state.tick}{state.recording ? ' · recording' : ''}{state.dirty ? ' · unsaved changes' : ''}
      </span>

      <button type="button" className="btn editor-save" onClick={onSave} disabled={!ready || !canSave || saving}>
        {saving ? 'Saving…' : 'Save'}
      </button>
    </div>
  );
}
