import type { FC } from "react";
import { PieChart, ResponsiveContainer, Pie, Cell, Tooltip } from "recharts";

const pieData = [
  { name: "On Track", value: 60 },
  { name: "At Risk", value: 25 },
  { name: "Completed", value: 15 },
];

const COLORS = ["#4B84FE", "#141217", "#000000"];

const MyPieChart: FC = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={pieData}
          paddingAngle={3}
          innerRadius={50}
          outerRadius={70}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
        >
          {pieData.map((item, index) => (
            <Cell key={`item-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default MyPieChart;
