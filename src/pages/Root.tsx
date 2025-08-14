import type { FC } from "react";
import Sidebar from "../components/Layout/Sidebar";
import logo from "../assets/projectpulselogo.png";
import { Outlet, useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

const RootLayout: FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  return (
    <div className="flex  min-h-screen">
      <div
        className={`${
          theme === "dark" ? "bg-[#121212]" : ""
        } root`}
      >
        <Sidebar />
      </div>

      <main className="flex-1 flex flex-col px-6 py-4">
        <header
          className="w-full mb-0 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img className="w-25 h-auto" src={logo} alt="" />
        </header>

        <div className="flex-1">
          <Outlet />
        </div>
        <footer className="text-white text-center mt-24">
          &copy; 2025 Project Pulse
        </footer>
      </main>
    </div>
  );
};

export default RootLayout;

