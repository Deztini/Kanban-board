import type { FC } from "react";
import Sidebar from "../components/Layout/Sidebar";
import logo from "../assets/projectpulselogo.png";
import { Outlet } from "react-router-dom";

const RootLayout: FC = () => {
  return (
    <div className="flex bg-black min-h-screen">
      <div className=" w-[300px] flex-1/6">
        <Sidebar />
      </div>

      <main className="flex-1 flex flex-col px-6 py-4">
        <header className="w-full mb-1">
          <img className="w-30 h-auto" src={logo} alt="" />
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

// flex-1 gap-8
