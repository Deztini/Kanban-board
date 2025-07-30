import { useState, type FC, useContext } from "react";
import Task from "./Task";
import { Plus, PlusIcon } from "lucide-react";
import Modal from "./UI/Modal";
import type { ProjectProps, taskProps } from "../types/types";
import { TaskContext } from "../store/context/project-context";
import { DraggableContext } from "../store/context/draggable-context";
import { isNotEmpty } from "../utils/validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Projectboard: FC<ProjectProps & { boardId: string }> = ({
  projectTitle,
  borderColors,
  boardId,
}) => {
  const taskCtx = useContext(TaskContext);
  const dragCtx = useContext(DraggableContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [labels, setLabels] = useState<string[]>([""]);

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
    const assignee = formData.get("assign") as string;
    const priority = formData.get("priority") as string;
    const date = formData.get("date") as string;

    if (!isNotEmpty(taskTitle)) {
      toast.error("Please enter a task title");
      return;
    }

    if (!isNotEmpty(assignee)) {
      toast.error("Please enter an assignee name");
      return;
    }

    if (!isNotEmpty(priority)) {
      toast.error("Select the task priority, it is required");
      return;
    }

    if (!isNotEmpty(date)) {
      toast.error("Enter a due date for the task");
      return;
    }

    const newTask: taskProps = {
      id: Math.random(),
      title: taskTitle,
      assignee,
      date,
      priority,
      boardId,
      label: labels,
    };

    taskCtx.setTasks((prevTask) => [...prevTask, { ...newTask }]);

    setModalOpen(false);
    setLabels([""]);
  };

  const handleDrop = (targetBoardId: string) => {
    if (!dragCtx.draggableTask) return;

    const draggedTask = dragCtx.draggableTask.task;

    const updatedTask = { ...draggedTask, boardId: targetBoardId };

    taskCtx.setTasks((prevTask) =>
      prevTask.map((t) => (t.id === draggedTask.id ? updatedTask : t))
    );

    dragCtx.setDraggableTask(null);
  };

  const handleLabelChange = (index: number, value: string) => {
    const updatedLabels = [...labels];
    updatedLabels[index] = value;
    setLabels(updatedLabels);
  };

  const handleAddLabel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (labels.length < 2) {
      setLabels((label) => [...label, ""]);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(boardId)}
        className={`w-[24%] h-full bg-[#121212] py-4 px-4 rounded-2xl ${borderColors} border-2 `}
      >
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-white text-2xl mb-4">{projectTitle}</h1>
          <p className="w-9 h-9 rounded-full flex items-center justify-center bg-[#af74d7]/10 text-[#af74d7] font-semibold ">
            {boardTask.length}
          </p>
        </div>

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
              <label className="text-white">Assignee</label>
              <input
                type="text"
                required
                placeholder="John Doe"
                className="bg-black h-[35px] rounded px-4 py-4 text-white"
                name="assign"
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
                <option value="Low">Low</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white">Due Date</label>
              <input
                type="date"
                required
                name="date"
                placeholder="Pick a date"
                className=" bg-black h-[35px] rounded px-4 text-white "
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white">Add Label(s)</label>
              <div
                className={
                  labels.length < 2
                    ? "flex justify-between"
                    : "flex flex-col gap-2"
                }
              >
                {labels.map((label, index) => (
                  <input
                    key={index}
                    type="text"
                    required
                    name=""
                    value={label}
                    placeholder={index === 0 ? "Backend" : "Another Label"}
                    onChange={(e) => handleLabelChange(index, e.target.value)}
                    className=" bg-black h-[35px] w-[100%] rounded px-4 py-4 text-white "
                  />
                ))}

                {labels.length < 2 && (
                  <button
                    className="text-white cursor-pointer hover:text-[#af74d7]"
                    onClick={handleAddLabel}
                  >
                    <PlusIcon />
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-12 mt-2">
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
