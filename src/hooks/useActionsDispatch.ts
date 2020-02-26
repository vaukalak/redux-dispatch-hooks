import { useHandler } from 'react-use-handler';
import { useDispatch } from './useDispatch';

const isFunction = (functionToCheck: any) =>
    functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';

type Action = { type: string };
type ActionCreator<B extends any[]> = (...args: B) => Action;

type ActionOrCreator<Args extends any[] = any[]> = Action | ActionCreator<Args>;
type InferArgs<A> = A extends ActionOrCreator<infer Args> ? Args : any[];

type UnwrapActionsMap<
  ActionsMap,
> = ((() => ActionsMap) | ActionsMap)

type CreateReturnMap<ActionsMap> = {
  [key in keyof ActionsMap]: ActionsMap[key] extends ((...args: any[]) => any)
    ? ActionsMap[key]
    : () => void
};

export const useDispatchMap = <
  ActionsMap extends { [key in K]: ActionOrCreator },
  K extends keyof ActionsMap,
  ReturnMap = CreateReturnMap<ActionsMap>
>(actionsMapOrMapCreator: UnwrapActionsMap<ActionsMap>): ReturnMap => {
  const dispatch = useDispatch();
  const actions = typeof actionsMapOrMapCreator === 'function'
    ? actionsMapOrMapCreator()
    : actionsMapOrMapCreator;
  return Object.keys(actions).reduce((acc, key) => {
    // @ts-ignore
    const actionOrCreator = actions[key];
    return {
      ...acc,
      // eslint-disable-next-line
      [key]: useHandler((...args: InferArgs<typeof actionOrCreator>) => {
        dispatch(
          isFunction(actionOrCreator)
            ? (actionOrCreator as ActionCreator<any>)(...args)
            : actionOrCreator
        );
      })
    };
  }, {} as any) as ReturnMap;
}
