import type { FC } from "react";
import { useState } from "react";
import { Check } from "lucide-react";

type ColorPickerProps = {
  setColor: (color: string) => void;
};

const colors = [
  { id: 1, col: "bg-red-500", border: "border-red-500" },
  { id: 2, col: "bg-blue-500", border: "border-blue-500" },
  { id: 3, col: "bg-green-500", border: "border-green-500" },
  { id: 4, col: "bg-purple-500", border: "border-purple-500" },
  { id: 5, col: "bg-orange-500", border: "border-orange-500" },
  { id: 6, col: "bg-pink-500", border: "border-pink-500" },
];

const ColorPicker: FC<ColorPickerProps> = ({ setColor }) => {
  const [colorId, setColorId] = useState<number | null>();

  function colorPickedHandler(id: number, borderColor: string) {
    setColorId(id);
    setColor(borderColor);
  }

  return (
    <>
      <div className="flex gap-4">
        {colors.map((color) => {
          return (
            <div
              key={color.id}
              className={`h-8 w-8 rounded-full border-white border-2 border-solid ${color.col} cursor-pointer py-1 px-0.5`}
              onClick={() => {
                colorPickedHandler(color.id, color.border);
              }}
            >
              {colorId === color.id && <Check />}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ColorPicker;
