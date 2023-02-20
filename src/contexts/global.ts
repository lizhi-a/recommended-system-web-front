import { createContext, Reducer, useReducer } from "react";

interface StateType {
  currentVideo?: {
    courseId?: string;
    catalogId?: string;
    name?: string;
  }
}

interface ActionType {
  type: 'setCurrentVideo',
  payload: Partial<StateType>;
}


export const globalContext = createContext<StateType & { dispatch: React.Dispatch<ActionType>; }>({
  currentVideo: {
    courseId: undefined,
    catalogId: undefined,
    name: undefined,
  },
  dispatch: () => {},
});

const globalReducer: Reducer<StateType, ActionType> = (prevState, action) => {
  const { type, payload } = action
  switch(type) {
    case 'setCurrentVideo': {
      const { currentVideo } = payload;
      return {
        currentVideo,
      }
    }
    default:
      return prevState;
  }
}

export function useGlobal(): [StateType, React.Dispatch<ActionType>] {
  const [state, dispatch] = useReducer(globalReducer, {});
  return [state, dispatch]
}