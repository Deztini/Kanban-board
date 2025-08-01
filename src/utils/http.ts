import type { generalProjectProps, taskProps } from "../types/types";

const BACKEND_API = import.meta.env.VITE_BACKEND_URL;

export const storeProjects = async (projectData: generalProjectProps) => {
  try {
    const response = await fetch(BACKEND_API + "projects.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      throw new Error(`Failed to store project: ${response.status}`);
    }

    const data = await response.json();

    console.log("Project stored successfully", data);
    return data.name;
  } catch (error) {
    console.log("Error storing project", error);
  }
};

export const fetchProjects = async () => {
  try {
    const response = await fetch(BACKEND_API + "projects.json");

    if (!response.ok) {
      throw new Error(`Failed to fetch project: ${response.status}`);
    }

    const data = await response.json();

    const loadedProjects = Object.entries(data).map(([id, project]) => ({
      id,
      ...(project as generalProjectProps),
    }));
    console.log("Project fetched successfully", loadedProjects);
    return loadedProjects;
  } catch (error) {
    console.log("Error fetching project", error);
  }
};

export const storeTask = async (
  taskData: taskProps,
  projectId: string | undefined
) => {
  try {
    const response = await fetch(
      BACKEND_API + `projects/${projectId}/tasks.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to store task: ${response.status}`);
    }

    const data = await response.json();

    console.log("Task stored successfully", data);
    return data.name;
  } catch (error) {
    console.log("Error storing task", error);
  }
};

export const fetchTask = async (projectId: string | undefined) => {
  try {
    const response = await fetch(
      BACKEND_API + `projects/${projectId}/tasks.json`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch task: ${response.status}`);
    }

    const data = await response.json();

    const loadedTask = Object.entries(data).map(([id, task]) => ({
      id,
      ...(task as taskProps),
    }));
    console.log("Task fetched successfully", loadedTask);
    return loadedTask;
  } catch (error) {
    console.log("Error fetching task", error);
  }
};

export const updateTask = async (
  taskData: Partial<taskProps>,
  projectId: string | undefined,
  taskId: string | undefined,
  requestMethod: string
) => {
  try {
    const response = await fetch(
      BACKEND_API + `projects/${projectId}/tasks/${taskId}.json`,
      {
        method: requestMethod,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update task: ${response.status}`);
    }

    const data = await response.json();

    console.log("Task updated successfully", data);
    return data.name;
  } catch (error) {
    console.log("Error updating task", error);
  }
};

export const deleteTask = async (
  projectId: string | undefined,
  taskId: string | undefined
) => {
  try {
    const response = await fetch(
      BACKEND_API + `projects/${projectId}/tasks/${taskId}.json`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
    console.log("Task deleted successfully");
  } catch (error) {
    console.log("Error deleting task:", error);
  }
};
