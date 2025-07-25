import type { FC } from "react";
import type { cardProps } from "../../types/types";

const Card: FC<cardProps> = ({
  title,
  value,
   description,
  icon: Icon,
  iconColor,
}) => {
  return (
    <div className="bg-[#141217] border-[#3E3A45] border-2 border-solid shadow-2xl w-[280px] h-[150px] px-4 py-4 rounded-xl">
      <div className="flex justify-between">
        <h1 className="text-[#ccc] font-bold text-xl">{title}</h1>
        <Icon color={iconColor} />
      </div>

      <p className="text-white mt-2 text-2xl">{value}</p>
      <p className="text-[#ccc] text-xs mt-2">{ description}</p>
    </div>
  );
};

export default Card;
