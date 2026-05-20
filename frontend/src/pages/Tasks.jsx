import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import * as TaskService from "../services/taskService";
import { Trash2 } from "lucide-react";

function Tasks() {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // LOGGED IN USER
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    async function fetchTasks() {

      try {

        const data = await TaskService.getAllTasks();

        console.log(data);

        setTasks(data);

      } catch (error) {

        console.error(error);

        alert("Failed to fetch tasks!");

      } finally {

        setLoading(false);
      }
    }

    fetchTasks();

  }, []);

  // UPDATE STATUS
  const handleStatusChange = async (
    taskId,
    status
  ) => {

    try {

      await TaskService.updateTaskStatus(
        taskId,
        status
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? { ...task, status }
            : task
        )
      );

    } catch (error) {

      console.error(error);

      alert("Failed to update task status!");
    }
  };

  // DELETE TASK
  const handleDeleteTask = async (
    taskId
  ) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {

      await TaskService.deleteTask(taskId);

      setTasks((prevTasks) =>
        prevTasks.filter(
          (task) => task.id !== taskId
        )
      );

      alert("Task deleted successfully!");

    } catch (error) {

      console.error(error);

      alert("Failed to delete task!");
    }
  };

  return (

    <div className="min-h-screen bg-[#f5ebf1] flex">

      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-5xl font-bold text-[#f545a9] mb-8">
          All Tasks
        </h1>

        {

          loading ? (

            <p className="text-xl text-gray-500">
              Loading Tasks...
            </p>

          ) : tasks.length === 0 ? (

            <p className="text-xl text-gray-500">
              No Tasks Found
            </p>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {tasks.map((task) => (

                <div
                  key={task.id}
                  className="bg-white/50 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/30"
                >

                  <div className="flex items-start justify-between mb-3">

                    <h2 className="text-3xl font-bold text-[#f545a9]">
                      {task.title}
                    </h2>

                    {/* ONLY ADMIN CAN DELETE */}
                    {user.role === "ADMIN" && (

                      <button
                        onClick={() =>
                          handleDeleteTask(task.id)
                        }
                        className="text-red-500 hover:bg-red-100 p-2 rounded-xl transition-all"
                      >
                        <Trash2 size={22} />
                      </button>

                    )}

                  </div>

                  <p className="text-gray-700 text-lg mb-4">
                    {task.description}
                  </p>

                  {/* STATUS */}

                  <div className="mb-4">

                    <p className="text-gray-500 mb-2">
                      Status
                    </p>

                    <select
                      value={task.status}

                      onChange={(e) =>
                        handleStatusChange(
                          task.id,
                          e.target.value
                        )
                      }

                      disabled={
                        user.role !== "ADMIN" &&
                        task.assignedUser?.id !== user.id
                      }

                      className={`p-3 rounded-2xl border outline-none font-semibold ${
                        task.status === "DONE"
                          ? "text-green-500 border-green-300"
                          : task.status === "IN_PROGRESS"
                          ? "text-blue-500 border-blue-300"
                          : "text-yellow-500 border-yellow-300"
                      } ${
                        user.role !== "ADMIN" &&
                        task.assignedUser?.id !== user.id
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >

                      <option value="TODO">
                        TODO
                      </option>

                      <option value="IN_PROGRESS">
                        IN PROGRESS
                      </option>

                      <option value="DONE">
                        DONE
                      </option>

                    </select>

                  </div>

                  {/* PRIORITY */}

                  <p
                    className={`font-semibold mb-2 ${
                      task.priority === "HIGH"
                        ? "text-red-500"
                        : task.priority === "MEDIUM"
                        ? "text-orange-500"
                        : "text-green-500"
                    }`}
                  >
                    Priority: {task.priority}
                  </p>

                  {/* DUE DATE */}

                  <p className="text-gray-500 mb-2">
                    Due Date: {
                      new Date(task.dueDate)
                        .toLocaleDateString()
                    }
                  </p>

                  {/* PROJECT */}

                  <p className="text-gray-500 mb-2">
                    Project: {task.project?.name}
                  </p>

                  {/* ASSIGNED USER */}

                  <p className="text-gray-500">
                    Assigned To: {task.assignedUser?.name}
                  </p>

                </div>

              ))}

            </div>

          )
        }

      </div>

    </div>
  );
}

export default Tasks;