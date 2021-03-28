import { Provider } from "react-redux";
import { store, persistor } from "@/data/redux/store";
import { PersistGate } from "redux-persist/integration/react";

// const $name = "[ReduxProvier]";

// https://github.com/rt2zz/redux-persist#storage-engines
const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export { ReduxProvider };
