import type { FC } from "react";
import MyPieChart from "./MyPieChart";
import MyBarChart from "./MyBarChart";

const DashboardSection: FC = () => {
  return (
    <div className="flex gap-4 mt-8 ">
      <div className="bg-[#141217] border-[#3E3A45] border-2 border-solid shadow-2xl w-[280px] h-[290px] px-4 py-4 rounded-xl">
        <h1 className="text-white text-2xl font-bold mb-2">
          Project Status Breakdown
        </h1>
        <MyPieChart />
      </div>

      <div className="bg-[#141217] border-[#3E3A45] border-2 border-solid shadow-2xl w-[280px] h-[290px] px-4 py-4 rounded-xl flex-col items-center">
        <h1 className="text-white text-2xl font-bold mb-2 text-left">
          Task Priority Breakdown
        </h1>
        <div className="w-full flex justify-center">
          <MyBarChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
