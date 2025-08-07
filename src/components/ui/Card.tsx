import type { FC } from "react";
import type { cardProps } from "../../types/types";
import { useTheme } from "../../hooks/useTheme";

const Card: FC<cardProps> = ({
  title,
  value,
   description,
  icon: Icon,
  iconColor,
}) => {
  const {theme} = useTheme();
  return (
    <div className={`${theme === "dark" ? "bg-[#141217] border-[#3E3A45] border-2 border-solid ": "bg-[#ffff] border border-[#ccc]"} shadow-2xl w-[280px] h-[150px] px-4 py-4 rounded-xl`}>
      <div className="flex justify-between">
        <h1 className="font-bold text-xl">{title}</h1>
        <Icon color={iconColor} />
      </div>

      <p className="mt-2 text-2xl">{value}</p>
      <p className="text-xs mt-2">{ description}</p>
    </div>
  );
};

export default Card;
