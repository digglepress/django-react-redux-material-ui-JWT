import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, reduxImmutableStateInvariant()))
);
export default store;
