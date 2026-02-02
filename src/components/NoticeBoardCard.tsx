import {
    BookOpen,
    Globe,
    Bell,
    Laptop,
    CalendarDays,
  } from "lucide-react";
  
  const notices = [
    {
      title: "New Syllabus Instructions",
      date: "Added on : 11 Mar 2024",
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "World Environment Day",
      date: "Added on : 21 Apr 2024",
      icon: Globe,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Exam Preparation Notification!",
      date: "Added on : 13 Mar 2024",
      icon: Bell,
      color: "bg-red-100 text-red-500",
    },
    {
      title: "Online Classes Preparation",
      date: "Added on : 24 May 2024",
      icon: Laptop,
      color: "bg-cyan-100 text-cyan-600",
    },
    {
      title: "Exam Time Table Release",
      date: "Added on : 24 May 2024",
      icon: CalendarDays,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];
  
  export default function NoticeBoardCard() {
    return (
      <div className="bg-white rounded-xl border p-5">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-semibold">Notice Board</h3>
          <button className="text-xs text-blue-600 font-medium">
            View All
          </button>
        </div>
  
        {/* LIST */}
        <div className="space-y-3">
          {notices.map((n, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <div className={`w-9 h-9 flex items-center justify-center rounded-lg ${n.color}`}>
                <n.icon size={16} />
              </div>
  
              <div className="flex-1">
                <p className="text-sm font-medium">{n.title}</p>
                <p className="text-xs text-gray-500">{n.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  