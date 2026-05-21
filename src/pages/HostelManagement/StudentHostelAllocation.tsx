import { useState } from "react";
import {
  Users,
  BedDouble,
  Building,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  RefreshCcw,
  Printer,
  ArrowUpDown,
} from "lucide-react";

export default function StudentHostelAllocation() {
  const [search, setSearch] = useState("");

  const allocationData = [
    {
      id: "AL1001",
      student: "Siva Kumar",
      initial: "SK",
      regNo: "21ISR049",
      department: "M.Sc Software Systems",
      hostel: "Boys Hostel A",
      room: "A-101",
      bed: "Bed 2",
      date: "12 Jun 2026",
      status: "Active",
      color: "blue",
      year: "III Year",
    },
    {
      id: "AL1002",
      student: "Priya R",
      initial: "PR",
      regNo: "22ISR112",
      department: "Computer Science",
      hostel: "Girls Hostel B",
      room: "G-204",
      bed: "Bed 5",
      date: "14 Jun 2026",
      status: "Active",
      color: "pink",
      year: "II Year",
    },
    {
      id: "AL1003",
      student: "Arun Raj",
      initial: "AR",
      regNo: "20ISR087",
      department: "Information Technology",
      hostel: "Boys Hostel A",
      room: "A-305",
      bed: "Bed 1",
      date: "20 Jun 2026",
      status: "Pending",
      color: "orange",
      year: "Final Year",
    },
  ];

  const filtered = allocationData.filter(
    (d) =>
      d.student.toLowerCase().includes(search.toLowerCase()) ||
      d.regNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div className="bg-white border rounded-2xl px-6 py-5">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Student Hostel Allocation
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Dashboard / Hostel Management / Student Allocation
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-3">

            <button className="p-2.5 border rounded-lg">
              <RefreshCcw size={16} />
            </button>

            <button className="p-2.5 border rounded-lg">
              <Printer size={16} />
            </button>

            <button className="px-4 py-2 border rounded-lg text-sm">
              Export
            </button>

            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 text-sm">
              <Plus size={16} />
              Allocate Student
            </button>

          </div>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

        {/* CARD */}
        <div className="bg-white border rounded-2xl p-5">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Allocated
              </p>

              <h3 className="text-2xl font-semibold mt-2">
                540
              </h3>
            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Users className="text-blue-600" size={22} />
            </div>

          </div>
        </div>

        {/* CARD */}
        <div className="bg-white border rounded-2xl p-5">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Boys Hostel
              </p>

              <h3 className="text-2xl font-semibold mt-2 text-indigo-600">
                310
              </h3>
            </div>

            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Building className="text-indigo-600" size={22} />
            </div>

          </div>
        </div>

        {/* CARD */}
        <div className="bg-white border rounded-2xl p-5">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Girls Hostel
              </p>

              <h3 className="text-2xl font-semibold mt-2 text-pink-600">
                230
              </h3>
            </div>

            <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
              <Building className="text-pink-600" size={22} />
            </div>

          </div>
        </div>

        {/* CARD */}
        <div className="bg-white border rounded-2xl p-5">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Vacant Beds
              </p>

              <h3 className="text-2xl font-semibold mt-2 text-green-600">
                45
              </h3>
            </div>

            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <BedDouble className="text-green-600" size={22} />
            </div>

          </div>
        </div>

      </div>

      {/* ================= SEARCH + FILTER ================= */}
      <div className="bg-white border rounded-xl px-6 py-4 space-y-4">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <h3 className="text-base font-semibold">
            Allocation List
          </h3>

          <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-3">

            <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm">
              <Filter size={14} />
              Filter
            </button>

            <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm">
              <ArrowUpDown size={14} />
              Sort By
            </button>

          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="text-sm text-gray-500">
            Total Allocations : {filtered.length}
          </div>

          <div className="relative w-full sm:w-64">

            <Search
              size={16}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              placeholder="Search Student"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg pl-9 pr-3 py-2 text-sm w-full"
            />

          </div>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-x-auto">

        <table className="min-w-full text-sm">

          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-center">Student</th>
              <th className="px-4 py-3 text-center">Register No</th>
              <th className="px-4 py-3 text-center">Department</th>
              <th className="px-4 py-3 text-center">Hostel</th>
              <th className="px-4 py-3 text-center">Room No</th>
              <th className="px-4 py-3 text-center">Bed No</th>
              <th className="px-4 py-3 text-center">Allocation Date</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>

            {filtered.map((d) => (
              <tr
                key={d.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-4 py-3">

                  <div className="flex items-center gap-3">

                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm
                      ${
                        d.color === "blue"
                          ? "bg-blue-100 text-blue-700"
                          : d.color === "pink"
                          ? "bg-pink-100 text-pink-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {d.initial}
                    </div>

                    <div>
                      <p className="font-medium text-gray-800 text-sm">
                        {d.student}
                      </p>

                      <p className="text-xs text-gray-500">
                        {d.year}
                      </p>
                    </div>

                  </div>

                </td>

                <td className="px-4 py-3 text-center text-gray-700">
                  {d.regNo}
                </td>

                <td className="px-4 py-3 text-center text-gray-700">
                  {d.department}
                </td>

                <td className="px-4 py-3 text-center">
                  {d.hostel}
                </td>

                <td className="px-4 py-3 text-center">
                  {d.room}
                </td>

                <td className="px-4 py-3 text-center">
                  {d.bed}
                </td>

                <td className="px-4 py-3 text-center">
                  {d.date}
                </td>

                <td className="px-4 py-3 text-center">

                  <span
                    className={`px-2 py-1 rounded-full text-xs
                    ${
                      d.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    ● {d.status}
                  </span>

                </td>

                <td className="px-4 py-3 text-center">

                  <div className="flex items-center justify-center gap-3">

                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye size={18} />
                    </button>

                    <button className="text-yellow-600 hover:text-yellow-800">
                      <Edit size={18} />
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}