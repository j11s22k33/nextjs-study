import React, { useEffect, useReducer } from "react";

const $name = "[MyIndex]";

// https://ko.reactjs.org/docs/hooks-reference.html#usecontext
const createExReducer = function () {
  const type = {
    ADD: "UPDATE"
  };
  const initialState = {
    count: 0
  };
  const action = {
    update(data) {
      return {
        type: type.ADD,
        data
      };
    }
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case type.ADD:
        return { ...state, ...action.data };
      default:
        return state;
    }
  };
  return { type, initialState, action, reducer };
};

const ExReducer = createExReducer();

export default function MyIndex({ updateUI }) {
  const [state, dispatch] = useReducer(
    ExReducer.reducer,
    ExReducer.initialState
  );

  useEffect(() => {
    console.log($name, "component mount");

    dispatch(ExReducer.action.update({ name: "홍길동" }));
    console.log($name, state);

    setTimeout(() => {
      dispatch(ExReducer.action.update({ name: "홍길동 2" }));
      console.log($name, state);
    }, 3000);

    return () => {
      console.log($name, "component un-mount");
    };
  }, []);

  return (
    <>
      <h1>{JSON.stringify(state)}</h1>
      <style jsx>{``}</style>
    </>
  );
}
