import type { FC } from "react";
import { useTheme } from "../hooks/useTheme";

const DUMMY_DATA = [
  {
    taskName: "Finalize Marketing Strategy",
    projectName: "Marketing Campaign Q3",
    dueDate: "2024-07-28",
  },
  {
    taskName: "Deploy Staging Environment",
    projectName: "Backend API",
    dueDate: "2024-07-30",
  },
  {
    taskName: "Client Feedback Session",
    projectName: "Mobile App V2",
    dueDate: "2024-08-30",
  },
];

const Deadlines: FC = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-[#141217] border-[#3E3A45] border-2 border-solid "
          : "bg-[#ffff] border border-[#ccc]"
      } shadow-2xl w-[280px] h-[300px] px-4 py-4 rounded-xl mt-6`}
    >
      <h1 className="font-bold text-xl ">Upcoming Deadlines</h1>
      {DUMMY_DATA.map((item) => (
        <div className="my-2">
          <p className="font-bold">{item.taskName}</p>
          <h1 className="text-[blue] font-semibold text-xs">
            {item.projectName}
          </h1>
          <p className="text-left">•Due:{item.dueDate}</p>
        </div>
      ))}
    </div>
  );
};

export default Deadlines;
