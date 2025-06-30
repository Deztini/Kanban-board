import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Mainboard from "./pages/Mainboard";

function App() {
  const router = createBrowserRouter([
    {path: "/", element: <Home />  },
    {path: "/signup", element: <Signup /> },
    {path: "/login", element: <Login /> },
    {path: "/board", element: <Mainboard /> }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
