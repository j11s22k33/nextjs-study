import "@/styles/index.scss";
import { useStateCallbackWrapper } from "@/utils/common";
import env from "@/config/env";
import { ContextProvider } from "@/config/context";
import { ReduxProvider } from "@/config/contextRedux";

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
        <ReduxProvider>
          <Component {...pageProps} updateUI={updateUI} />
        </ReduxProvider>
      </ContextProvider>
    </>
  );
}

export default MyApp;
