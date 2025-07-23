import { createContext, useState } from "react";
import type { taskProps } from "../../types/types";

export const DraggableContext = createContext<{
  draggableTask: { task: taskProps } | null;
  setDraggableTask: React.Dispatch<
    React.SetStateAction<{ task: taskProps } | null>
  >;
}>({
  draggableTask: null,
  setDraggableTask: () => {},
});

export default function DraggableContextProvider({ children }) {
  const [draggableTask, setDraggableTask] = useState<{
    task: taskProps;
  } | null>(null);
  const contextValue = {
    draggableTask,
    setDraggableTask,
  };
  return <DraggableContext value={contextValue}>{children}</DraggableContext>;
}
