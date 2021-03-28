import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
// defaults to localStorage for web
import storage from "redux-persist/lib/storage";
import RootReducer from "@/data/redux/reducer";

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

const store = createStore(persistedReducer, applyMiddleware(logger));
const persistor = persistStore(store);

export { store, persistor };
