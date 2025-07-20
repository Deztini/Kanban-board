import { useState, type FC, useContext } from "react";
import Task from "./Task";
import { Plus } from "lucide-react";
import Modal from "./ui/Modal";
import type { ProjectProps, taskProps } from "../types/types";
import { TaskContext } from "../store/context/project-context";

const Projectboard: FC<ProjectProps & { boardId: string }> = ({
  projectTitle,
  borderColors,
  boardId,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const taskCtx = useContext(TaskContext);
  const boardTask = taskCtx.tasks.filter((task) => task.boardId === boardId);
  // const [tasks, setTasks] = useState<taskProps[]>(dummyTask);

  const openModalHandler = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const taskTitle = formData.get("title") as string;
    const description = formData.get("description") as string;
    const priority = formData.get("priority") as string;
    const date = formData.get("date") as string;

    const newTask: taskProps = {
      id: Math.random(),
      title: taskTitle,
      description,
      date,
      priority,
      boardId,
    };

    taskCtx.setTasks((prevTask) => [...prevTask, { ...newTask }]);

    setModalOpen(false);
  };

  return (
    <>
      <div
        className={`w-[28%] h-full bg-[#121212] py-4 px-4 rounded-2xl ${borderColors} border-2 `}
      >
        <h1 className="font-bold text-white text-2xl mb-4">{projectTitle}</h1>
        <div className="flex flex-col gap-3">
          {boardTask.length > 0 ? (
            boardTask.map((t) => (
              <Task key={t.id} id={t.id} boardId={t.boardId} />
            ))
          ) : (
            <div>
              <h1 className="text-white text-4xl text-center font-bold mb-4">
                No Tasks Yet
              </h1>
              <p className="text-gray-500 text-xl text-center">
                It looks like you haven't created any task. Start by adding your
                first task.
              </p>
            </div>
          )}
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
          height="h-auto"
        >
          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <div className="flex flex-col gap-2">
              <label className="text-white">Task Title</label>
              <input
                type="text"
                required
                placeholder="e.g Implement user authentication"
                className="bg-black h-[35px] rounded px-4 py-4 text-white"
                name="title"
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
              <label className="text-white">Priority</label>
              <select
                className="bg-black h-[40px] text-white px-4 py-2"
                defaultValue=""
                name="priority"
              >
                <option value="" disabled>
                  Select priority
                </option>
                <option value="low">low</option>
                <option value="high">high</option>
                <option value="medium">medium</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white">Due Date</label>
              <input
                type="date"
                required
                name="date"
                placeholder="Pick a date"
                className=" bg-black h-[35px] rounded px-4 py-4 text-white "
              />
            </div>

            <div className="flex justify-end gap-12 mt-8">
              <button
                onClick={handleCloseModal}
                className="text-white cursor-pointer"
              >
                Cancel
              </button>
              <button className="bg-[#af74d7] text-white rounded-xl w-[120px] h-[40px] py-2 px-4 cursor-pointer hover:bg-[#c885f5]">
                Create Task
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default Projectboard;
