import type { FC } from "react";
import CalendarView from "../components/CalendarView";

// Example project list
export const projectsData = [
  { id: "p1", name: "Marketing Website" },
  { id: "p2", name: "Mobile App Redesign" },
  { id: "p3", name: "Internal Dashboard" },
];

// Example tasks list
export const tasksData = [
  {
    id: "t1",
    title: "Homepage UI",
    date: "2025-07-09",
    projectId: "p1",
    status: "On Hold",
    priority: "High",
  },
  {
    id: "t2",
    title: "Set up API",
    date: "2025-07-16",
    projectId: "p3",
    status: "Completed",
    priority: "Medium",
  },
];

const CalendarPage: FC = () => {
  return (
    <div>
      <h1 className="text-white text-3xl font-bold mb-2 ">Project Calendar</h1>
      <p className="text-[#Ccc] font-semibold text-[14px] max-w-140 break-words mb-4 mt-4">
        Visualize your project tasks, deadlines, and team assignments on a
        comprehensive monthly calendar. Filter by project, status, or priority
        to get a clear overview of your team's workload.
      </p>

      <div className="bg-[#141217] border-[#3E3A45] border-2 border-solid shadow-2xl w-[1170px] h-[100px] px-4 py-4 rounded-xl mt-6 flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold">July 2025</h1>
        </div>

        <select className="text-white bg-black border-2 border-solid border-[#3E3A45] px-2 py-2 rounded-[8px] active:outline-none focus:outline-none focus:border-[#8b5cf6]">
          <option>Month</option>
          <option>January</option>
          <option>February</option>
          <option>March</option>
          <option>April</option>
          <option>May</option>
          <option>June</option>
          <option>July</option>
          <option>January</option>
          <option>August</option>
          <option>September</option>
          <option>October</option>
          <option>November</option>
        </select>
      </div>

      <div className="bg-[#141217] border-[#3E3A45] border-2 border-solid shadow-2xl w-[1170px] h-[100px] px-4 py-4 rounded-xl mt-6 flex items-center gap-8">
        <h1 className="text-[#ccc] font-semibold">Filters:</h1>

        <select className="text-white bg-black border-2 border-solid border-[#3E3A45] px-2 py-2 rounded-[8px] active:outline-none focus:outline-none focus:border-[#8b5cf6]">
          <option>All Projects</option>
        </select>

        <select className="text-white bg-black border-2 border-solid border-[#3E3A45] px-2 py-2 rounded-[8px] active:outline-none focus:outline-none focus:border-[#8b5cf6]">
          <option>All Statuses</option>
          <option>Active</option>
          <option>Completed</option>
          <option>On Hold</option>
        </select>

        <select className="text-white bg-black border-2 border-solid border-[#3E3A45] px-2 py-2 rounded-[8px] active:outline-none focus:outline-none focus:border-[#8b5cf6]">
          <option>All Priorities</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      <CalendarView tasks={tasksData} projects={projectsData} />
    </div>
  );
};

export default CalendarPage;
