import type { FC } from "react";
import Projectboard from "../components/Projectboard";
import { useParams } from "react-router-dom";

const Mainboard: FC = () => {
  const params = useParams();

  // const name = localStorage.getItem("userName");

  return (
    <>
      <div className="min-h-screen bg-black px-8 py-12">
        <h1 className="text-white text-3xl mb-2 text-center">
          {params.projectId} PROJECT BOARD
        </h1>
        <p className="text-[#ccc] text-center">
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
