import { useEffect, useState, type FC } from "react";
import CalendarView from "../components/CalendarView";
import { fetchProjects, fetchTask } from "../utils/http";
import type { projectCardProps, taskProps } from "../types/types";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useTheme } from "../hooks/useTheme";

const CalendarPage: FC = () => {
  const [projects, setProjects] = useState<projectCardProps[]>();
  const [tasks, setTasks] = useState<taskProps[]>();
  const [projectTitle, setProjectTitle] = useState("All Projects");
  const [projectStatus, setProjectStatus] = useState("All Statuses");
  const [priorities, setPriorities] = useState("All Priorities");
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchedProjects = async () => {
      const loadedProject = await fetchProjects();
      setProjects(loadedProject);
    };
    fetchedProjects();
  }, []);

  useEffect(() => {
    const handleTask = async () => {
      const allTask: taskProps[] = [];

      for (const proj of projects) {
        const loadedTask = await fetchTask(proj.id);
        setIsFetching(false);
        const taskArray = loadedTask
          ? Object.entries(loadedTask).map(([id, task]) => ({
              id,
              ...task,
              projectTitle: proj.title,
              status: proj.status,
            }))
          : [];
        allTask.push(...taskArray);
      }

      setTasks(allTask);
    };
    if (projects?.length > 0) {
      handleTask();
    }
  }, [projects]);

  let content;

  const projectTitleHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProjectTitle(e.target.value);
  };

  const projectStatusHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProjectStatus(e.target.value);
  };

  const priorityHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriorities(e.target.value);
  };

  const filteredTask = tasks?.filter((t) => {
    const matchedProjectTitle =
      projectTitle === "All Projects" || t.projectTitle === projectTitle;
    const matchedProjectStatus =
      projectStatus === "All Statuses" || t.status === projectStatus;
    const matchedPriority =
      priorities === "All Priorities" || t.priority === priorities;
    return matchedProjectTitle && matchedProjectStatus && matchedPriority;
  });

  if (isFetching) {
    content = <LoadingSpinner />;
  } else {
    content = <CalendarView tasks={filteredTask} />;
  }

  const { theme } = useTheme();

  return (
    <div>
      <h1 className=" text-3xl font-bold mb-2 ">Project Calendar</h1>
      <p className=" font-semibold text-[14px] max-w-140 break-words mb-4 mt-4">
        Visualize your project tasks, deadlines, and team assignments on a
        comprehensive monthly calendar. Filter by project, status, or priority
        to get a clear overview of your team's workload.
      </p>

      <div
        className={`${
          theme === "dark"
            ? "bg-[#141217] border-[#3E3A45] border-2 border-solid"
            : "bg-white border-[#ccc] border-2 border-solid"
        } border-solid shadow-2xl w-[1170px] h-[100px] px-4 py-4 rounded-xl mt-6 flex items-center gap-8`}
      >
        <h1 className="font-semibold">Filters:</h1>

        <select
          onChange={projectTitleHandler}
          value={projectTitle}
          className={`${
            theme === "dark"
              ? "bg-black border-[#3E3A45] border-2 border-solid"
              : "bg-white border-[#ccc] border-2 border-solid"
          } px-2 py-2 rounded-[8px] active:outline-none focus:outline-none focus:border-[#8b5cf6]`}
        >
          <option>All Projects</option>
          {projects?.map((proj) => (
            <option>{proj.title}</option>
          ))}
        </select>

        <select
          onChange={projectStatusHandler}
          value={projectStatus}
          className={` ${
            theme === "dark"
              ? "bg-black border-[#3E3A45] border-2 border-solid"
              : "bg-white border-[#ccc] border-2 border-solid"
          } px-2 py-2 rounded-[8px] active:outline-none focus:outline-none focus:border-[#8b5cf6]`}
        >
          <option>All Statuses</option>
          <option>Active</option>
          <option>Completed</option>
          <option>On Hold</option>
        </select>

        <select
          onChange={priorityHandler}
          value={priorities}
          className={`${theme === "dark" ? "bg-black border-[#3E3A45] border-2 border-solid" : "bg-white border-[#ccc] border-2 border-solid"}  px-2 py-2 rounded-[8px] active:outline-none focus:outline-none focus:border-[#8b5cf6]`}
        >
          <option>All Priorities</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      {tasks && projects && content}
    </div>
  );
};

export default CalendarPage;
