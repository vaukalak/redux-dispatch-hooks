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
  const { store }: { store: Store } = useContext(ReduxDispatchContext) || {} as any;
  const reactReduxContext = reactReduxUseStore ? reactReduxUseStore() : undefined;
  if (!(store || reactReduxContext)) {
    throw new Error('no context value provided');
  }
  return (store || reactReduxContext).dispatch;
}