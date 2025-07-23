import type { FC } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const RootLayout: FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
