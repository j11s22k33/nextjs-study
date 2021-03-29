import React, { useEffect } from "react";
import { store } from "@/data/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { Action as postAction } from "@/data/redux/reducer/post";

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
 * component 가 아닐때에도 사용가능하다.
 * redux-persist 사용하면 웹 새로고침해도 괜찮.
 */
export class ExClass {
  constructor() {
    this.state = store.getState();
    console.log("[ExClass]", "constructor", this.state.post);
  }

  setMessage(msg) {
    store.dispatch(postAction.update({ msg: msg }));
    console.log("[ExClass]", "setMessage", this.state.post);
  }
}

export default function ExComponent() {
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postAction.update({ id: "POST_ID", age: 10 }));
    console.log("[ExComponent]", post);

    const exClass = new ExClass();
    exClass.setMessage("반가");
  }, []);

  return <h1>component</h1>;
}
