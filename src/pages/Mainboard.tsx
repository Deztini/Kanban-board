import { useEffect, useState, type FC } from "react";
import Projectboard from "../components/Projectboard";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const BACKEND_API = import.meta.env.VITE_BACKEND_URL;

const Mainboard: FC = () => {
  const [project, setProject] = useState();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpecificProject = async () => {
      try {
        const response = await fetch(
          BACKEND_API + `projects/${params.projectId}.json`
        );
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.log("Failed to fetch data", error);
      }
    };
    fetchSpecificProject();
  }, []);

  return (
    <>
      <div className="min-h-screen px-8 py-12">
        <div className="flex gap-74 items-center">
          <button
            onClick={() => navigate(-1)}
            className="text-white bg-[#af74d7] hover:bg-[#c885f5] rounded-lg px-4 py-2 font-medium flex items-center cursor-pointer"
          >
            <ChevronLeft />
            <span>Back To All Projects</span>
          </button>
          <h1 className="text-3xl mb-2 text-center uppercase">
            {!project ? (
              "loading project..."
            ) : (
              `${project?.title.toUpperCase()} project board`
            )}
          </h1>
        </div>

        <p className="   text-center">
          {" "}
          Manage your project tasks efficiently with drag-and-drop
          functionality.
        </p>

        <div className="flex gap-4 flex-nowrap mt-8">
          <Projectboard
            projectTitle="To Do"
            boardId="To Do"
            borderColors="border-[#3E3A45]"
          />
          <Projectboard
            projectTitle="In Progress"
            boardId="In Progress"
            borderColors="border-[#3E3A45]"
          />
          <Projectboard
            projectTitle="Review"
            boardId="Review"
            borderColors="border-[#3E3A45]"
          />
          <Projectboard
            projectTitle="Done"
            boardId="Done"
            borderColors="border-[#3E3A45]"
          />
        </div>
      </div>
    </>
  );
};

export default Mainboard;
