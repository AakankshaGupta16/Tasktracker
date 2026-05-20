import axios from "axios";

const API = "http://localhost:8080/projects";

async function createProject(projectData) {

  const response = await axios.post(API, projectData);

  return response.data;
}

async function getAllProjects() {

  const response = await axios.get(API);

  return response.data;
}

export { createProject, getAllProjects };