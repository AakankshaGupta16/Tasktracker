import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signupUser } from "../services/authService";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "MEMBER",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {

    try {

      await signupUser(formData);

      alert("Signup successful!");

      navigate("/");

    } catch (error) {

      console.error(error);

      alert("Signup failed!");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#f5ebf1] px-4">

      <div className="bg-white/60 backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-[400px] border border-white/30">

        <h1 className="text-5xl font-bold text-center text-[#f545a9] mb-2">
          TaskTracker
        </h1>

        <p className="text-center text-gray-600 mb-8 text-lg">
          Create your account
        </p>

        <div className="flex flex-col gap-5">

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-white/70 outline-none focus:ring-2 focus:ring-pink-400 transition-all"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-white/70 outline-none focus:ring-2 focus:ring-pink-400 transition-all"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-white/70 outline-none focus:ring-2 focus:ring-pink-400 transition-all"
          />

          {/* ROLE SELECT */}

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-white/70 outline-none focus:ring-2 focus:ring-pink-400 transition-all"
          >

            <option value="MEMBER">
              MEMBER
            </option>

            <option value="ADMIN">
              ADMIN
            </option>

          </select>

          <button
            onClick={handleSignup}
            className="w-full bg-[#f545a9] hover:bg-pink-600 transition-all duration-300 text-white font-semibold p-4 rounded-2xl shadow-lg hover:scale-[1.02]"
          >
            Signup
          </button>

          <p className="text-center text-gray-600 mt-2">

            Already have an account?{" "}

            <Link
              to="/"
              className="text-[#f545a9] font-semibold hover:underline"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;