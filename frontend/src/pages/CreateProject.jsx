import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { createProject } from "../services/projectService";

function CreateProject() {

  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    adminId: 1,
  });

  const handleChange = (e) => {

    setProjectData({
      ...projectData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateProject = async (e) => {

    e.preventDefault();

    try {

      // validation
      if (
        projectData.name.trim() === "" ||
        projectData.description.trim() === ""
      ) {

        alert("Please fill all fields!");
        return;
      }

      const response = await createProject(projectData);

      console.log("Project Created:", response);

      alert("Project created successfully!");

      // reset form
      setProjectData({
        name: "",
        description: "",
        adminId: 1,
      });

    } catch (error) {

      console.error("Error creating project:", error);

      alert("Failed to create project!");
    }
  };

  return (

    <div className="min-h-screen bg-[#f5ebf1] flex">

      <Sidebar />

      <div className="flex-1 p-8">

        <div className="bg-white/50 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/30 max-w-3xl mx-auto">

          <h1 className="text-5xl font-bold text-[#f545a9] mb-8">
            Create Project
          </h1>

          <form
            onSubmit={handleCreateProject}
            className="flex flex-col gap-6"
          >

            <input
              type="text"
              name="name"
              placeholder="Project Name"
              value={projectData.name}
              onChange={handleChange}
              className="p-4 rounded-2xl outline-none bg-white/70 focus:ring-2 focus:ring-pink-400"
            />

            <textarea
              name="description"
              placeholder="Project Description"
              value={projectData.description}
              onChange={handleChange}
              rows="6"
              className="p-4 rounded-2xl outline-none bg-white/70 focus:ring-2 focus:ring-pink-400 resize-none"
            />

            <button
              type="submit"
              className="bg-[#f545a9] text-white p-4 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg"
            >
              Create Project
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default CreateProject;