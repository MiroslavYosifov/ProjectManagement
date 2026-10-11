type SceneSettingsProps = {
  name: string;
  seed: number;
  disabled: boolean;
  onNameChange: (name: string) => void;
  onSeedChange: (seed: number) => void;
};

export default function SceneSettings({ name, seed, disabled, onNameChange, onSeedChange }: SceneSettingsProps) {
  return (
    <aside className="scene-settings">
      <h2>Scene settings</h2>

      <div className="form-field">
        <label htmlFor="scene-name">Name</label>
        <input
          id="scene-name"
          type="text"
          value={name}
          maxLength={100}
          onChange={(e) => onNameChange(e.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="scene-seed">Seed</label>
        <input
          id="scene-seed"
          type="number"
          value={seed}
          disabled={disabled}
          onChange={(e) => onSeedChange(Number(e.target.value) || 0)}
        />
      </div>
    </aside>
  );
}
