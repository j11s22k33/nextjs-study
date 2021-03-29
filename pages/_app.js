import "@/styles/index.scss";
import { useStateCallbackWrapper } from "@/utils/common";
import { Provider as ContextProvider } from "@/data/context";
import ReduxProvider from "@/data/redux/provider";
import env from "@/config/env";
import { useEffect } from "react";

const $name = "[_app]";
console.log($name, env);

function MyApp({ Component, pageProps }) {
  const [, uTmp] = useStateCallbackWrapper(0);
  function updateUI(
    { useLayoutEffect, useEffect } = {
      useLayoutEffect: undefined,
      useEffect: undefined
    }
  ) {
    uTmp({
      setState: (c) => c + 1,
      useLayoutEffect,
      useEffect
    });
  }

  useEffect(() => {
    console.log($name, "component mount");

    return ()=>{
      console.log($name, "component un-mount");
    }
  }, [])

  return (
    <>
      <ContextProvider>
        <ReduxProvider>
          <Component {...pageProps} updateUI={updateUI} />
        </ReduxProvider>
      </ContextProvider>
    </>
  );
}

export default MyApp;
