import "@/styles/index.scss";
import { useStateCallbackWrapper } from "@/utils/common";
import env from "@/config/env";

const pageName = "[MyApp]";

console.log(pageName, env);

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
      <Component {...pageProps} updateUI={updateUI} />
    </>
  );
}

export default MyApp;
