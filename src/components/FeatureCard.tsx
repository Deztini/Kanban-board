import type { FC } from "react";
import type { featureProps } from "../types/types";

const FeatureCard: FC<featureProps> = ({
  id,
  icon: Icon,
  title,
  description,
}) => {
  return (
    <>
      <div className="w-70 h-75 bg-[#121212] py-6 px-5 rounded-xl shadow-2xl">
        <div className="bg-[#000] rounded-full w-12 px-2 py-3 flex justify-center">
          <Icon />
        </div>
        <h1 className="text-white text-2xl font-bold mt-2">{title}</h1>
        <p className="text-[#ccc] text-xs mt-8">{description}</p>
      </div>
    </>
  );
};

export default FeatureCard;
