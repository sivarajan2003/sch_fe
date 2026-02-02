import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ReferenceLine,
  } from "recharts";
  
  const data = [
    { name: "Quarter 1", score: 80, attendance: 75 },
    { name: "Quarter 2", score: 70, attendance: 65 },
    { name: "Half yearly", score: 60, attendance: 55 },
    { name: "Model", score: 65, attendance: 60 },
    { name: "Final Exam", score: 85, attendance: 80 },
  ];
  
  export default function StudentPerformanceCard() {
    return (
      <div className="bg-white border rounded-xl p-5">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold">Performance</h4>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            📅 2024 - 2025
          </div>
        </div>
  
        {/* CHART */}
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              {/* GRADIENTS */}
              <defs>
                <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.02} />
                </linearGradient>
  
                <linearGradient id="attendanceFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#22D3EE" stopOpacity={0.02} />
                </linearGradient>
              </defs>
  
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
  
              {/* VERTICAL DOTTED LINE */}
              <ReferenceLine
                x="Half yearly"
                stroke="#94A3B8"
                strokeDasharray="3 3"
              />
  
              {/* TOOLTIP */}
              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  border: "1px solid #E5E7EB",
                  fontSize: "12px",
                }}
              />
  
              {/* AREA LINES */}
              <Area
                type="monotone"
                dataKey="score"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#scoreFill)"
                dot={false}
              />
  
              <Area
                type="monotone"
                dataKey="attendance"
                stroke="#22D3EE"
                strokeWidth={2}
                fill="url(#attendanceFill)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
  
        {/* LEGEND */}
        <div className="flex gap-6 mt-4 text-xs text-gray-600">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Avg Score : 72%
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
            Avg Attendance : 95%
          </span>
        </div>
      </div>
    );
  }
  