import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/RootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";

const initialState = {};

const middleware = [thunk];

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
