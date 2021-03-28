import { Provider } from "react-redux";
import { store, persistor } from "@/data/redux/store";
import { PersistGate } from "redux-persist/integration/react";

/**
 * redux-persist 적용되어 있다
 * 비휘발성이라 새로고침에서 자유롭다. LocalStorage 비슷
 */
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

export default ReduxProvider;
