import todosReducer from "./todosReducers";
import { combineReducers } from "redux";
import formReducer from "./formReducers";
import submitButtonReducer from "./submitButtonReducer";
import notifyReducer from "./notifyReducer";
import authReducers from "./authReducers";

const rootReducer = combineReducers({
  todos: todosReducer,
  form: formReducer,
  submitButton: submitButtonReducer,
  notify: notifyReducer,
  auth: authReducers,
});
export default rootReducer;
