import type { FC } from "react";
import type { projectCardProps } from "../types/types";
import { useNavigate } from "react-router-dom";

const ProjectCard: FC<projectCardProps> = ({
  title,
  description,
  status,
  targetTask,
  taskCompleted,
  statusColor,
  id,
}) => {
  const navigate = useNavigate();
  const progressValue = Math.floor((taskCompleted / targetTask) * 100);
  return (
    <div className="bg-[#141217] border-[#3E3A45] border-2 border-solid shadow-2xl w-[300px] h-[400px] px-6 py-4 rounded-xl">
      <div className="flex justify-between mb-2">
        <h1 className="text-xl font-bold text-white">{title}</h1>
        <p
          style={{
            color: "white",
            backgroundColor: `${statusColor}`,
          }}
          className="rounded-2xl h-10 px-1 py-1 text-center w-30"
        >
          {status}
        </p>
      </div>
      <p className="text-[#ccc] font-semibold mb-4">{description}</p>
      <div className="mb-2">
        <div className="flex justify-between mb-2">
          <p className="text-[#ccc] font-semibold">Progress</p>
          <p className="text-[#ccc] font-semibold">{`${progressValue}%`}</p>
        </div>
        <progress className="progress" value={progressValue} max="100" />
      </div>

      <p className="text-[#ccc] font-semibold mb-2">
        Tasks: {taskCompleted} / {targetTask} Completed
      </p>

      <button
        className="text-white bg-black border-2 border-solid border-[#3E3A45] rounded-[7px] py-2 px-4 w-[100%] cursor-pointer"
        onClick={() => navigate(`/projectpulse/projects/${id}`)}
      >
        View Project
      </button>
    </div>
  );
};

export default ProjectCard;
