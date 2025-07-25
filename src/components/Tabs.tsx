import { type FC } from "react";
import type { tabProps } from "../types/types";

const Tabs: FC<tabProps> = ({ tabName, onSelect, selectedType }) => {
//   console.log("tab name: ", tabName, "selected type: ", selectedType);
  return (
    <div>
      <button
        className={`bg-[#121212] border-2 border-solid border-[#3E3A45] rounded-[8px] h-10 w-auto px-4 py-2 text-white cursor-pointer  ${
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
