import React, { useEffect, useContext } from "react";
import { Context, Action } from "@/data/context";

const $name = "[MyUseContext]";

// https://ko.reactjs.org/docs/hooks-reference.html#usecontext
export default function MyUseContext({ updateUI }) {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    console.log($name, "component mount");

    dispatch(Action.update({ id: "CTX_ID", age: 30 }));
    console.log($name, state);

    setTimeout(() => {
      dispatch(Action.update({ id: "CTX_ID_1", age: 90 }));
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
