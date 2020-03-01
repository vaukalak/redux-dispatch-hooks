import React, { useMemo } from 'react';
import { ReduxDispatchContext } from '../context/Context';
import { Store } from '../types';

interface Props {
  store: Store;
  children: React.ReactElement;
}

export const Provider = ({ store, children }: Props) => {
  const contextValue = useMemo(() => ({ store }), [store]);
  return (
    <ReduxDispatchContext.Provider
      value={contextValue}
    >
      {children}
    </ReduxDispatchContext.Provider>
  );
};