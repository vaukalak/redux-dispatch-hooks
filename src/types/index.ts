export interface Action { type: string; }
export interface Store { dispatch: (action: Action) => void; }