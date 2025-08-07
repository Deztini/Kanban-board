import type { FC } from "react";
import { useTheme } from "../hooks/useTheme";

const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleTheme}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:bg-purple-500 transition-colors"></div>
        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
      </label>
    </div>
  );
};

export default ThemeToggle;
