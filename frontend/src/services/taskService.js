import axios from "axios";

const API = "http://localhost:8080/tasks";

export const getAllTasks = async () => {

  const response = await axios.get(API);

  return response.data;
};

export const createTask = async (taskData) => {

  const response = await axios.post(
    API,
    taskData
  );

  return response.data;
};

export const updateTaskStatus = async (
  taskId,
  status
) => {

  const response = await axios.put(
    `${API}/${taskId}/status`,
    { status }
  );

  return response.data;
};

export const deleteTask = async (
  taskId
) => {

  const response = await axios.delete(
    `${API}/${taskId}`
  );

  return response.data;
};