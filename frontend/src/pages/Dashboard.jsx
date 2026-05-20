import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getDashboardData } from "../services/dashboardService";

function Dashboard() {

  const [stats, setStats] = useState({
    totalTasks: 0,
    todoTasks: 0,
    inProgressTasks: 0,
    doneTasks: 0,
    overdueTasks: 0,
  });

  // GET LOGGED IN USER
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    async function fetchDashboard() {

      try {

        const data = await getDashboardData();

        console.log(data);

        setStats(data);

      } catch (error) {

        console.error(error);

        alert("Failed to load dashboard!");
      }
    }

    fetchDashboard();

  }, []);

  return (

    <div className="min-h-screen bg-[#f5ebf1] flex">

      <Sidebar />

      <div className="flex-1 p-8">

        <div className="bg-white/50 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/30 mb-8">

          <h1 className="text-5xl font-bold text-[#f545a9] mb-3">
            Welcome Back
          </h1>

          <p className="text-2xl text-gray-700 mb-2">
            {user?.name}
          </p>

          <p className="text-lg text-gray-500 mb-2">
            {user?.email}
          </p>

          <p className="text-gray-500 text-lg">
            Manage your projects and tasks efficiently.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

          <div className="bg-white/50 rounded-3xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-[#f545a9] mb-2">
              Total Tasks
            </h2>

            <p className="text-5xl font-bold text-gray-700">
              {stats.totalTasks}
            </p>
          </div>

          <div className="bg-white/50 rounded-3xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-yellow-500 mb-2">
              Todo
            </h2>

            <p className="text-5xl font-bold text-gray-700">
              {stats.todoTasks}
            </p>
          </div>

          <div className="bg-white/50 rounded-3xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-blue-500 mb-2">
              In Progress
            </h2>

            <p className="text-5xl font-bold text-gray-700">
              {stats.inProgressTasks}
            </p>
          </div>

          <div className="bg-white/50 rounded-3xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-green-500 mb-2">
              Done
            </h2>

            <p className="text-5xl font-bold text-gray-700">
              {stats.doneTasks}
            </p>
          </div>

          <div className="bg-white/50 rounded-3xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-red-500 mb-2">
              Overdue
            </h2>

            <p className="text-5xl font-bold text-gray-700">
              {stats.overdueTasks}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;