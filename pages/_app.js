import "@/styles/index.scss";
import { useStateCallbackWrapper } from "@/utils/common";
import env from "@/config/env";
import { ContextProvider } from "@/config/context";

const $name = "[MyApp]";

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

  return (
    <>
      <ContextProvider>
        <Component {...pageProps} updateUI={updateUI} />
      </ContextProvider>
    </>
  );
}

export default MyApp;
