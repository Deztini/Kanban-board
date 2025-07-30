import type { FC } from "react";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  isNotEmpty,
  isEmail,
  isEqual,
  hasMinLength,
} from "../utils/validation";

const Signup: FC = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const signupHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("fullName");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (!isNotEmpty(name)) {
      toast.error("Name is required");
      return;
    }

    if (!isEmail(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (!hasMinLength(password, 6)) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (!isEqual(password, confirmPassword)) {
      toast.error("Passwords do not match");
      return;
    }

    const response = await fetch(`${apiUrl}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setIsLoading(false);

      toast.success("Signup Successful");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      setIsLoading(false);
      toast.error(data.message);
      console.log(data.message);
    }
  };
  return (
    <>
      <ToastContainer position="top-center" />
      <div className="bg-black h-screen flex justify-center items-center">
        <div className="bg-[#121212]  border-1 border-solid border-[#3E3A45] w-100 h-150 flex flex-col items-center p-4 rounded-xl shadow-2xl">
          <h1 className="text-white text-2xl font-bold">Project Pulse</h1>
          <h2 className="text-white text-2xl font-bold">Create your account</h2>
          <p className="text-[#ccc] text-center">
            Start organizing your work visually with Project Pulse.
          </p>

          <form className="text-white mt-4" onSubmit={signupHandler}>
            <div className="flex flex-col gap-2 mb-2">
              <label>Full Name</label>
              <input
                className="bg-black px-4 py-2 focus:outline-none active:outline-none border-b-gray-700 h-11 w-80 rounded"
                type="text"
                required
                placeholder="John Doe"
                name="fullName"
              />
            </div>

            <div className="flex flex-col gap-2 mb-2">
              <label>Email</label>
              <input
                className="bg-black px-4 py-2  focus:outline-none active:outline-none border-b-gray-700 h-11 rounded"
                type="email"
                required
                placeholder="JohnDoe@gmail.com"
                name="email"
              />
            </div>

            <div className="flex flex-col gap-2 mb-2">
              <label>Password</label>
              <input
                className="bg-black px-4 py-2  focus:outline-none active:outline-none border-b-gray-700 h-11 rounded"
                type="password"
                required
                placeholder="Enter Password"
                name="password"
              />
            </div>

            <div className="flex flex-col gap-2 mb-2">
              <label>Confirm Password</label>
              <input
                className="bg-black px-4 py-2  focus:outline-none active:outline-none border-b-gray-700 h-11 rounded"
                type="password"
                required
                placeholder="Confirm Your Password"
                name="confirmPassword"
              />
            </div>

            <button
              className={`bg-[#af74d7] w-80 h-10 px-4 py-2 rounded cursor-pointer mt-4 mb-1 hover:bg-[#944fc5] ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign Up"}
            </button>
          </form>

          <div className="text-[#ccc] mt-4">
            Already have an account?
            <Link to="/login" style={{ color: "#af74d7" }}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
