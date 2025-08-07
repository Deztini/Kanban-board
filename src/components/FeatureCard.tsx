import type { FC } from "react";
import type { featureProps } from "../types/types";
import { useTheme } from "../hooks/useTheme";

const FeatureCard: FC<featureProps> = ({
  id,
  icon: Icon,
  title,
  description,
}) => {
  const { theme } = useTheme();
  return (
    <>
      <div
        className={`w-70 h-75  py-6 px-5 rounded-xl shadow-2xl ${
          theme === "light" ? "bg-[#dcd9d9] text-black" : "bg-[#121212]"
        }`}
      >
        <div className="rounded-full w-12 px-2 py-3 flex justify-center">
          <Icon />
        </div>
        <h1 className=" text-2xl font-bold mt-2">{title}</h1>
        <p className="text-xs mt-8">{description}</p>
      </div>
    </>
  );
};

export default FeatureCard;
