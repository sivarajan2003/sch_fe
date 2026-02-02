const syllabus = [
    { name: "Maths", percent: 70, color: "bg-blue-600" },
    { name: "Physics", percent: 40, color: "bg-cyan-400" },
    { name: "Chemistry", percent: 65, color: "bg-indigo-600" },
    { name: "Botany", percent: 55, color: "bg-green-600" },
    { name: "English", percent: 80, color: "bg-yellow-500" },
    { name: "Spanish", percent: 90, color: "bg-red-500" },
  ];
  
  export default function SyllabusCard() {
    return (
      <div className="bg-white rounded-xl border p-5">
        <h3 className="text-sm font-semibold mb-3">Syllabus</h3>
  
        <div className="text-xs bg-blue-50 text-blue-600 rounded-lg p-3 mb-4">
          These Result are obtained from the syllabus completion on the respective Class
        </div>
  
        <div className="space-y-4">
          {syllabus.map((s, i) => (
            <div key={i}>
              <div className="flex justify-between text-xs mb-1">
                <span>{s.name}</span>
              </div>
  
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div
                  className={`h-2 rounded-full ${s.color}`}
                  style={{ width: `${s.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  