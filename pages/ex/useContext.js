import React, { useEffect, useContext } from "react";
import { Context } from "@/config/context";

const $name = "[MyUseContext]";

// https://ko.reactjs.org/docs/hooks-reference.html#usecontext
// useState 비슷.
export default function MyUseContext({ updateUI }) {
  const [gstate, dispatch] = useContext(Context);

  console.log($name, gstate);

  useEffect(() => {
    console.log($name, "component mount");

    setTimeout(() => {
      dispatch({ type: "INCREASE" });
      console.log($name, "dependency []", gstate);
    }, 3000);

    setTimeout(() => {
      dispatch({ type: "INCREASE" });
      console.log($name, "dependency []", gstate);
    }, 6000);

    setTimeout(() => {
      dispatch({ type: "INCREASE" });
      console.log($name, "dependency []", gstate);
    }, 9000);

    return () => {
      console.log($name, "component un-mount");
    };
  }, []);

  useEffect(
    (state) => {
      console.log($name, "dependency [ctx]", gstate, state);
    },
    [gstate]
  );

  return (
    <>
      <h1>{gstate.count}</h1>
      <style jsx>{``}</style>
    </>
  );
}
