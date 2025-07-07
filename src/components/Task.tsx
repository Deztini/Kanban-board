import type { FC } from "react";
import type { taskProps } from "../types/types";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { useState } from "react";

// type TaskProps = {
//   title: string;
//   description: string;
//   date: string;
//   priority: string;
// };

const Task: FC<taskProps> = ({ id, title, description, date, priority }) => {
  const [isClicked, setIsClicked] = useState<boolean>();

  function toggleOverlay() {
    setIsClicked((prev) => !prev);
  }
  return (
    <>
      <div className="bg-black w-90 h-60 py-4 px-6 rounded-xl relative">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold mb-2">{title}</h1>
          <button className="text-white cursor-pointer" onClick={toggleOverlay}>
            <Ellipsis />
          </button>
        </div>

        <div className="flex justify-between">
          <p className="text-[#ccc] font-bold mb-6">{description}</p>
          {isClicked && (
            <div className="bg-[#121212] h-28 w-35 flex flex-col gap-1 z-10 absolute top-13 right-5 rounded-xl px-3 py-3">
              <button className="text-white cursor-pointer flex items-center gap-2 hover:bg-black py-2 px-2 rounded-xl">
                {" "}
                <Pencil style={{ color: "#3B82F6" }} /> Edit
              </button>
              <button className="text-white cursor-pointer flex items-center gap-2 hover:bg-black py-2 px-2 rounded-xl">
                {" "}
                <Trash style={{ color: "#EF4444" }} /> Delete
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <p className="rounded-4xl text-white bg-[#af74d7] py-2 px-2">
            {priority}
          </p>
          <p className=" text-white border border-[#ccc] rounded-2xl py-1 px-1">
            {date}
          </p>
        </div>
      </div>
    </>
  );
};

export default Task;
