import initialState from "../state";
import { LOGIN_USER_SUCCESS, LOGOUT_USER } from "../actions/actionTypes";

export default function authReducer(state = initialState.accessToken, action) {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return action.payload;
    case LOGOUT_USER:
      return "";
    default:
      return state;
  }
}
