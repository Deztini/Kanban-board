import type { FC } from "react";
import { useState, useEffect } from "react";
import Card from "../components/UI/Card";
import { ClipboardList, Plus } from "lucide-react";
import { Activity } from "lucide-react";
import { ListChecks } from "lucide-react";
import { Archive } from "lucide-react";
import { FolderPlus } from "lucide-react";
import Tabs from "../components/Tabs";
import ProjectCard from "../components/ProjectCard";
import Modal from "../components/UI/Modal";
import type { generalProjectProps } from "../types/types";
import { isNotEmpty } from "../utils/validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchProjects, storeProjects } from "../utils/http";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const ProjectsPage: FC = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [projects, setProjects] = useState<generalProjectProps[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchProjects();
      if (data) {
        setProjects(data);
      }
      setIsFetching(false);
    };
    loadData();
  }, []);

  const openModalHandler = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsFetching(true);

    const formData = new FormData(e.currentTarget);
    const projectTitle = formData.get("projectTitle") as string;
    const description = formData.get("description") as string;
    const status = formData.get("status") as string;
    const taskCompleted = formData.get("taskCompleted") as number;
    const targetTask = formData.get("targetTask") as number;

    if (!isNotEmpty(projectTitle)) {
      toast.error("Please enter a project title");
      return;
    }

    if (!isNotEmpty(description)) {
      toast.error("Please enter a description for the project");
      return;
    }

    if (!isNotEmpty(status)) {
      toast.error("Select a project status, it is required");
      return;
    }

  

    const newProject: generalProjectProps = {
      title: projectTitle,
      description,
      status,
    };

    try {
      setModalOpen(false);
      await storeProjects(newProject);
      const updatedProjects = await fetchProjects();
      setProjects(updatedProjects);
    } catch (error) {
      toast.error("Failed to create project");
    } finally {
      setIsFetching(false);
    }
  };

  const filteredProjects =
    selectedType === "All"
      ? projects
      : projects.filter((proj) => proj.status === selectedType);

  const activeProjects = projects.filter((proj) => proj.status === "Active");
  const completedProjects = projects.filter(
    (proj) => proj.status === "Completed"
  );
  const archivedProjects = projects.filter((proj) => proj.status === "On Hold");

  let content;

  if (isFetching) {
    content = <LoadingSpinner />;
  } else if (projects.length === 0) {
    content = (
      <div className="flex flex-col items-center justify-center text-center text-white mt-10">
        <FolderPlus className="w-12 h-12 text-gray-400 mb-4" />
        <p className="text-2xl font-semibold mb-1">No Projects Yet</p>
        <p className="text-xl text-gray-400">
          Click the "Create New Project" button to get started.
        </p>
      </div>
    );
  } else {
    content = (
      <div className="flex gap-12 flex-wrap mt-6">
        {filteredProjects.map((proj, index) => (
          <ProjectCard
            key={index}
            title={proj.title}
            status={proj.status}
            description={proj.description}
            id={proj.id}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-center" />
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
            value={projects.length}
            description="Total projects managed"
            icon={ClipboardList}
            iconColor="yellow"
          />
          <Card
            title="Active Projects"
            value={activeProjects.length}
            description="Currently in  progress"
            icon={Activity}
            iconColor="yellow"
          />
          <Card
            title="Projects Completed"
            value={completedProjects.length}
            description="Successfully delivered"
            icon={ListChecks}
            iconColor="yellow"
          />
          <Card
            title="Archived Projects"
            value={archivedProjects.length}
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

        {content}

        <Modal
          title="Create New Project"
          subtitle="Fill in the details to get started."
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          width="w-[380px]"
          height="h-auto"
        >
          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <div className="flex flex-col gap-2">
              <label className="text-white">Project Title</label>
              <input
                type="text"
                required
                placeholder=""
                className="bg-black h-[35px] rounded px-4 py-4 text-white"
                name="projectTitle"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white">Description</label>
              <textarea
                required
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
                name="status"
                required
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option>Active</option>
                <option>Completed</option>
                <option>On Hold</option>
              </select>
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
    </>
  );
};

export default ProjectsPage;
