import {
  Users,
  BedDouble,
  IndianRupee,
  CheckCircle,
  Download,
  CalendarDays,
  Filter,
  TrendingUp,
  Building,
  RefreshCcw,
  Printer,
  ArrowUpDown,
} from "lucide-react";

export default function HostelReports() {
  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div className="bg-white border rounded-2xl px-6 py-5">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Hostel Reports
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Dashboard / Hostel Management / Reports
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
              <Download size={16} />
              Export Report
            </button>

          </div>
        </div>
      </div>

      {/* ================= FILTER SECTION ================= */}
      <div className="bg-white border rounded-xl px-6 py-5">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* DATE */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-2 block">
              Report Date
            </label>

            <div className="flex items-center border rounded-lg px-4 py-2.5">

              <CalendarDays
                size={18}
                className="text-gray-400"
              />

              <input
                type="date"
                className="w-full outline-none ml-3 text-sm"
              />
            </div>
          </div>

          {/* HOSTEL */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-2 block">
              Hostel
            </label>

            <select className="w-full border rounded-lg px-4 py-2.5 text-sm outline-none">
              <option>All Hostels</option>
              <option>Boys Hostel</option>
              <option>Girls Hostel</option>
            </select>
          </div>

          {/* REPORT TYPE */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-2 block">
              Report Type
            </label>

            <select className="w-full border rounded-lg px-4 py-2.5 text-sm outline-none">
              <option>Occupancy Report</option>
              <option>Fee Report</option>
              <option>Attendance Report</option>
              <option>Complaint Report</option>
            </select>
          </div>

          {/* BUTTON */}
          <div className="flex items-end">

            <button className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white px-4 py-2.5 rounded-lg text-sm">

              <Filter size={16} />

              Generate Report

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
                Total Students
              </p>

              <h3 className="text-2xl font-semibold mt-2 text-blue-600">
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
                Occupancy Rate
              </p>

              <h3 className="text-2xl font-semibold mt-2 text-green-600">
                92%
              </h3>
            </div>

            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <BedDouble className="text-green-600" size={22} />
            </div>

          </div>
        </div>

        {/* CARD */}
        <div className="bg-white border rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Fee Collection
              </p>

              <h3 className="text-2xl font-semibold mt-2 text-orange-600">
                ₹12.5L
              </h3>
            </div>

            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <IndianRupee className="text-orange-600" size={22} />
            </div>

          </div>
        </div>

        {/* CARD */}
        <div className="bg-white border rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Attendance Rate
              </p>

              <h3 className="text-2xl font-semibold mt-2 text-purple-600">
                96%
              </h3>
            </div>

            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <CheckCircle className="text-purple-600" size={22} />
            </div>

          </div>
        </div>

      </div>

      {/* ================= REPORT CARDS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* OCCUPANCY */}
        <div className="bg-white border rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-5">

            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Building className="text-blue-600" size={22} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Occupancy Report
              </h3>

              <p className="text-sm text-gray-500">
                Hostel room occupancy details
              </p>
            </div>

          </div>

          <div className="space-y-4">

            <div className="flex items-center justify-between border rounded-xl p-4">

              <div>
                <p className="font-medium text-gray-800 text-sm">
                  Boys Hostel A
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  140 / 150 Occupied
                </p>
              </div>

              <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-600">
                93%
              </span>

            </div>

            <div className="flex items-center justify-between border rounded-xl p-4">

              <div>
                <p className="font-medium text-gray-800 text-sm">
                  Girls Hostel B
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  120 / 130 Occupied
                </p>
              </div>

              <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-600">
                92%
              </span>

            </div>

          </div>
        </div>

        {/* FEES */}
        <div className="bg-white border rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-5">

            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <TrendingUp className="text-green-600" size={22} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Fee Collection Report
              </h3>

              <p className="text-sm text-gray-500">
                Monthly hostel fee summary
              </p>
            </div>

          </div>

          <div className="space-y-4">

            <div className="flex items-center justify-between border rounded-xl p-4">

              <div>
                <p className="font-medium text-gray-800 text-sm">
                  Total Fees
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Current Semester
                </p>
              </div>

              <p className="font-semibold text-gray-800">
                ₹15,00,000
              </p>

            </div>

            <div className="flex items-center justify-between border rounded-xl p-4">

              <div>
                <p className="font-medium text-gray-800 text-sm">
                  Collected
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Paid Students
                </p>
              </div>

              <p className="font-semibold text-green-600">
                ₹12,50,000
              </p>

            </div>

          </div>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-x-auto">

        <div className="flex items-center justify-between px-6 py-4 border-b">

          <h3 className="text-base font-semibold">
            Recent Hostel Activities
          </h3>

          <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm">
            <ArrowUpDown size={14} />
            Sort
          </button>

        </div>

        <table className="min-w-full text-sm">

          <thead className="bg-gray-50">

            <tr>
              <th className="px-4 py-3 text-center">
                Activity
              </th>

              <th className="px-4 py-3 text-center">
                Hostel
              </th>

              <th className="px-4 py-3 text-center">
                Date
              </th>

              <th className="px-4 py-3 text-center">
                Status
              </th>
            </tr>

          </thead>

          <tbody>

            <tr className="border-t hover:bg-gray-50">

              <td className="px-4 py-3 text-center">
                Fee Collection Updated
              </td>

              <td className="px-4 py-3 text-center">
                Boys Hostel A
              </td>

              <td className="px-4 py-3 text-center">
                12 Jun 2026
              </td>

              <td className="px-4 py-3 text-center">

                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-600">
                  ● Completed
                </span>

              </td>

            </tr>

            <tr className="border-t hover:bg-gray-50">

              <td className="px-4 py-3 text-center">
                Room Maintenance
              </td>

              <td className="px-4 py-3 text-center">
                Girls Hostel B
              </td>

              <td className="px-4 py-3 text-center">
                14 Jun 2026
              </td>

              <td className="px-4 py-3 text-center">

                <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-600">
                  ● In Progress
                </span>

              </td>

            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
}