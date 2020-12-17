import initialState from "../state";
import { SUBMIT_BUTTON_LOADING } from "../actions/actionTypes";

const submitButtonReducer = (state = initialState.submitButton, action) => {
  switch (action.type) {
    case SUBMIT_BUTTON_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    default:
      return state;
  }
};
export default submitButtonReducer;
