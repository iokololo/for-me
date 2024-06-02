import Cookies from "js-cookie";
import { LOGIN } from "../actions/AuthActions.js";

const initialState = {
  isAuth: false,
  userData: null,
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      Cookies.set("token", action?.payload?.data?.token);
      return {
        ...state,
        isAuth: true,
        userData: action?.payload?.data?.user,
      };
    default:
      return state;
  }
}
