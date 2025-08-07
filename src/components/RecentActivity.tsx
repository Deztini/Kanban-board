import type { FC } from "react";
import { useTheme } from "../hooks/useTheme";

const DUMMY_DATA = [
  {
    name: "AJ",
    activity: "Alice Johnson  completed task 'Setup CI/CD' on Website Redesign",
    publishedTime: "2 mins ago",
    textColor: "#fff",
    bgColor: "blue",
  },
  {
    name: "BS",
    activity:
      "Bob Smith  added a new comment on 'Database Schema' on Backend API",
    publishedTime: "15 mins ago",
    textColor: "#000",
    bgColor: "#fff",
  },
  {
    name: "CB",
    activity:
      "Charlie Brown  updated status of 'Design Mockups' to In Progress on Mobile App V2",
    publishedTime: "1 hour ago",
    textColor: "#fff",
    bgColor: "#ccc",
  },
];

const RecentActivity: FC = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-[#141217] border-[#3E3A45] border-2 border-solid "
          : "bg-[#ffff] border border-[#ccc]"
      } shadow-2xl w-[280px] h-[300px] px-4 py-4 rounded-xl mt-6`}
    >
      <h1 className="font-bold text-xl">Recent Activity</h1>
      {DUMMY_DATA.map((item) => (
        <div className="my-2">
          <div className="flex items-center gap-2 mb-2">
            <p
              style={{
                color: `${item.textColor}`,
                backgroundColor: `${item.bgColor}`,
              }}
              className="rounded-full px-2 py-1"
            >
              {item.name}
            </p>
            <h1 className="font-semibold text-xs">{item.activity}</h1>
          </div>
          <p className="text-left">{item.publishedTime}</p>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;
