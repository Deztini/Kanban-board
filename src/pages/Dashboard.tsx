import type { FC } from "react";
import Card from "../components/UI/Card";
import { LoaderCircle } from "lucide-react";
import { SquareChartGantt } from "lucide-react";
import { CircleCheck } from "lucide-react";
import { CalendarDays } from "lucide-react";
import DashboardSection from "../components/DashboardSection";
import RecentActivity from "../components/RecentActivity";
import Deadlines from "../components/Deadlines";

const Dashboard: FC = () => {
  return (
    <div className="mt-4">
      <h1 className="font-bold text-4xl ">Dashboard Overview</h1>

      <div className="flex gap-4 mt-8">
        <Card
          title="Total Active Projects"
          value={28}
           description="+5 since last month"
          icon={SquareChartGantt}
          iconColor="blue"
        />
        <Card
          title="Tasks In  description"
          value={174}
           description="Currently being worked on"
          icon={LoaderCircle}
          iconColor="yellow"
        />
        <Card
          title="Currently being worked on"
          value={86}
           description="This week"
          icon={CircleCheck}
          iconColor="green"
        />
        <Card
          title="Overdue Tasks"
          value={12}
           description="Requires immediate attention"
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
