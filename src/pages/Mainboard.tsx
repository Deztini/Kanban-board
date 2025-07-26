import type { FC } from "react";
import { Plus } from "lucide-react";
import Projectboard from "../components/Projectboard";
import Modal from "../components/UI/Modal";
import { useState } from "react";
import ColorPicker from "../components/ColorPicker";
import type { ProjectProps } from "../types/types";
import boardImg from "../assets/boardimage.jpg";
import { useParams } from "react-router-dom";

const Mainboard: FC = () => {
  const params = useParams();

  const name = localStorage.getItem("userName");

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
            borderColors="border-purple-500"
          />
          <Projectboard
            projectTitle="In Progress"
            boardId="In Progress"
            borderColors="border-pink-500"
          />
          <Projectboard
            projectTitle="Review"
            boardId="Review"
            borderColors="border-orange-500"
          />
          <Projectboard
            projectTitle="Done"
            boardId="Done"
            borderColors="border-blue-500"
          />
        </div>
      </div>
    </>
  );
};

export default Mainboard;
