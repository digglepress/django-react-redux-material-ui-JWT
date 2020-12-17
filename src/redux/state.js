const state = {
  todos: {
    todos: [],
    loading: false,
    loaded: false,
    error: null,
  },
  form: {
    open: false,
  },
  submitButton: {
    loading: false,
    success: false,
  },
  notification: {
    open: false,
    message: null,
    type: null,
  },
  auth: {
    accessToken: localStorage.getItem("access_token"),
  },
};
export default state;
