import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {

    try {

      const data = await loginUser(loginData);

      console.log(data);

      localStorage.setItem("userEmail", loginData.email);

      alert("Login successful!");

      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      alert("Invalid credentials!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5ebf1] px-4">

      <div className="w-[400px] p-10 rounded-3xl backdrop-blur-lg bg-white/50 shadow-2xl border border-white/30">

        <h1 className="text-5xl font-bold text-center text-[#f545a9] mb-2">
          TaskTracker
        </h1>

        <p className="text-center text-gray-600 mb-8 text-lg">
          Welcome back
        </p>

        <div className="flex flex-col gap-5">

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={loginData.email}
            onChange={handleChange}
            className="p-4 rounded-2xl outline-none bg-white/70 focus:ring-2 focus:ring-pink-400 transition-all"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={handleChange}
            className="p-4 rounded-2xl outline-none bg-white/70 focus:ring-2 focus:ring-pink-400 transition-all"
          />

          <button
            onClick={handleLogin}
            className="bg-[#f545a9] text-white p-4 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg"
          >
            Login
          </button>

          <p className="text-center text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-[#f545a9] font-semibold hover:underline"
            >
              Signup
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;