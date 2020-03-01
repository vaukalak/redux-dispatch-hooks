import { useContext } from "react";
import { ReduxDispatchContext } from '../context/Context';
import { Store } from '../types';

let reactReduxUseStore: () => Store; 
try{
  // @ts-ignore
  reactReduxUseStore = require('react-redux').useStore;
} catch(err){
  // no 'react-redux', however we can use our context
}

export const useDispatch = () => {
  const reduxDispatchContext: { store: Store } = useContext(ReduxDispatchContext) || {} as any;
  if (reduxDispatchContext.store) {
    return reduxDispatchContext.store.dispatch;
  }
  if (!reactReduxUseStore) {
    throw new Error('Please use `useDispatch` in components inside redux-dispatch-hooks or react-redux.');
  }
  return reactReduxUseStore().dispatch;
}