import type { FC } from "react";
import DashboardCard from "../components/DashboardCard";
import { LoaderCircle } from "lucide-react";
import { SquareChartGantt } from "lucide-react";
import { CircleCheck } from "lucide-react";
import { CalendarDays } from "lucide-react";
import ProjectStatus from "../components/DashboardSection";
import DashboardSection from "../components/DashboardSection";
import RecentActivity from "../components/RecentActivity";
import Deadlines from "../components/Deadlines";

const Dashboard: FC = () => {
  return (
    <div className="mt-4">
      <h1 className="text-white font-bold text-4xl ">Dashboard Overview</h1>

      <div className="flex gap-4 mt-8">
        <DashboardCard
          title="Total Active Projects"
          value={28}
          progress="+5 since last month"
          icon={SquareChartGantt}
          iconColor="blue"
        />
        <DashboardCard
          title="Tasks In Progress"
          value={174}
          progress="Currently being worked on"
          icon={LoaderCircle}
          iconColor="yellow"
        />
        <DashboardCard
          title="Currently being worked on"
          value={86}
          progress="This week"
          icon={CircleCheck}
          iconColor="green"
        />
        <DashboardCard
          title="Overdue Tasks"
          value={12}
          progress="Requires immediate attention"
          icon={CalendarDays}
          iconColor="red"
        />
      </div>

      <div className="flex gap-4 items-center mt-10">
        <DashboardSection />
        <RecentActivity />
        <Deadlines />
      </div>
    </div>
  );
};

export default Dashboard;
