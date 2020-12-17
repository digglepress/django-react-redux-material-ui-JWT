import {
  ADD_TODO,
  DELETE_TODO,
  FETCH_REQUEST_FAILURE,
  FETCH_REQUEST_LOADING,
  FETCH_REQUEST_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  OPEN_DIALOG_FORM,
  SET_COMPLETED,
  SET_NOTIFICATION,
  SUBMIT_BUTTON_LOADING,
  UPDATE_TODO,
} from "./actionTypes";
import axios from "axios";
import { logout, obtainToken } from "../../api/authentication";

// Actions
export const formDialog = (open = false) => {
  return {
    type: OPEN_DIALOG_FORM,
    payload: open,
  };
};
export const submitButton = (status) => {
  return {
    type: SUBMIT_BUTTON_LOADING,
    payload: status,
  };
};
export const fetchRequest = () => {
  return {
    type: FETCH_REQUEST_LOADING,
  };
};
export const notify = (status) => {
  return {
    type: SET_NOTIFICATION,
    payload: status,
  };
};
export const fetchSuccess = (todosData) => {
  return {
    type: FETCH_REQUEST_SUCCESS,
    payload: todosData,
  };
};
export const fetchFailure = (errorMessage) => {
  return {
    type: FETCH_REQUEST_FAILURE,
    payload: errorMessage,
  };
};
export const addTodo = (todoData) => {
  return {
    type: ADD_TODO,
    payload: todoData,
  };
};
export const editTodo = (todoData) => {
  return {
    type: UPDATE_TODO,
    payload: todoData,
  };
};
export const toggleCompleted = (todoData) => {
  return {
    type: SET_COMPLETED,
    payload: todoData,
  };
};
export const deleteTodo = (todoId) => {
  return {
    type: DELETE_TODO,
    payload: todoId,
  };
};

export function loginUserSuccess(token) {
  return { type: LOGIN_USER_SUCCESS, payload: token };
}

export function logoutUserSuccess() {
  return { type: LOGOUT_USER };
}

// Thunks
export function loginUser(username, password) {
  return async function (dispatch) {
    try {
      const response = await obtainToken(username, password);
      dispatch(loginUserSuccess(response.data.access));
    } catch (error) {
      dispatch(fetchFailure("Error obtaining token."));
      console.log(error);
    }
  };
}

export function logoutUser() {
  return async function (dispatch) {
    await logout();
    dispatch(logoutUserSuccess());
  };
}

export const loadTodos = () => (dispatch) => {
  dispatch(fetchRequest());
  axios
    .get("http://localhost:8000/api/v1/todos/?format=json")
    .then((response) => {
      dispatch(fetchSuccess(response.data));
    })
    .catch((error) => {
      dispatch(fetchFailure(error.message));
    });
};

export const postTodo = (todoData) => (dispatch) => {
  axios
    .post("http://localhost:8000/api/v1/todos/", todoData)
    .then((response) => {
      dispatch(addTodo(response.data));
      dispatch(
        notify({
          open: true,
          message: `Successfully added ${response.data.title}`,
          type: "success",
        })
      );
    })
    .catch((error) => {
      dispatch(fetchFailure(error.message));
    });
};

export const setCompleted = ({ id, completed }) => (dispatch) => {
  axios
    .patch(`http://localhost:8000/api/v1/todos/${id}/`, {
      completed: !completed,
    })
    .then((response) => {
      dispatch(toggleCompleted(response.data));
      dispatch(
        notify({
          open: true,
          message: `${response.data.title} ${
            response.data.completed ? "checked" : "unchecked"
          }`,
          type: "info",
        })
      );
    })
    .catch((error) => {
      dispatch(fetchFailure(error.message));
    });
};

export const updateTodo = (todo) => (dispatch) => {
  axios
    .patch(`http://localhost:8000/api/v1/todos/${todo.id}/`, todo)
    .then((response) => {
      dispatch(editTodo(response.data));
      dispatch(submitButton({ loading: false, success: false }));
      dispatch(
        notify({
          open: true,
          message: `Successfully updated ${response.data.title}`,
          type: "success",
        })
      );
    })
    .catch((error) => {
      dispatch(fetchFailure(error.message));
    });
};

export const confirmedDeleteToTodo = (todoId, todoTitle) => (dispatch) => {
  axios
    .delete(`http://localhost:8000/api/v1/todos/${todoId}/`)
    .then((response) => {
      dispatch(deleteTodo(todoId));
      dispatch(
        notify({
          open: true,
          message: `${todoTitle} deleted`,
          type: "info",
        })
      );
    })
    .catch((error) => {
      dispatch(fetchFailure(error.message));
    });
};
