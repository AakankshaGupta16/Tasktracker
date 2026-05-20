import axios from "axios";

const BASE_URL = "http://localhost:8080/auth";

export const signupUser = async (userData) => {

  const response = await axios.post(
    `${BASE_URL}/signup`,
    userData
  );

  return response.data;
};

export const loginUser = async (loginData) => {

  const response = await axios.post(
    `${BASE_URL}/login`,
    loginData
  );

  // Save logged-in user
  localStorage.setItem(
    "user",
    JSON.stringify(response.data)
  );

  return response.data;
};

export const logoutUser = () => {

  localStorage.removeItem("user");
};

export const getCurrentUser = () => {

  return JSON.parse(
    localStorage.getItem("user")
  );
};

export const isLoggedIn = () => {

  return !!localStorage.getItem("user");
};