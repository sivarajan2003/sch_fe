import { Pencil } from "lucide-react";

export default function StudentProfileCard() {
  return (
    <div className="bg-gradient-to-br from-[#0B1023] to-[#141A3A] text-white rounded-xl p-4 relative overflow-hidden">

      {/* TOP */}
      <div className="flex gap-4 items-start">
        <img
          src="https://i.pravatar.cc/100?img=32"
          alt="student"
          className="w-14 h-14 rounded-lg object-cover"
        />

        <div className="flex-1">
          <span className="text-xs bg-blue-600 px-2 py-0.5 rounded-md">
            #ST1234546
          </span>

          <h3 className="mt-1 text-lg font-semibold">
            Angelo Riana
          </h3>

          <p className="text-xs text-gray-300">
            Class : III, C &nbsp;|&nbsp; Roll No : #36545
          </p>
        </div>

        <div className="text-yellow-400">
          ▶
        </div>
      </div>

      {/* BOTTOM */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-300">1st Quarterly</span>
          <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded">
            Pass
          </span>
        </div>

        <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-xs px-3 py-1.5 rounded-lg">
          <Pencil className="w-3 h-3" />
          Edit Profile
        </button>
      </div>
    </div>
  );
}
