import type { FC } from "react";
import { NavLink } from "react-router-dom";

const Sidebar: FC = () => {
  const navItems = [
    { path: "/projectpulse/dashboard", label: "Dashboard" },
    { path: "projectpulse/projects", label: "Projects" },
  ];

  return (
    <div className="w-[280px] bg-black shadow-2xl flex-col h-screen text-white rounded">
      <ul className="flex flex-col">
        {navItems.map((items) => (
          <NavLink
            to={items.path}
            key={items.label}
            className={({ isActive }) =>
              `px-4 py-3 block ${
                isActive
                  ? "bg-[#af74d7] rounded text-white font-semibold"
                  : "text-[#ccc] hover:text-white hover:bg-[#1a1a1a]"
              }`
            }
          >
            <span>{items.label}</span>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
