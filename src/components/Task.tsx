import type { FC } from "react";
import type { taskProps } from "../types/types";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import Modal from "./UI/Modal";
import { TaskContext } from "../store/context/project-context";
import { DraggableContext } from "../store/context/draggable-context";

const Task: FC<taskProps> = ({ id, boardId }) => {
  const taskCtx = useContext(TaskContext);
  const dragCtx = useContext(DraggableContext);
  const [isClicked, setIsClicked] = useState<boolean>();
  const [edit, setEdit] = useState(false);

  const specificTask = taskCtx.tasks.find((t) => t.id === id);
  if (!specificTask) return null;

  const { title, description, date, priority } = specificTask;

  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editPriority, setEditPriority] = useState(priority);
  const [editDate, setEditDate] = useState(date);

  function toggleOverlay() {
    setIsClicked((prev) => !prev);
  }

  function handleEdit() {
    setEdit(true);
  }

  const handleCloseModal = () => {
    setEdit(false);
  };

  useEffect(() => {
    const editTask = taskCtx.tasks.find((task) => task.id === id);

    if (editTask) {
      setEditTitle(editTask.title);
      setEditDescription(editTask.description);
      setEditPriority(editTask.priority);
      setEditDate(editTask.date);
    }
  }, [edit, id, taskCtx.tasks]);

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedTask: taskProps = {
      id,
      title: editTitle,
      description: editDescription,
      date: editDate,
      priority: editPriority,
      boardId,
    };

    taskCtx.setTasks((prevTask) =>
      prevTask.map((task) => (task.id === id ? updatedTask : task))
    );

    setEdit(false);
    setIsClicked(false);
  };

  const handleDelete = (id: number) => {
    taskCtx.setTasks((prevTask) => prevTask.filter((t) => t.id !== id));
  };

  const handleDrag = (task: taskProps) => {
    dragCtx.setDraggableTask({ task });
  };

  return (
    <>
      <div
        draggable
        onDragStart={() => handleDrag(specificTask)}
        className="bg-black w-78 h-60 py-4 px-6 rounded-xl relative"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold mb-2">{title}</h1>
          <button className="text-white cursor-pointer" onClick={toggleOverlay}>
            <Ellipsis />
          </button>
        </div>

        <div className="flex justify-between">
          <p className="text-[#ccc] font-bold mb-6">{description}</p>
          {isClicked && (
            <div className="bg-[#121212] h-28 w-35 flex flex-col gap-1 z-10 absolute top-13 right-5 rounded-xl px-3 py-3">
              <button
                className="text-white cursor-pointer flex items-center gap-2 hover:bg-black py-2 px-2 rounded-xl"
                onClick={handleEdit}
              >
                {" "}
                <Pencil style={{ color: "#3B82F6" }} /> Edit
              </button>
              <button
                className="text-white cursor-pointer flex items-center gap-2 hover:bg-black py-2 px-2 rounded-xl"
                onClick={handleDelete.bind(this, id)}
              >
                {" "}
                <Trash style={{ color: "#EF4444" }} /> Delete
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <p className="rounded-4xl text-white bg-[#af74d7] py-2 px-2">
            {priority}
          </p>
          <p className=" text-white border border-[#ccc] rounded-2xl py-1 px-1">
            {date}
          </p>
        </div>
      </div>

      <Modal
        isOpen={edit}
        onClose={() => setEdit(false)}
        title="Edit Task"
        subtitle="Modify the details of your task card."
        width="w-[380px]"
        height="h-auto"
      >
        <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
          <div className="flex flex-col gap-2">
            <label className="text-white">Task Title</label>
            <input
              type="text"
              required
              placeholder="e.g Implement user authentication"
              className="bg-black h-[35px] rounded px-4 py-4 text-white"
              name="title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white">Description</label>
            <textarea
              placeholder="Add detailed notes, subtasks, or links related to this task..."
              className="bg-black  rounded px-4 py-4 text-white"
              name="description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white">Priority</label>
            <select
              className="bg-black h-[40px] text-white px-4 py-2"
              value={editPriority}
              name="priority"
              onChange={(e) => setEditPriority(e.target.value)}
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
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
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
              Update Task
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Task;
