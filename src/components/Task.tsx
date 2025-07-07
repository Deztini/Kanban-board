import type { FC } from "react";
import type { taskProps } from "../types/types";

// type TaskProps = {
//   title: string;
//   description: string;
//   date: string;
//   priority: string;
// };

const Task: FC<taskProps> = ({id, title, description, date, priority }) => {
  return (
    <>
      <div className="bg-black w-90 h-60 py-4 px-6 rounded-xl">
        <h1 className="text-white text-2xl font-bold mb-2">{title}</h1>
        <p className="text-[#ccc] font-bold mb-6">{description}</p>
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
