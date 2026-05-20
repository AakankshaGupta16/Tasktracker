import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

function CreateTask() {

  const [projects, setProjects] = useState([]);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "MEDIUM",
    assignedUserId: "",
    projectId: "",
  });

  useEffect(() => {

    async function fetchProjects() {

      try {

        const response = await axios.get(
          "http://localhost:8080/projects"
        );

        if (Array.isArray(response.data)) {

          setProjects(response.data);

        } else if (
          response.data &&
          Array.isArray(response.data.projects)
        ) {

          setProjects(response.data.projects);

        } else {

          setProjects([]);
        }

      } catch (error) {

        console.error("Failed to load projects:", error);

        alert("Failed to fetch projects!");
      }
    }

    fetchProjects();

  }, []);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setTaskData({
      ...taskData,

      [name]:
        (name === "projectId" ||
          name === "assignedUserId") &&
        value !== ""
          ? Number(value)
          : value,
    });
  };

  const handleCreateTask = async (e) => {

    e.preventDefault();

    if (
      !taskData.title.trim() ||
      !taskData.description.trim() ||
      taskData.assignedUserId === "" ||
      taskData.projectId === ""
    ) {

      alert("Please fill all required fields!");

      return;
    }

    try {

      await axios.post(
        "http://localhost:8080/tasks",
        taskData
      );

      alert("Task created successfully!");

      setTaskData({
        title: "",
        description: "",
        dueDate: "",
        priority: "MEDIUM",
        assignedUserId: "",
        projectId: "",
      });

    } catch (error) {

      console.error(
        "Task creation error:",
        error.response?.data || error.message
      );

      alert("Failed to create task!");
    }
  };

  return (

    <div className="min-h-screen bg-[#f5ebf1] flex">

      <Sidebar />

      <div className="flex-1 p-8">

        <div className="bg-white/50 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/30 max-w-3xl mx-auto">

          <h1 className="text-5xl font-bold text-[#f545a9] mb-8">
            Create Task
          </h1>

          <form
            onSubmit={handleCreateTask}
            className="flex flex-col gap-6"
          >

            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={taskData.title}
              onChange={handleChange}
              className="p-4 rounded-2xl outline-none bg-white/70 focus:ring-2 focus:ring-pink-400"
            />

            <textarea
              name="description"
              placeholder="Task Description"
              value={taskData.description}
              onChange={handleChange}
              rows="5"
              className="p-4 rounded-2xl outline-none bg-white/70 focus:ring-2 focus:ring-pink-400 resize-none"
            />

            <input
              type="date"
              name="dueDate"
              value={taskData.dueDate}
              onChange={handleChange}
              className="p-4 rounded-2xl outline-none bg-white/70 focus:ring-2 focus:ring-pink-400"
            />

            <select
              name="priority"
              value={taskData.priority}
              onChange={handleChange}
              className="p-4 rounded-2xl outline-none bg-white/70 focus:ring-2 focus:ring-pink-400"
            >

              <option value="LOW">
                LOW
              </option>

              <option value="MEDIUM">
                MEDIUM
              </option>

              <option value="HIGH">
                HIGH
              </option>

            </select>

            <select
              name="assignedUserId"
              value={taskData.assignedUserId}
              onChange={handleChange}
              className="p-4 rounded-2xl outline-none bg-white/70 focus:ring-2 focus:ring-pink-400"
            >

              <option value="">
                Select User
              </option>

              <option value="1">
                Aakanksha
              </option>

            </select>

            <select
              name="projectId"
              value={taskData.projectId}
              onChange={handleChange}
              className="p-4 rounded-2xl outline-none bg-white/70 focus:ring-2 focus:ring-pink-400"
            >

              <option value="">
                Select Project
              </option>

              {projects.map((project) => (

                <option
                  key={project.id}
                  value={project.id}
                >
                  {project.name}
                </option>

              ))}

            </select>

            <button
              type="submit"
              className="bg-[#f545a9] text-white p-4 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg"
            >
              Create Task
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default CreateTask;