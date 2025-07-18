import type { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isEmail, hasMinLength } from "../utils/validation";

const Login: FC = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!isEmail(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (!hasMinLength(password, 6)) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.name);

      toast.success("Login Successful");

      setTimeout(() => {
        navigate("/board");
      }, 2000);
    } else {
      toast.error(data.message);
    }
  };
  return (
    <>
      <div className="bg-black h-screen flex justify-center items-center">
        <div className="bg-[#121212] w-100 h-130 flex flex-col items-center px-4 py-3 rounded-xl shadow-2xl">
          <h1 className="text-white text-2xl font-bold">Login</h1>
          <p className="text-[#ccc] text-center mt-4">
            Enter your credentails to access your account.
          </p>

          <form className="text-white mt-8" onSubmit={loginHandler}>
            <div className="flex flex-col gap-2 mb-6">
              <label>Email</label>
              <input
                className="bg-black px-4 py-2  focus:outline-none active:outline-none border-b-gray-700 h-11 w-80 rounded"
                type="email"
                required
                placeholder="JohnDoe@gmail.com"
                name="email"
              />
            </div>

            <div className="flex flex-col gap-2 mb-6">
              <label>Password</label>
              <input
                className="bg-black px-4 py-2  focus:outline-none active:outline-none border-b-gray-700 h-11 w-80 rounded"
                type="password"
                required
                placeholder="Enter Password"
                name="password"
              />
            </div>

            <button
              className="bg-[#af74d7] w-80 h-10 px-4 py-2 rounded cursor-pointer mt-4 mb-6 hover:bg-[#944fc5]"
              onClick={() => navigate("/board")}
            >
              Login
            </button>
          </form>

          <div className="text-[#ccc] mt-4">
            Don't have an account?
            <Link to="/signup" style={{ color: "#af74d7" }}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
