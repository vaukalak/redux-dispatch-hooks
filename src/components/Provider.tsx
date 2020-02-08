import React, { useMemo } from 'react';
import { ReduxDispatchContext } from '../context/Context';

export const Provider = ({ store, children }) => {
  const contextValue = useMemo(() => ({ store }), [store]);
  return (
    <ReduxDispatchContext.Provider
      value={contextValue}
    >
      {children}
    </ReduxDispatchContext.Provider>
  );
};