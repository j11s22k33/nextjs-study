import React, { useEffect, useReducer } from "react";
const $name = "[useReducer]";

// https://ko.reactjs.org/docs/hooks-reference.html#usecontext
// useState 비슷.
const ExampleReducer = {
  initialState: {
    count: 0
  },
  reducer(state, action) {
    switch (action.type) {
      case "ADD":
        return { ...state, count: state.count + 1 };
      // return state; // useRef.current 와 비슷하게 동작.
      // return { ...state };  // useState 와 비슷하게 동작. context 값이 변경되면 하위 component도 변경 되어야 하니. 새로운 state 를 반환하는 코드가 맞다
      default:
        throw new Error();
    }
  }
};

export default function MyReducer({ updateUI }) {
  const [state, dispatch] = useReducer(
    ExampleReducer.reducer,
    ExampleReducer.initialState
  );

  useEffect(() => {
    console.log($name, "component mount");

    setTimeout(() => {
      dispatch({ type: "ADD" });
      console.log($name, "dependency []", state);
    }, 3000);

    setTimeout(() => {
      dispatch({ type: "ADD" });
      console.log($name, "dependency []", state);
    }, 6000);

    setTimeout(() => {
      dispatch({ type: "ADD" });
      console.log($name, "dependency []", state);
    }, 9000);

    return () => {
      console.log($name, "component un-mount");
    };
  }, []);

  useEffect(() => {
    console.log($name, "dependency [state]", state);
  }, [state]);

  return (
    <>
      <h1>{state.count}</h1>
      <style jsx>{``}</style>
    </>
  );
}
