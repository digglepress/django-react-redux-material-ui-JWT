import initialState from "../state";
import { SET_NOTIFICATION } from "../actions/actionTypes";

const notifyReducer = (state = initialState.notification, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        ...state,
        open: action.payload.open,
        message: action.payload.message,
        type: action.payload.type,
      };
    default:
      return state;
  }
};
export default notifyReducer;
