import { Calendar, Home, Kanban, Settings, Users } from "lucide-react";
import type { FC } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

const Sidebar: FC = () => {
  const navItems = [
    { path: "/projectpulse/dashboard", label: "Dashboard", icon: Home },
    { path: "/projectpulse/teams", label: "Team Management", icon: Users },
    { path: "/projectpulse/projects", label: "Projects", icon: Kanban },
    { path: "/projectpulse/calendar", label: "Calendar", icon: Calendar },
    { path: "/projectpulse/settings", label: "Settings", icon: Settings },
  ];

  // bg-[#141217]
  // text-white
  const { theme } = useTheme();

  return (
    <div
      className={`${
        theme === "light"
          ? "shadow-lg"
          : "shadow-[0_0_30px_5px_rgba(255,255,255,0.05)]"
      } flex-col h-full rounded-r-lg rounded  px-2 py-2 `}
    >
      <ul className="flex flex-col">
        {navItems.map((items) => (
          <NavLink
            to={items.path}
            key={items.label}
            className={({ isActive }) =>
              `px-4 py-3 block ${
                isActive
                  ? "bg-[#af74d7] rounded-xl text-white font-semibold"
                  : ` hover:mb-4 hover:rounded-xl ${
                      theme === "dark"
                        ? "hover:bg-[#1a1a1a] hover:text-white "
                        : "hover:bg-[#d9d7d7] hover:text-black"
                    }`
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
