import { useContext } from "react";
import { ReduxDispatchContext } from '../context/Context';

let reactReduxUseStore; 
try{
  reactReduxUseStore = require('react-redux').useStore;
} catch(err){
  // no 'react-redux', however we can use our context
}

export const useDispatch = () => {
  const context = useContext(ReduxDispatchContext);
  const reactReduxContext = reactReduxUseStore ? reactReduxUseStore() : undefined;
  if (!(context || reactReduxContext)) {
    throw new Error('no context value provided');
  }
  return (context || reactReduxContext).dispatch;
}