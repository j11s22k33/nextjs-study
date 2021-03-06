import React, { useReducer } from "react";

const $name = "[Context]";

const TYPE_UPDATE = $name + "UPDATE";

const initialState = {};

const Reducer = (state, action) => {
  switch (action.type) {
    case TYPE_UPDATE:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
};

const Action = {
  update: (data) => ({
    type: TYPE_UPDATE,
    data
  })
};

const Context = React.createContext();
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export { Context, Provider, Action };
