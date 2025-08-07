import { type FC } from "react";
import type { tabProps } from "../types/types";
import { useTheme } from "../hooks/useTheme";

const Tabs: FC<tabProps> = ({ tabName, onSelect, selectedType }) => {
  const { theme } = useTheme();
  return (
    <div>
      <button
        className={`${
          theme === "dark"
            ? "border-1 border-solid border-[#3E3A45]"
            : "border-1 border-solid border-[#ccc] "
        } rounded-[8px] h-10 w-auto px-4 py-2  cursor-pointer  ${
          selectedType === tabName ? "bg-purple-500" : ""
        }`}
        onClick={onSelect}
      >
        {tabName}
      </button>
    </div>
  );
};

export default Tabs;
