import { createContext, useState } from "react";
import type { taskProps } from "../../types/types";

interface TaskContextType {
  tasks: taskProps[];
  setTasks: React.Dispatch<React.SetStateAction<taskProps[]>>;
}

export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  setTasks: () => {},
});

export default function TaskContextProvider({children}) {
  const [tasks, setTasks] = useState<taskProps[]>([]);

  const contextValue = {
    tasks,
    setTasks,
  };

  return <TaskContext value={contextValue}>{children}</TaskContext>;
}
