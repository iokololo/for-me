import Cookies from "js-cookie";
import { GET_SETTINGS } from "../actions/SettingsActions";

const initialState = {};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case GET_SETTINGS:
      return {
        ...action.payload,
        ...state,
      };
    default:
      return state;
  }
}
