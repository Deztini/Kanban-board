import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Mainboard from "./pages/Mainboard";
import TaskContextProvider from "./store/context/project-context";
import DraggableContextProvider from "./store/context/draggable-context";
import RootLayout from "./pages/Root";
import Dashboard from "./pages/Dashboard";
import ProjectsPage from "./pages/Projects";
import TeamManagement from "./pages/TeamManagement";
import CalendarPage from "./pages/Calendar";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },
    {
      path: "/projectpulse",
      element: <RootLayout />,
      children: [
        {
          path: "/projectpulse/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/projectpulse/projects",
          element: <ProjectsPage />,
        },
        {
          path: "/projectpulse/teams",
          element: <TeamManagement />
        },
         {
          path: "/projectpulse/calendar",
          element: <CalendarPage />
        },
      ],
    },
    {
      path: "/projectpulse/projects/:projectId",
      element: <Mainboard />,
    },
  ]);

  return (
    <>
      <TaskContextProvider>
        <DraggableContextProvider>
          <RouterProvider router={router} />
        </DraggableContextProvider>
      </TaskContextProvider>
    </>
  );
}

export default App;
