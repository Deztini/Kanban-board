import { useState, type FC, useContext, useEffect } from "react";
import Task from "./Task";
import { Plus, PlusIcon } from "lucide-react";
import Modal from "./UI/Modal";
import type { ProjectProps, taskProps } from "../types/types";
import { TaskContext } from "../store/context/project-context";
import { DraggableContext } from "../store/context/draggable-context";
import { isNotEmpty } from "../utils/validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchTask, updateTask } from "../utils/http";
import { storeTask } from "../utils/http";
import { useParams } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

const Projectboard: FC<ProjectProps & { boardId: string }> = ({
  projectTitle,
  borderColors,
  boardId,
}) => {
  const { tasks, setTasks } = useContext(TaskContext);
  const dragCtx = useContext(DraggableContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [labels, setLabels] = useState<string[]>([""]);
  const [isFetching, setIsFetching] = useState(true);

  const params = useParams();

  useEffect(() => {
    setTasks([]);

    const loadData = async () => {
      const data = await fetchTask(params.projectId);
      if (data) {
        setTasks(data);
      }
      setIsFetching(false);
    };
    loadData();
  }, [params.projectId, setTasks]);

  const boardTask = tasks.filter((task) => task.boardId === boardId);

  const openModalHandler = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const taskTitle = formData.get("title") as string;
    const assignee = formData.get("assign") as string;
    const priority = formData.get("priority") as string;
    const date = formData.get("date") as string;

    if (
      !isNotEmpty(taskTitle) ||
      !isNotEmpty(assignee) ||
      !isNotEmpty(priority) ||
      !isNotEmpty(date)
    ) {
      toast.error("Fill in all the fields");
      return;
    }

    const newTask: taskProps = {
      title: taskTitle,
      assignee,
      date,
      priority,
      boardId: boardId,
      label: labels,
    };

    // taskCtx.setTasks((prevTask) => [...prevTask, { ...newTask }]);

    try {
      setModalOpen(false);
      await storeTask(newTask, params.projectId);
      const updatedTask = await fetchTask(params.projectId);
      setTasks(updatedTask);
    } catch (error) {
      toast.error("Failed to create task");
    } finally {
      setIsFetching(false);
    }

    setLabels([""]);
  };

  const handleDrop = async (targetBoardId: string) => {
    if (!dragCtx.draggableTask) return;

    const draggedTask = dragCtx.draggableTask.task;

    const updatedTask = { ...draggedTask, boardId: targetBoardId };

    //  setTasks((prevTask) =>
    //   prevTask.map((t) => (t.id === draggedTask.id ? updatedTask : t))
    // );

    try {
      dragCtx.setDraggableTask(null);
      await updateTask(updatedTask, params.projectId, draggedTask.id, "PATCH");

      const data = await fetchTask(params.projectId);
      setTasks(data);
    } catch (error) {
      console.log("Failed to drop the task on the board", error);
    }
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

  const { theme } = useTheme();

  return (
    <>
      <ToastContainer position="top-center" />
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(boardId)}
        className={`w-[24%] h-full ${
          theme === "dark"
            ? `bg-[#121212] border-2  ${borderColors}`
            : "bg-white border-[#ccc] border-2 border-solid"
        } py-4 px-4 rounded-2xl `}
      >
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-2xl mb-4">{projectTitle}</h1>
          <p className="w-9 h-9 rounded-full flex items-center justify-center bg-[#af74d7]/10 text-[#af74d7] font-semibold ">
            {boardTask.length}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {!isFetching && boardTask.length > 0 ? (
            boardTask.map((t) => (
              <Task key={t.id} id={t.id} boardId={t.boardId} />
            ))
          ) : (
            <div>
              <h1 className=" text-4xl text-center font-bold mb-4">
                No Tasks Yet
              </h1>
              <p className=" text-xl text-center">
                It looks like you haven't created any task. Start by adding your
                first task.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-end justify-center mt-8">
          <button className="cursor-pointer flex " onClick={openModalHandler}>
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
              <label>Task Title</label>
              <input
                type="text"
                required
                placeholder="e.g Implement user authentication"
                className={`${
                  theme === "dark"
                    ? " border border-[#3E3A45] h-[35px]"
                    : " border-2 border-solid border-[#ccc]"
                } px-2 py-2  rounded-[5px]`}
                name="title"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>Assignee</label>
              <input
                type="text"
                required
                placeholder="John Doe"
                className={`${
                  theme === "dark"
                    ? " border border-[#3E3A45] h-[35px]"
                    : " border-2 border-solid border-[#ccc]"
                } px-2 py-2  rounded-[5px]`}
                name="assign"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>Priority</label>
              <select
                className={`${
                  theme === "dark"
                    ? " border border-[#3E3A45] "
                    : " border-2 border-solid border-[#ccc]"
                } px-4 py-2 h-[40px]  rounded-[5px]`}
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
              <label>Due Date</label>
              <input
                type="date"
                required
                name="date"
                placeholder="Pick a date"
                className={`${
                  theme === "dark"
                    ? " border border-[#3E3A45] "
                    : " border-2 border-solid border-[#ccc]"
                } px-2 py-2 h-[35px] rounded-[5px]`}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>Add Label(s)</label>
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
                    className={`${
                      theme === "dark"
                        ? " border border-[#3E3A45]"
                        : " border-2 border-solid border-[#ccc]"
                    }  px-2 py-2  w-65 rounded-[5px]`}
                  />
                ))}

                {labels.length < 2 && (
                  <button
                    className="cursor-pointer hover:text-[#af74d7]"
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
