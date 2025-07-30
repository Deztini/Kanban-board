import { CalendarDays } from "lucide-react";
import type { FC } from "react";

const DUMMY_DATA = [
  {
    activity: "Alice Smith changed role of Bob Johnson to Member.",
    dateTime: "2024-07-28 10:30 AM",
  },
  {
    activity: "Diana Prince invited new member: chris.t@example.com.",
    dateTime: "2024-07-28 09:15 AM",
  },
  {
    activity: "Harry Potter removed user Grace Hoppers.",
    dateTime: "2024-07-27 05:00 PM",
  },
  {
    activity: "Alice Smith updated team settings.",
    dateTime: "2024-07-27 02:45 PM",
  },
];

const TeamActivity: FC = () => {
  return (
    <div className="bg-[#141217] border-[#3E3A45] border-2 border-solid shadow-2xl w-[580px] h-auto px-4 py-4 rounded-xl mt-12">
      <h1 className="text-white font-bold text-2xl">Recent Activity</h1>
      <p className="text-[#ccc] font-semibold text-[16px] mt-2">
        Recent changes and actions within your team.
      </p>
      <div className="my-4 border-1 border-solid border-[#3E3A45]"></div>

      {DUMMY_DATA.map((item) => (
        <div className="my-4">
          <div className="flex items-center gap-3">
            <CalendarDays color="gray" />
            <div>
              <span className="text-white text-xl">{item.activity}</span>
              <div className="text-[#ccc] text-[14px]">{item.dateTime}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamActivity;
