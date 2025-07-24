import type { FC } from "react";
import Sidebar from "../components/Layout/Sidebar";
import { Outlet } from "react-router-dom";

const RootLayout: FC = () => {
  return (
    <div className="flex bg-black flex-1">
      <div className="flex-1/2">
        <Sidebar />
      </div>

      <main className="flex-3/2">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
