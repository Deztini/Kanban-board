import { useState, type FC } from "react";
import Task from "./Task";
import { Plus } from "lucide-react";
import Modal from "./ui/Modal";

type taskProps = {
  id: number;
  title: string;
  description: string;
  date: string;
  urgency: string;
};

type ProjectProps = {
  projectTitle: string;
  tasks: taskProps[];
};

const Projectboard: FC<ProjectProps> = ({ projectTitle, tasks }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModalHandler = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="w-[28%] h-full bg-[#121212] py-4 px-4 rounded-2xl">
        <h1 className="font-bold text-white text-2xl mb-4">{projectTitle}</h1>
        <div className="flex flex-col gap-3">
          {tasks.map((t) => (
            <Task
              key={t.id}
              title={t.title}
              description={t.description}
              date={t.date}
              urgency={t.urgency}
            />
          ))}
        </div>

        <div className="flex items-end justify-center mt-8">
          <button
            className="text-white cursor-pointer flex "
            onClick={openModalHandler}
          >
            <Plus /> Add Task
          </button>
        </div>

        <Modal
          title="Add New Task"
          subtitle="Fill in the details below to create a new task for your board."
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          width="w-[380px]"
          height="h-[580px]"
        >
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-white">Task Title</label>
              <input
                type="text"
                required
                placeholder="e.g Implement user authentication"
                className="bg-black h-[35px] rounded px-4 py-4 text-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white">Description</label>
              <textarea
                placeholder="Add detailed notes, subtasks, or links related to this task..."
                className="bg-black  rounded px-4 py-4 text-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white">Priority</label>
              <select
                className="bg-black h-[40px] text-white px-4 py-2"
                defaultValue=""
              >
                <option value="" disabled >
                  Select priority
                </option>
                <option value="low">low</option>
                <option value="high">high</option>
                <option value="medium">medium</option>
              </select>
            </div>

            <div className="flex justify-end gap-12 mt-8">
              <button onClick={handleCloseModal} className="text-white cursor-pointer">Cancel</button>
              <button className="bg-[#af74d7] text-white rounded-xl w-[120px] h-[40px] py-2 px-4 cursor-pointer hover:bg-[#c885f5]">Create Task</button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default Projectboard;
