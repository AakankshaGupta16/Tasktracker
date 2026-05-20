import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import * as ProjectService from "../services/ProjectService";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Moving the function inside eliminates the ESLint error safely
    async function fetchProjects() {
      try {
        const data = await ProjectService.getAllProjects();
        console.log("API Response:", data);

        // 2. Safety check: ensure 'data' is actually an array before saving it
        if (Array.isArray(data)) {
          setProjects(data);
        } else if (data && Array.isArray(data.projects)) {
          // Fallback if your backend wraps the array in an object key like .projects
          setProjects(data.projects);
        } else {
          console.error("Backend did not return an array:", data);
          setProjects([]); 
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        alert("Failed to fetch projects!");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []); // No more dependency tracking warnings

  return (
    <div className="min-h-screen bg-[#f5ebf1] flex">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-5xl font-bold text-[#f545a9] mb-8">
          All Projects
        </h1>

        {loading ? (
          <p className="text-xl text-gray-500">Loading Projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-xl text-gray-500">No Projects Found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id || project._id} // Fallback check for DB IDs
                className="bg-white/50 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/30 hover:scale-[1.02] transition-all duration-300"
              >
                <h2 className="text-3xl font-bold text-[#f545a9] mb-3">
                  {project.name}
                </h2>
                <p className="text-gray-700 text-lg mb-4">
                  {project.description}
                </p>
                <p className="text-gray-500">
                  Admin: {project.admin?.name || "Unknown"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;