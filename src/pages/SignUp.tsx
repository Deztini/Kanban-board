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
import { useTheme } from "../hooks/useTheme";

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
    const companyName = formData.get("companyName");
    const jobTitle = formData.get("jobTitle");

    if (!isNotEmpty(name)) {
      toast.error("Name is required");
      return;
    }

    if (!isEmail(email) && !isNotEmpty(email)) {
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

    if (!isNotEmpty(companyName)) {
      toast.error("Company Name is required");
      return;
    }

    if (!isNotEmpty(jobTitle)) {
      toast.error("Job Title is required");
      return;
    }

    const response = await fetch(`${apiUrl}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, companyName, jobTitle }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("companyName", data.user.companyName);
      localStorage.setItem("jobTitle", data.user.jobTitle);
      localStorage.setItem("email", data.user.email);
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
  const { theme } = useTheme();
  return (
    <>
      <ToastContainer position="top-center" />
      <div className="h-screen flex justify-center items-center">
        <div
          className={`${
            theme === "dark"
              ? "md:bg-[#121212]  md:border-1 border-solid border-[#3E3A45]"
              : "md:bg-[#fff]  md:border-1 border-solid border-[#ccc]"
          }  w-100 h-150 overflow-y-auto flex flex-col items-center p-4 rounded-xl md:shadow-2xl`}
        >
          <h1 className="text-2xl font-bold">Project Pulse</h1>
          <h2 className="text-2xl font-bold">Create your account</h2>
          <p className="text-center">
            Start organizing your work visually with Project Pulse.
          </p>

          <form className="text-white mt-4" onSubmit={signupHandler}>
            <div className="flex flex-col gap-2 mb-2">
              <label>Full Name</label>
              <input
                className={`${
                  theme === "dark"
                    ? "bg-[#121212] text-white border border-[#3E3A45]"
                    : "bg-white text-black border border-[#ccc]"
                } px-4 py-2  focus:outline-none active:outline-none  h-11 w-80 rounded-[5px]`}
                type="text"
                required
                placeholder="John Doe"
                name="fullName"
              />
            </div>

            <div className="flex flex-col gap-2 mb-2">
              <label>Email</label>
              <input
                className={`${
                  theme === "dark"
                    ? "bg-[#121212] text-white border border-[#3E3A45]"
                    : "bg-white text-black border border-[#ccc]"
                } px-4 py-2  focus:outline-none active:outline-none  h-11 w-80 rounded-[5px]`}
                type="email"
                required
                placeholder="JohnDoe@gmail.com"
                name="email"
              />
            </div>

            <div className="flex flex-col gap-2 mb-2">
              <label>Password</label>
              <input
                className={`${
                  theme === "dark"
                    ? "bg-[#121212] text-white border border-[#3E3A45]"
                    : "bg-white text-black border border-[#ccc]"
                } px-4 py-2  focus:outline-none active:outline-none  h-11 w-80 rounded-[5px]`}
                type="password"
                required
                placeholder="Enter Password"
                name="password"
              />
            </div>

            <div className="flex flex-col gap-2 mb-2">
              <label>Confirm Password</label>
              <input
               className={`${
                  theme === "dark"
                    ? "bg-[#121212] text-white border border-[#3E3A45]"
                    : "bg-white text-black border border-[#ccc]"
                } px-4 py-2  focus:outline-none active:outline-none  h-11 w-80 rounded-[5px]`}
                type="password"
                required
                placeholder="Confirm Your Password"
                name="confirmPassword"
              />
            </div>

            <div className="flex flex-col gap-2 mb-2">
              <label>Company Name</label>
              <input
                className={`${
                  theme === "dark"
                    ? "bg-[#121212] text-white border border-[#3E3A45]"
                    : "bg-white text-black border border-[#ccc]"
                } px-4 py-2  focus:outline-none active:outline-none  h-11 w-80 rounded-[5px]`}
                type="text"
                required
                placeholder=""
                name="companyName"
              />
            </div>

            <div className="flex flex-col gap-2 mb-2">
              <label>Job Title</label>
              <input
               className={`${
                  theme === "dark"
                    ? "bg-[#121212] text-white border border-[#3E3A45]"
                    : "bg-white text-black border border-[#ccc]"
                } px-4 py-2  focus:outline-none active:outline-none  h-11 w-80 rounded-[5px]`}
                type="text"
                required
                placeholder=""
                name="jobTitle"
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

          <div className="mt-4">
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
