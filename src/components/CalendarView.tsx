import dayjs from "dayjs";
import { useState, type FC } from "react";

type Task = {
  id: string;
  title: string;
  date: string; // ISO format: "2025-07-25"
  projectId: string;
  status: string;
  priority: string;
};

type Project = {
  id: string;
  name: string;
};

interface CalendarViewProps {
  tasks: Task[];
  projects: Project[];
}

const CalendarView: FC<CalendarViewProps> = ({ tasks, projects }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const startOfMonth = currentMonth.startOf("month").startOf("week");
  const endOfMonth = currentMonth.endOf("month").endOf("week");

  const calendarDays = [];
  let day = startOfMonth;

  while (day.isBefore(endOfMonth, "day")) {
    calendarDays.push(day);
    day = day.add(1, "day");
  }
  return (
    <div className="bg-[#141217] border-[#3E3A45] border-2 border-solid p-4 rounded-xl text-white mt-12">
      <div className="flex justify-end items-center">
        {/* <h2 className="text-xl font-bold">
          Project Calendar - {currentMonth.format("MMMM YYYY")}
        </h2> */}
        <div className="space-x-8">
          <button
            onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
            className="cursor-pointer"
          >
            Prev
          </button>
          <button
            onClick={() => setCurrentMonth(dayjs())}
            className="cursor-pointer"
          >
            Today
          </button>
          <button
            onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
            className="cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7">
        {["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"].map((d) => (
          <div key={d} className="font-semibold text-center text-[#ccc] mb-4 mt-2">
            {d}
          </div>
        ))}

        {calendarDays.map((date) => {
          const dailyTasks = tasks.filter((task) =>
            dayjs(task.date).isSame(date, "day")
          );

          return (
            <div
              key={date.toString()}
              className={`h-28 border p-1 rounded-lg ${
                date.month() !== currentMonth.month() ? "text-gray-500" : ""
              }`}
            >
              <div className="text-sm font-bold">{date.date()}</div>
              {dailyTasks.map((task) => (
                <div
                  key={task.id}
                  className="mt-1 text-xs bg-blue-600 rounded px-1 truncate"
                  title={task.title}
                >
                  {task.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
