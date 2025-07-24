import type { FC } from "react";
import {
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  Cell,
} from "recharts";

const barData = [
  { name: "High", value: 40 },
  { name: "Medium", value: 80 },
  { name: "Low", value: 55 },
];

const COLORS = ["#FF4C4C", "#F6C43E", "#BDBDBD"];

const MyBarChart: FC = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={barData} barSize={30}>
        <XAxis dataKey="name"  />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" isAnimationActive={false} activeBar={false}>
          {barData.map((item, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MyBarChart;
