import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import SettingsReducer from "./SettingsReducer";

const RootReducer = combineReducers({
  auth: AuthReducer,
  settings: SettingsReducer,
});

export default RootReducer;
