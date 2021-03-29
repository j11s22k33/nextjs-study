import { store } from "@/data/redux/store";
import { Action as postAction } from "@/data/redux/reducer/post";

const $name = "[CssAPI]";

export default class CssAPI {
  constructor() {
    // this.x2js = new X2JS();

    const state = store.getState();
    console.log($name, state);
  }

  receiveMessage(msg) {
    store.dispatch(postAction.update({ msg }));
  }
}
