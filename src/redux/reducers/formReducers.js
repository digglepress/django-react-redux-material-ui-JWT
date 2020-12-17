import initialState from "../state";
import { OPEN_DIALOG_FORM } from "../actions/actionTypes";

const formReducer = (state = initialState.form, action) => {
  switch (action.type) {
    case OPEN_DIALOG_FORM:
      return {
        ...state,
        open: action.payload,
      };
    default:
      return state;
  }
};
export default formReducer;
