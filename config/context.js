import React, { useReducer } from "react";

const $name = "[MyContext]";

const MyReducer = {
  initialState: {
    count: 0
  },
  reducer(state, action) {
    switch (action.type) {
      case "INCREASE":
        return {
          ...state,
          count: state.count + 1
        };
      // return state; // useRef.current 와 비슷하게 동작.
      // return { ...state };  // useState 와 비슷하게 동작. context 값이 변경되면 하위 component도 변경 되어야 하니. 새로운 state 를 반환하는 코드가 맞다
      default:
        throw new Error(
          `${$name} Not found reducer.Action ${JSON.stringify(action)}`
        );
    }
  }
};

const Context = React.createContext();

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    MyReducer.reducer,
    MyReducer.initialState
  );

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export { Context, ContextProvider };
