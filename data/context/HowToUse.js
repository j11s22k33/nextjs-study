import React, { useEffect, useContext } from "react";
import { Context, Action } from "@/data/context";

/**
import { Provider as ContextProvider } from "@/data/context";
import ReduxProvider from "@/data/redux/provider";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <ContextProvider>
        <ReduxProvider>
          <Component {...pageProps} updateUI={updateUI} />
        </ReduxProvider>
      </ContextProvider>
    </>
  )
}
 */

/**
 * component 내에서만 사용가능
 * 웹 새로고침 하면 초기화됨.
 */
// https://ko.reactjs.org/docs/hooks-reference.html#usecontext
export default function ExComponent({ updateUI }) {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    dispatch(Action.update({ id: "CTX_ID", age: 30 }));
  }, []);

  return (
    <>
      <h1>{JSON.stringify(state)}</h1>
      <style jsx>{``}</style>
    </>
  );
}
