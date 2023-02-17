import { createContext, Reducer, useReducer } from "react";

interface StateType {
  currentVideoName: string;
}

interface ActionType {
  type: 'setCurrentVideoName',
  payload: Partial<StateType>;
}


export const globalContext = createContext<StateType & { dispatch: React.Dispatch<ActionType>; }>({
  currentVideoName: '',
  dispatch: () => {},
});

const globalReducer: Reducer<StateType, ActionType> = (prevState, action) => {
  const { type, payload } = action
  switch(type) {
    case 'setCurrentVideoName': {
      const { currentVideoName = '' } = payload;
      return {
        currentVideoName
      }
    }
    default:
      return prevState;
  }
}

export function useGlobal(): [StateType, React.Dispatch<ActionType>] {
  const [state, dispatch] = useReducer(globalReducer, { currentVideoName: '' });
  return [state, dispatch]
}