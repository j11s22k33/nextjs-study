import "@/styles/index.scss";
import { useStateCallbackWrapper } from "@/utils/common";

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
      <h1>_app.js</h1>
      <Component {...pageProps} updateUI={updateUI} />
    </>
  );
}

export default MyApp;
