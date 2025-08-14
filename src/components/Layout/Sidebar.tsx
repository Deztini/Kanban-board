import {
  Calendar,
  Home,
  Kanban,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
} from "lucide-react";
import { useState, type FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";



const Sidebar: FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [buttonStatus, setButtonStatus] = useState("");
  const navItems = [
    { path: "/projectpulse/dashboard", label: "Dashboard", icon: Home },
    { path: "/projectpulse/teams", label: "Team Management", icon: Users },
    { path: "/projectpulse/projects", label: "Projects", icon: Kanban },
    { path: "/projectpulse/calendar", label: "Calendar", icon: Calendar },
    { path: "/projectpulse/settings", label: "Settings", icon: Settings },
  ];

  const { theme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("companyName");
    localStorage.removeItem("jobTitle");
    localStorage.removeItem("email");
    localStorage.removeItem("userName");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
    setButtonStatus("menu");
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setButtonStatus("");
  };

  return (
    <>
      {isSidebarOpen === false && buttonStatus === "" &&(
        <div className="menu-button">
          <button onClick={openSidebar}>
            <Menu />
          </button>
        </div>
      )}
      {isSidebarOpen && (
        <div className="close-button">
          <button onClick={closeSidebar}>
            <X />
          </button>
        </div>
      )}
      <div
        className={`sidebar-container ${
          theme === "light" ? "sidebar-light" : "sidebar-dark"
        } ${isSidebarOpen ? "show " : ""}`}
      >
        <ul className="flex flex-col">
          {navItems.map((items) => (
            <NavLink
              to={items.path}
              key={items.label}
              className={({ isActive }) =>
                `px-4 py-3 block ${
                  isActive
                    ? "bg-[#af74d7] rounded-xl  font-semibold"
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
          <button
            className="flex items-center gap-2 mt-4  hover:bg-purple-400 cursor-pointer rounded-[7px] px-2 py-2 w-50 ml-2"
            onClick={handleLogout}
          >
            <LogOut />
            <span>Logout</span>
          </button>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
