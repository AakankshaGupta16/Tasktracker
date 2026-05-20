import axios from "axios";

const API = "http://localhost:8080/tasks/dashboard";

export const getDashboardData = async () => {

  const response = await axios.get(API);

  return response.data;
};