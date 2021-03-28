import { combineReducers } from "redux"; // 흩어진 reducer 들을 하나로 모아준다.

import user from "@/data/redux/reducer/user";
import post from "@/data/redux/reducer/post";

const RootReducer = combineReducers({
  user,
  post
});

export default RootReducer;
