import type { FC } from "react";
import type { taskProps } from "../types/types";
import {
  CalendarDays,
  Ellipsis,
  Pencil,
  Trash,
  PlusIcon,
  Minus,
} from "lucide-react";
import { useContext, useEffect, useState, useCallback } from "react";
import Modal from "./UI/Modal";
import { TaskContext } from "../store/context/project-context";
import { DraggableContext } from "../store/context/draggable-context";
import { useParams } from "react-router-dom";
import { deleteTask, fetchTask, updateTask } from "../utils/http";

const Task: FC<taskProps> = ({ id, boardId }) => {
  const params = useParams();
  const {tasks, setTasks} = useContext(TaskContext);
  const dragCtx = useContext(DraggableContext);
  const [isClicked, setIsClicked] = useState<boolean>();
  const [edit, setEdit] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);

  const [editTitle, setEditTitle] = useState("");
  const [editAssignee, setEditAssignee] = useState("");
  const [editPriority, setEditPriority] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editLabel, setEditLabel] = useState<string[]>([]);

  const fetchTaskData = useCallback(async () => {
    const data = await fetchTask(params.projectId);
    if (data) {
      setTasks(data);
    }
    setIsFetching(false);
  }, [params.projectId, setTasks]);

  useEffect(() => {
    fetchTaskData();
  }, [params.projectId, fetchTaskData]);

  const specificTask = tasks.find((t) => t.id === id);

  useEffect(() => {
    if (specificTask) {
      setEditTitle(specificTask.title);
      setEditAssignee(specificTask.assignee);
      setEditDate(specificTask.date);
      setEditPriority(specificTask.priority);
      setEditLabel(specificTask.label);
    }
  }, [specificTask]);

  useEffect(() => {
    const editTask = tasks.find((task) => task.id === id);

    if (editTask) {
      setEditTitle(editTask.title);
      setEditAssignee(editTask.assignee);
      setEditPriority(editTask.priority);
      setEditDate(editTask.date);
      setEditLabel(editTask.label);
    }
  }, [edit, id, tasks]);

  const { title, assignee, date, priority, label } = specificTask ?? {
    title: "",
    assignee: "",
    date: "",
    priority: "",
    label: [],
  };

  if (!specificTask && !isDeleted) {
    return <div className="text-white text-center">Loading Task...</div>;
  }

  function toggleOverlay() {
    setIsClicked((prev) => !prev);
  }

  function handleEdit() {
    setEdit(true);
  }

  const handleCloseModal = () => {
    setEdit(false);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedTask: taskProps = {
      title: editTitle,
      assignee: editAssignee,
      date: editDate,
      priority: editPriority,
      label: editLabel,
      boardId,
    };

    // setTask((prevTask) =>
    //   prevTask.map((task) => (task.id === id ? updatedTask : task))
    // );

    try {
      setEdit(false);
      setIsClicked(false);
      await updateTask(updatedTask, params.projectId, id, "PUT");
      await fetchTaskData();
    } catch (error) {
      console.log("Failed to update task", error);
    }
  };

  const handleDelete = async (id: string | undefined) => {
    setTasks((prevTask) => prevTask.filter((t) => t.id !== id));
    setIsDeleted(true);
    await deleteTask(params.projectId, id);
  };

  const handleDrag = (task: taskProps) => {
    dragCtx.setDraggableTask({ task });
  };

  const handleLabelChange = (index: number, value: string) => {
    const updatedLabels = [...editLabel];
    updatedLabels[index] = value;
    setEditLabel(updatedLabels);
  };

  const handleAddLabel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (editLabel.length < 2) {
      setEditLabel((label) => [...label, ""]);
    }
  };

  const handleRemoveLabel = (index: number) => {
    const updatedLabels = [...editLabel];
    updatedLabels.splice(index, 1);
    setEditLabel(updatedLabels);
  };

  return (
    <>
      <div
        draggable
        onDragStart={() => handleDrag(specificTask)}
        className="bg-[#000] w-78 h-auto py-4 px-6 rounded-xl relative"
      >
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-white text-xl font-bold mb-2">{title}</h1>

            <p
              className={
                priority === "High"
                  ? "bg-[ #3C1F20] text-[#FF4C4C] rounded-3xl w-25 px-2 py-2"
                  : "text-white"
              }
            >
              {priority}
            </p>
          </div>

          <button className="text-white cursor-pointer" onClick={toggleOverlay}>
            <Ellipsis />
          </button>
        </div>

        <div className="flex gap-4 mt-4">
          {label.map((l, index) => (
            <p
              key={index}
              className="text-white font-semibold bg-[#121212] rounded-xl shadow-lg px-2 py-2 mb-2"
            >
              {l}
            </p>
          ))}
        </div>
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

        <div className="flex items-center justify-between">
          <p className="text-[#ccc] font-bold">{assignee}</p>
          <div className="flex items-center gap-2">
            <CalendarDays size={16} color="#ccc" />
            <p className=" text-[#ccc]">{date}</p>
          </div>
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
            <label className="text-white">Assignee</label>
            <input
              type="text"
              required
              placeholder="John Doe"
              className="bg-black h-[35px] rounded px-4 py-4 text-white"
              name="assign"
              value={editAssignee}
              onChange={(e) => setEditAssignee(e.target.value)}
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

          <div className="flex flex-col gap-2">
            <label className="text-white">Add Label(s)</label>
            <div
              className={
                editLabel.length < 2
                  ? "flex justify-between"
                  : "flex flex-col gap-2"
              }
            >
              {editLabel.map((label, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    required
                    name=""
                    value={label}
                    placeholder={index === 0 ? "Backend" : "Another Label"}
                    onChange={(e) => handleLabelChange(index, e.target.value)}
                    className=" bg-black h-[35px] w-[100%] rounded px-4 py-4 text-white "
                  />
                  {editLabel.length === 2 && (
                    <button
                      className="text-white cursor-pointer hover:text-[#af74d7]"
                      onClick={() => handleRemoveLabel(index)}
                    >
                      <Minus />
                    </button>
                  )}
                </div>
              ))}

              {editLabel.length < 2 && (
                <button
                  className="text-white cursor-pointer hover:text-[#af74d7]"
                  onClick={handleAddLabel}
                >
                  <PlusIcon />
                </button>
              )}
            </div>
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
