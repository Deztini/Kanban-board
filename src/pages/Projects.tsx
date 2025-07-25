import type { FC } from "react";
import { useState } from "react";
import Card from "../components/UI/Card";
import { ClipboardList, Plus } from "lucide-react";
import { Activity } from "lucide-react";
import { ListChecks } from "lucide-react";
import { Archive } from "lucide-react";
import Tabs from "../components/Tabs";
import ProjectCard from "../components/ProjectCard";
import Modal from "../components/UI/Modal";

const DUMMY_PROJECTS = [
  {
    title: "Automated Testing Suite",
    status: "Active",
    description:
      "Implement a comprehensive automated testing suite to improve code quality and deployment speed.",
    targetTask: 20,
    taskCompleted: 14,
    statusColor: "purple",
  },
  {
    title: "Backend API Development",
    status: "Active",
    description:
      "Develop and integrate new RESTful APIs for improved data handling and scalability.",
    targetTask: 20,
    taskCompleted: 12,
    statusColor: "purple",
  },
  {
    title: "Cloud Infrastructure Upgrade",
    status: "On Hold",
    description:
      "Migrate existing services to a more scalable and cost-effective cloud infrastructure..",
    targetTask: 20,
    taskCompleted: 2,
    statusColor: "gold",
  },
  {
    title: "Customer Feedback Analysis",
    status: "Active",
    description:
      "Analyze recent customer feedback to identify common pain points and feature requests..",
    targetTask: 10,
    taskCompleted: 5,
    statusColor: "purple",
  },
  {
    title: "Documentation Refresh",
    status: "Active",
    description:
      "Update and expand project documentation for new features and existing ones..",
    targetTask: 20,
    taskCompleted: 8,
    statusColor: "purple",
  },
  {
    title: "Marketing Campaign Launch",
    status: "Active",
    description:
      "Plan and execute the Q3 marketing campaign for Project Pulse..",
    targetTask: 20,
    taskCompleted: 18,
    statusColor: "purple",
  },
  {
    title: "Mobile App Integration",
    status: "On Hold",
    description:
      "Integrate Project Pulse with native iOS and Android applications..",
    targetTask: 20,
    taskCompleted: 5,
    statusColor: "gold",
  },
  {
    title: "Performance Optimization",
    status: "Active",
    description:
      "Identify and resolve performance bottlenecks across the application.",
    targetTask: 20,
    taskCompleted: 16,
    statusColor: "purple",
  },
  {
    title: "Project Pulse UI Redesign",
    status: "Active",
    description:
      "Lead the visual overhaul and UX improvements for the Project Pulse application.",
    targetTask: 20,
    taskCompleted: 15,
    statusColor: "purple",
  },
  {
    title: "User Onboarding Flow",
    status: "Completed",
    description:
      "Redesign the initial user onboarding experience to improve conversion rates.",
    targetTask: 10,
    taskCompleted: 10,
    statusColor: "green",
  },
];

const ProjectsPage: FC = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const openModalHandler = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
    // const [projects, setProjects] = useState(DUMMY_PROJECTS);

  const filteredProjects =
    selectedType === "All"
      ? DUMMY_PROJECTS
      : DUMMY_PROJECTS.filter((proj) => proj.status === selectedType);
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-white mt-4">Your Projects</h1>
        <button
          onClick={openModalHandler}
          className="bg-[#af74d7] text-white rounded-xl w-[200px] h-[40px] py-2 px-4 cursor-pointer hover:bg-[#c885f5] flex items-center"
        >
          <Plus />
          Create New Projects
        </button>
      </div>

      <div className="flex gap-4 mt-8">
        <Card
          title="All Projects"
          value={10}
          description="Total projects managed"
          icon={ClipboardList}
          iconColor="yellow"
        />
        <Card
          title="Active Projects"
          value={7}
          description="Currently in  progress"
          icon={Activity}
          iconColor="yellow"
        />
        <Card
          title="Projects Completed"
          value={2}
          description="Successfully delivered"
          icon={ListChecks}
          iconColor="yellow"
        />
        <Card
          title="Archived Projects"
          value={2}
          description="Historical records"
          icon={Archive}
          iconColor="yellow"
        />
      </div>

      <div className="flex gap-2 mt-12">
        <Tabs
          tabName="All"
          selectedType={selectedType}
          onSelect={() => setSelectedType("All")}
        />
        <Tabs
          tabName="Active"
          selectedType={selectedType}
          onSelect={() => setSelectedType("Active")}
        />
        <Tabs
          tabName="Completed"
          selectedType={selectedType}
          onSelect={() => setSelectedType("Completed")}
        />
        <Tabs
          tabName="On Hold"
          selectedType={selectedType}
          onSelect={() => setSelectedType("On Hold")}
        />
      </div>

      <div className="flex gap-12 flex-wrap mt-6">
        {filteredProjects.map((proj, index) => (
          <ProjectCard
            key={index}
            title={proj.title}
            status={proj.status}
            description={proj.description}
            targetTask={proj.targetTask}
            taskCompleted={proj.taskCompleted}
            statusColor={proj.statusColor}
          />
        ))}
      </div>

      <Modal
        title="Create New Project"
        subtitle="Fill in the details to get started."
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        width="w-[380px]"
        height="h-[600px]"
      >
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-white">Project Title</label>
            <input
              type="text"
              required
              placeholder=""
              className="bg-black h-[35px] rounded px-4 py-4 text-white"
              name="boardName"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white">Description</label>
            <textarea
              placeholder="Add detailed notes, subtasks, or links related to this task..."
              className="bg-black  rounded px-4 py-4 text-white"
              name="description"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white">Status</label>
            <select
              className="bg-black h-[40px] text-white px-4 py-2"
              defaultValue=""
              name="priority"
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="low">Active</option>
              <option value="high">Completed</option>
              <option value="medium">On Hold</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white">Target Task</label>
            <input
              type="number"
              required
              placeholder=""
              className="bg-black h-[35px] rounded px-4 py-4 text-white"
              name="boardName"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white">Task Completed</label>
            <input
              type="number"
              required
              placeholder=""
              defaultValue={0}
              className="bg-black h-[35px] rounded px-4 py-4 text-white"
              name="boardName"
            />
          </div>

          <div className="flex justify-end gap-12 mt-8">
            <button
              onClick={handleCloseModal}
              className="text-white cursor-pointer hover:text-[#af74d7]"
            >
              Cancel
            </button>
            <button className="bg-[#af74d7] text-white rounded-xl w-[150px] h-[40px] py-2 px-4 cursor-pointer hover:bg-[#c885f5]">
              Create Project
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProjectsPage;
