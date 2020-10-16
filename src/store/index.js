import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { AsyncStorage } from "react-native";
import { persistStore, persistReducer } from "redux-persist";
import { authChangeListener } from "../utils/authChangeListener";




// Import reducers

import { MODULE_NAME as authModuleName, reducer as authReducer } from "./Auth";
import {MODULE_NAME as shopModuleName, reducer as shopReducer} from './shop/categories';
const rootReducer = combineReducers({
  [authModuleName]: authReducer,
  [shopModuleName]:shopReducer
});
// Setup persist store
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);

// authChangeListener(store);

export default store;
