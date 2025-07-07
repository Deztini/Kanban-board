import type { FC } from "react";
import { Plus } from "lucide-react";
import Projectboard from "../components/Projectboard";
import Modal from "../components/ui/Modal";
import { useState } from "react";
import ColorPicker from "../components/ColorPicker";
import type { ProjectProps } from "../types/types";

const todoTasks = [
  {
    id: 1,
    title: "Define Project Scope",
    description:
      "Outline the boundaries and objectives for the Q3 marketing campaign.",
    date: "2025-06-23",
    priority: "urgent",
  },
  {
    id: 2,
    title: "Research Competitors",
    description: "Gather data on competitor strategies and market positioning.",
    date: "2025-06-24",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Create Content Calendar",
    description:
      "Develop a detailed content schedule for social media and blog posts.",
    date: "2025-06-25",
    priority: "High",
  },
];

const inprogressTasks = [
  {
    id: 4,
    title: "Design UI Mockups",
    description:
      "Draft initial wireframes and high-fidelity mockups for the new feature.",
    date: "2025-06-23",
    priority: "Medium",
  },
  {
    id: 5,
    title: "Develop API Endpoints",
    description: "Implement backend API for data retrieval and submission.",
    date: "2025-06-24",
    priority: "urgent",
  },
  {
    id: 6,
    title: "Write User Stories",
    description:
      "Document user journeys and requirements for upcoming sprints.",
    date: "2025-06-24",
    priority: "urgent",
  },
];

const reviewTasks = [
  {
    id: 7,
    title: "Peer Code Review",
    description:
      "Review new feature branch for quality and adherence to standards.",
    date: "2025-06-20",
    priority: "Low",
  },
  {
    id: 8,
    title: "Client Feedback Session",
    description:
      "Conduct a meeting to gather feedback on the latest prototype.",
    date: "2025-06-20",
    priority: "Low",
  },
];

const completedTasks = [
  {
    id: 9,
    title: "Project Kick-off Meeting",
    description:
      "Successfully initiated the new project with all stakeholders.",
    date: "2025-06-29",
    priority: "Low",
  },
  {
    id: 10,
    title: "Initial Market Research Report",
    description: "Comprehensive report on initial market findings submitted.",
    date: "2025-06-29",
    priority: "Low",
  },
];

const Mainboard: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [colors, setColors] = useState("");
  const [boards, setBoards] = useState<ProjectProps[]>([
    { projectTitle: "Todo", tasks: todoTasks, borderColors: "border-red-500" },
    {
      projectTitle: "In Progress",
      tasks: inprogressTasks,
      borderColors: "border-blue-500",
    },
    {
      projectTitle: "Under Review",
      tasks: reviewTasks,
      borderColors: "border-pink-500",
    },
    {
      projectTitle: "Completed",
      tasks: completedTasks,
      borderColors: "border-yellow-500",
    },
  ]);

  const name = localStorage.getItem("userName");

  const openModalHandler = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("boardName");

    if (typeof name === "string") {
      setBoards((prev) => [
        ...prev,
        { projectTitle: name, tasks: [], borderColors: colors },
      ]);
    }
    setModalOpen(false);
  };
  return (
    <>
      <div className="h-full bg-black px-8 py-12">
        <h1 className="text-white text-3xl mb-8">
          Welcome Back,{" "}
          <span className="text-shadow-purple uppercase text-[#af74d7]">
            {name}
          </span>
        </h1>
        <div className="bg-[#121212] w-[100%] px-4 py-6 h-17 flex justify-between rounded mt-2 items-center">
          <h1 className="text-white font-bold text-2xl">My Boards</h1>
          <button
            className="w-50 h-10 py-2 px-4 rounded text-white bg-[#af74d7] cursor-pointer hover:bg-[#944fc5] flex"
            onClick={openModalHandler}
          >
            <Plus /> Add New Board
          </button>
        </div>

        <div className="mt-8 flex flex-wrap gap-12 px-4">
          {boards.map((board, index) => (
            <Projectboard
              key={index}
              projectTitle={board.projectTitle}
              tasks={board.tasks}
              borderColors={board.borderColors}
            />
          ))}
        </div>

        <Modal
          title="Create New Board"
          subtitle="Organize your projects, tasks, and ideas into a new visual board."
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          width="w-[480px]"
          height="h-auto"
        >
          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <div className="flex flex-col gap-2">
              <label className="text-white">Board Title</label>
              <input
                type="text"
                required
                placeholder="e.g Todo"
                className="bg-black h-[35px] rounded px-4 py-4 text-white"
                name="boardName"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white">Board Color</label>
              <ColorPicker setColor={setColors} />
            </div>

            <div className="flex justify-end gap-12 mt-8">
              <button
                onClick={handleCloseModal}
                className="text-white cursor-pointer"
              >
                Cancel
              </button>
              <button className="bg-[#af74d7] text-white rounded-xl w-[150px] h-[40px] py-2 px-4 cursor-pointer hover:bg-[#c885f5]">
                Create Board
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default Mainboard;
