import { useState } from "react";
import { Info, ChevronDown } from "lucide-react";

import student1 from "../assets/student1.png";
import student2 from "../assets/student2.png";
import student3 from "../assets/student3.png";
import student4 from "../assets/student4.png";

export default function LastDashboardWidgets() {
  /* ================= TOP SUBJECT STATE ================= */
  const [selectedClass, setSelectedClass] = useState("Class II");
  const [showClassList, setShowClassList] = useState(false);

  const subjectsByClass: Record<string, any[]> = {
    "Class I": [
      { name: "Maths", value: "bg-blue-500 w-[30%]" },
      { name: "English", value: "bg-yellow-500 w-[40%]" },
    ],
    "Class II": [
      { name: "Maths", value: "bg-blue-500 w-[35%]" },
      { name: "Physics", value: "bg-cyan-500 w-[45%]" },
      { name: "Chemistry", value: "bg-blue-700 w-[65%]" },
      { name: "Botany", value: "bg-green-500 w-[55%]" },
      { name: "English", value: "bg-yellow-500 w-[75%]" },
      { name: "Spanish", value: "bg-red-500 w-[85%]" },
    ],
    "Class III": [
      { name: "Maths", value: "bg-blue-600 w-[60%]" },
      { name: "Science", value: "bg-green-500 w-[70%]" },
      { name: "English", value: "bg-yellow-500 w-[80%]" },
    ],
  };

  /* ================= STUDENT ACTIVITY ================= */
  const [showAllActivity, setShowAllActivity] = useState(false);

  const activities = [
    {
      title: '1st place in "Chess"',
      desc: "This event took place in Our School",
      img: student1,
    },
    {
      title: 'Participated in "Carrom"',
      desc: 'Justin Lee participated in "Carrom"',
      img: student2,
    },
    {
      title: '1st place in "100M"',
      desc: "This event took place in Our School on sports day",
      img: student3,
    },
    {
      title: "International conference",
      desc: 'Conference held in "Germany"',
      img: student4,
    },
    {
      title: "Science Exhibition",
      desc: "Won 2nd prize in Science Expo",
      img: student1,
    },
  ];

  /* ================= TODO ================= */
  const [showAllTodo, setShowAllTodo] = useState(false);

  const todos = [
    { title: "Send Reminder to Students", time: "01:00 PM", status: "Completed" },
    { title: "Create Routine to new staff", time: "04:50 PM", status: "Inprogress" },
    { title: "Extra Class Info to Students", time: "04:55 PM", status: "Yet to Start" },
    { title: "Fees for Upcoming Academics", time: "04:55 PM", status: "Yet to Start" },
    { title: "English - Essay on Visit", time: "05:55 PM", status: "Yet to Start" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* ================= TOP SUBJECTS ================= */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center justify-between mb-4 relative">
          <h3 className="text-base font-semibold">Top Subjects</h3>

          {/* CLASS SELECT */}
          <button
            onClick={() => setShowClassList(!showClassList)}
            className="text-sm text-gray-500 flex items-center gap-1"
          >
            {selectedClass}
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* DROPDOWN */}
          {showClassList && (
            <div className="absolute right-0 top-8 bg-white border rounded-lg shadow z-10">
              {["Class I","Class II","Class III","Class IV","Class V","Class VI","Class VII","Class VIII","Class IX","Class X"].map(cls => (
                <div
                  key={cls}
                  onClick={() => {
                    setSelectedClass(cls);
                    setShowClassList(false);
                  }}
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                >
                  {cls}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-start gap-2 p-4 mb-6 rounded-lg bg-green-50 text-green-700 text-sm">
          <Info className="w-4 h-4 mt-0.5" />
          These Result are obtained from the syllabus completion on the respective Class
        </div>

        <div className="space-y-4">
          {(subjectsByClass[selectedClass] || []).map((item, i) => (
            <div key={i}>
              <p className="text-sm text-gray-600 mb-1">{item.name}</p>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div className={`h-2 rounded-full ${item.value}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= STUDENT ACTIVITY ================= */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex justify-between mb-6">
          <h3 className="text-base font-semibold">Student Activity</h3>
          <button
            onClick={() => setShowAllActivity(!showAllActivity)}
            className="text-sm text-blue-600"
          >
            {showAllActivity ? "Show Less" : "View All"}
          </button>
        </div>

        <div className="space-y-4">
          {(showAllActivity ? activities : activities.slice(0, 4)).map((a, i) => (
            <div key={i} className="flex gap-4 p-4 border rounded-xl">
              <img src={a.img} className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <p className="text-sm font-semibold">{a.title}</p>
                <p className="text-sm text-gray-500">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= TODO ================= */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex justify-between mb-6">
          <h3 className="text-base font-semibold">Todo</h3>
          <button
            onClick={() => setShowAllTodo(!showAllTodo)}
            className="text-sm text-blue-600"
          >
            {showAllTodo ? "Show Less" : "View All"}
          </button>
        </div>

        <div className="space-y-4">
          {(showAllTodo ? todos : todos.slice(0, 3)).map((t, i) => (
            <div key={i} className="flex justify-between p-4 border rounded-xl">
              <div>
                <p className="text-sm font-medium">{t.title}</p>
                <p className="text-sm text-gray-400">{t.time}</p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-md
                  ${t.status === "Completed" && "bg-green-100 text-green-700"}
                  ${t.status === "Inprogress" && "bg-blue-100 text-blue-700"}
                  ${t.status === "Yet to Start" && "bg-yellow-100 text-yellow-700"}
                `}
              >
                {t.status}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
