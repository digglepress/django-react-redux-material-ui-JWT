import initialState from "../state";
import {
  ADD_TODO,
  DELETE_TODO,
  FETCH_REQUEST_FAILURE,
  FETCH_REQUEST_LOADING,
  FETCH_REQUEST_SUCCESS,
  SET_COMPLETED,
  UPDATE_TODO,
} from "../actions/actionTypes";

const todosReducer = (state = initialState.todos, action) => {
  switch (action.type) {
    case UPDATE_TODO:
      return {
        ...state,
        todos: [
          action.payload,
          ...state.todos.filter((todo) => todo.id !== action.payload.id),
        ],
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: [...state.todos.filter((todo) => todo.id !== action.payload)],
      };
    case SET_COMPLETED:
      return {
        ...state,
        todos: [
          action.payload,
          ...state.todos.filter((todo) => todo.id !== action.payload.id),
        ],
      };
    case FETCH_REQUEST_LOADING:
      return {
        loading: true,
        loaded: false,
        todos: [],
        error: null,
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };
    case FETCH_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        todos: action.payload,
        error: null,
      };
    case FETCH_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
        todos: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default todosReducer;
