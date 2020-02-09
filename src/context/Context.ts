import { createContext } from 'react';
import { Store } from '../types';

export const ReduxDispatchContext = createContext<{ store: Store } | null>(null);