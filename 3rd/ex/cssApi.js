import { store } from "@/data/redux/store";
import { Action as postAction } from "@/data/redux/reducer/post";

const $name = "[CssAPI]";

export default class CssAPI {
  constructor() {
    this.state = store.getState();
    console.log($name, "constructor", this.state.post);
  }

  setMessage(msg) {
    store.dispatch(postAction.update({ msg: msg }));
    console.log($name, "setMessage", this.state.post);
  }
}
