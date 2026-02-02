const homeworks = [
    {
      subject: "Physics",
      title: "Write about Theory of Pendulum",
      teacher: "Aaron",
      due: "16 Jun 2024",
      percent: 90,
      color: "green",
      img: 12,
    },
    {
      subject: "Chemistry",
      title: "Chemistry - Change of Elements",
      teacher: "Hallana",
      due: "18 Jun 2024",
      percent: 65,
      color: "blue",
      img: 32,
    },
    {
      subject: "Maths",
      title: "Maths - Problems to Solve Page 21",
      teacher: "Morgan",
      due: "21 Jun 2024",
      percent: 30,
      color: "yellow",
      img: 45,
    },
    {
      subject: "English",
      title: "English - Vocabulary Introduction",
      teacher: "Daniel Josua",
      due: "21 Jun 2024",
      percent: 10,
      color: "red",
      img: 56,
    },
  ];
  
  export default function HomeWorksCard() {
    return (
      <div className="bg-white border rounded-xl p-5 h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-sm">Home Works</h4>
          <select className="text-xs border rounded px-2 py-1 text-gray-500">
            <option>All Subject</option>
          </select>
        </div>
  
        {/* List */}
        <div className="space-y-4">
          {homeworks.map((hw, i) => (
            <div key={i} className="flex items-center gap-4">
              <img
                src={`https://i.pravatar.cc/50?img=${hw.img}`}
                className="w-12 h-12 rounded-lg"
              />
  
              <div className="flex-1">
                <p className={`text-sm font-medium text-${hw.color}-600`}>
                  {hw.subject}
                </p>
                <p className="text-sm font-medium">{hw.title}</p>
                <p className="text-xs text-gray-500">
                  {hw.teacher} | Due by : {hw.due}
                </p>
              </div>
  
              {/* Progress Circle */}
              <div className="relative w-10 h-10">
                <svg className="w-full h-full rotate-[-90deg]">
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    stroke="#E5E7EB"
                    strokeWidth="4"
                    fill="none"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    stroke={
                      hw.color === "green"
                        ? "#22C55E"
                        : hw.color === "blue"
                        ? "#3B82F6"
                        : hw.color === "yellow"
                        ? "#FACC15"
                        : "#EF4444"
                    }
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${hw.percent} 100`}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                  {hw.percent}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  