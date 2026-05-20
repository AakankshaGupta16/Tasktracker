import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  LogOut,
  PlusCircle,
  ListTodo,
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

function Sidebar() {

  const location = useLocation();

  const navigate = useNavigate();

  // GET LOGGED IN USER
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/");
  };

  // ACTIVE MENU STYLING
  const menuClass = (path) =>
    `flex items-center gap-3 p-4 rounded-2xl font-medium transition-all duration-300 ${
      location.pathname === path
        ? "bg-[#f545a9] text-white shadow-md"
        : "hover:bg-white/60 text-gray-700"
    }`;

  return (

    <div className="w-[260px] h-screen bg-white/40 backdrop-blur-lg border-r border-white/30 shadow-xl p-6 flex flex-col">

      {/* USER INFO */}

      <div className="mb-10">

        <h1 className="text-3xl font-bold text-[#f545a9]">
          TaskTracker
        </h1>

        <p className="text-gray-600 mt-3 font-semibold">
          {user?.name}
        </p>

        <p className="text-gray-500 text-sm">
          {user?.email}
        </p>

        <span className="inline-block mt-3 px-3 py-1 rounded-full bg-pink-100 text-[#f545a9] text-xs font-bold">
          {user?.role}
        </span>

      </div>

      {/* NAVIGATION */}

      <div className="flex flex-col gap-4">

        <Link
          to="/dashboard"
          className={menuClass("/dashboard")}
        >
          <LayoutDashboard size={22} />
          Dashboard
        </Link>

        <Link
          to="/projects"
          className={menuClass("/projects")}
        >
          <FolderKanban size={22} />
          Projects
        </Link>

        <Link
          to="/tasks"
          className={menuClass("/tasks")}
        >
          <CheckSquare size={22} />
          Tasks
        </Link>

        {/* ADMIN ONLY */}

        {user?.role === "ADMIN" && (

          <>
            <Link
              to="/create-project"
              className={menuClass("/create-project")}
            >
              <PlusCircle size={22} />
              Create Project
            </Link>

            <Link
              to="/create-task"
              className={menuClass("/create-task")}
            >
              <ListTodo size={22} />
              Create Task
            </Link>
          </>

        )}

      </div>

      {/* LOGOUT */}

      <div className="mt-auto">

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-4 rounded-2xl hover:bg-red-100 transition-all text-red-500 font-medium w-full"
        >
          <LogOut size={22} />
          Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;