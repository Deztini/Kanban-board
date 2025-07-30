import type { generalProjectProps } from "../types/types";

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
