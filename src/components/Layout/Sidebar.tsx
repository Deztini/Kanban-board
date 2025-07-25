import { Home, Kanban } from "lucide-react";
import type { FC } from "react";
import { NavLink } from "react-router-dom";

const Sidebar: FC = () => {
  const navItems = [
    { path: "/projectpulse/dashboard", label: "Dashboard", icon: Home },
    { path: "/projectpulse/projects", label: "Projects", icon: Kanban },
  ];

  return (
    <div className="bg-[#141217]  shadow-[0_0_30px_5px_rgba(255,255,255,0.05)] flex-col h-full rounded-r-lg rounded text-white  px-2 py-2 ">
      <ul className="flex flex-col">
        {navItems.map((items) => (
          <NavLink
            to={items.path}
            key={items.label}
            className={({ isActive }) =>
              `px-4 py-3 block ${
                isActive
                  ? "bg-[#af74d7] rounded-xl text-white font-semibold"
                  : "text-[#ccc] hover:text-white hover:bg-[#1a1a1a] hover:mb-4"
              }`
            }
          >
            <div className="flex gap-2">
              <span>{<items.icon />}</span>
              <span>{items.label}</span>
            </div>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
