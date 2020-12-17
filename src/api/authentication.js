import axiosInstance, { setNewHeaders } from "./axiosInstance";

export async function signUp(email, username, password) {
  const response = await axiosInstance.post("auth/users/register/", {
    email,
    username,
    password,
  });
  localStorage.setItem("user", response.data);
  return response;
}

export async function obtainToken(username, password) {
  const response = await axiosInstance.post("auth/token/obtain/", {
    username,
    password,
  });
  setNewHeaders(response);
  return response;
}

export async function refreshToken(refresh) {
  const response = await axiosInstance.post("auth/token/refresh/", {
    refresh,
  });
  setNewHeaders(response);
  return response;
}

export async function logout(accessToken) {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export const isAuthenticated = () => {
  const token = localStorage.getItem("access_token");
  return !!token;
};
