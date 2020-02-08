// eslint-disable
import { useHandler } from 'react-use-handler';
import { useDispatch } from './useDispatch';

const isFunction = (functionToCheck: any) =>
    functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';

type Action = { type: string };
type ActionCreator<B extends any[]> = (...args: B) => Action;

export const useActionDispatch = <Args extends any[]>(
  actionOrCreator: (Action | ActionCreator<Args>)
) => {
  const dispatch = useDispatch();
  return useHandler((...args: Args) => {
    dispatch(
      isFunction(actionOrCreator)
        ? (actionOrCreator as ActionCreator<Args>)(...args)
        : actionOrCreator
    );
  })
}
