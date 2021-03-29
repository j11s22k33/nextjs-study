// import { useSelector, useDispatch } from "react-redux";
// import { Action as userAction } from "@/data/redux/reducer/user";

// import { persistor as store } from "@/data/redux/store";
import { store, persistor } from "@/data/redux/store";
import { Action as postAction } from "@/data/redux/reducer/post";

// 스토어는 provider ... 즉 컴포넌트를 감싸기 때문에 ...

const $name = "[CSSApi]";

export default class CssAPI {
  constructor() {
    // this.x2js = new X2JS();

    console.log($name, store);
    const state = store.getState();
    console.log($name, state);
    store.dispatch(postAction.update({ eat: "orange" }));
  }

  receiveMessage(data) {
    // useContext();
  }
}
