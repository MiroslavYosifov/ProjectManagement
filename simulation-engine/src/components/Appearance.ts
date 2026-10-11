export type Appearance =
    | { kind: 'circle'; color: number; radius: number }
    | { kind: 'rect'; color: number; width: number; height: number };
