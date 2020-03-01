export interface Action { type: string; }

export interface AnyAction extends Action {
  // Allows any extra properties to be defined in an action.
  [extraProps: string]: any
}

export interface Store<A extends Action = AnyAction> { dispatch: (action: A) => void; }