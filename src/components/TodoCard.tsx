import { CalendarDays } from "lucide-react";

const todos = [
  {
    title: "Send Reminder to Students",
    time: "01:00 PM",
    status: "Completed",
  },
  {
    title: "Create Routine to new staff",
    time: "04:50 PM",
    status: "Inprogress",
  },
  {
    title: "Extra Class Info to Students",
    time: "04:55 PM",
    status: "Yet to Start",
  },
  {
    title: "Fees for Upcoming Academics",
    time: "04:55 PM",
    status: "Yet to Start",
  },
  {
    title: "English - Essay on Visit",
    time: "05:10 PM",
    status: "Yet to Start",
  },
];

const statusStyle = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-600";
    case "Inprogress":
      return "bg-blue-100 text-blue-600";
    default:
      return "bg-yellow-100 text-yellow-600";
  }
};

export default function TodoCard() {
  return (
    <div className="bg-white rounded-xl border">
      
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h3 className="text-sm font-semibold">Todo</h3>
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <CalendarDays className="w-4 h-4" />
          Today
        </span>
      </div>

      {/* LIST */}
      <div className="divide-y">
        {todos.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 px-4 py-3"
          >
            {/* CHECKBOX */}
            <input
              type="checkbox"
              className="mt-1 w-4 h-4 accent-blue-600"
              defaultChecked={item.status === "Completed"}
            />

            {/* TEXT */}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {item.title}
              </p>
              <p className="text-xs text-gray-500">
                {item.time}
              </p>
            </div>

            {/* STATUS */}
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyle(
                item.status
              )}`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
