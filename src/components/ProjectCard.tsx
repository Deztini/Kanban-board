import { useEffect, useState, type FC } from "react";
import type { projectCardProps, taskProps } from "../types/types";
import { useNavigate } from "react-router-dom";
import { fetchTask } from "../utils/http";

const ProjectCard: FC<projectCardProps> = ({
  title,
  description,
  status,
  id,
}) => {
  const navigate = useNavigate();
  const [projectTasks, setProjectTasks] = useState<taskProps[]>([]);
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchTask(id);
      if (data) {
        setProjectTasks(data);
      }
    };
    loadData();
  }, [id]);

  const completedTask = projectTasks.filter(
    (projTask) => projTask.boardId === "Done"
  ).length;
  const totalTask = projectTasks.length;

  let progressValue;

  if (completedTask && totalTask) {
      progressValue = Math.floor((completedTask / totalTask) * 100);
  } else {
    progressValue = 0;
  }

 
  return (
    <div className="bg-[#141217] border-[#3E3A45] border-2 border-solid shadow-2xl w-[300px] h-auto px-6 py-4 rounded-xl">
      <div className="flex justify-between items-start gap-1 mb-2">
        <h1 className="text-[20px] font-bold text-white">{title}</h1>
        <p
          className={`rounded-2xl  px-3 py-1 max-h-12 text-center text-sm font-semibold inline-block text-white  ${
            status === "On Hold"
              ? "bg-[#8A5C1E]/60"
              : status === "Active"
              ? "bg-[#2B50E3]/65"
              : "bg-green-500/35"
          } `}
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
        Tasks: {completedTask} / {totalTask} Completed
      </p>

      <button
        className="text-white bg-black border-2 border-solid border-[#3E3A45] rounded-[7px] py-2 px-4 w-[100%] cursor-pointer hover:bg-[#0000002d]"
        onClick={() => navigate(`/projectpulse/projects/${id}`)}
      >
        View Project
      </button>
    </div>
  );
};

export default ProjectCard;
