import { combineReducers } from "redux"; // 흩어진 reducer 들을 하나로 모아준다.

import user from "@/data/redux/reducer/user";

// https://github.com/rt2zz/redux-persist#storage-engines
const RootReducer = combineReducers({
  user
});

export default RootReducer;
