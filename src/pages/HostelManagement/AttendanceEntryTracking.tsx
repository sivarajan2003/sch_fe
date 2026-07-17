import { useState, useEffect } from "react";
import {
  CalendarCheck,
  ScanLine,
  Search,
  Filter,
  Plus,
  Eye,
Edit,
  CheckCircle,
  AlertTriangle,
  RefreshCcw,
  Printer,
  ArrowUpDown,
} from "lucide-react";
import {
  getAttendanceEntries,
  createAttendanceEntry,
  updateAttendanceEntry,
  deleteAttendanceEntry,
} from "../../service/attendanceEntryService";
export default function AttendanceEntryTracking() {

  // const attendanceData = [
  //   {
  //     id: "AT1001",
  //     student: "Siva Kumar",
  //     initial: "SK",
  //     regNo: "21ISR049",
  //     hostel: "Boys Hostel A",
  //     room: "A-101",
  //     checkIn: "07:15 AM",
  //     checkOut: "-",
  //     status: "Present",
  //     entryType: "Check In",
  //     color: "blue",
  //     year: "Final Year",
  //   },
  // ];

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [attendanceList, setAttendanceList] =
  useState<any[]>([]);

const [editId, setEditId] =
  useState<string | null>(null);

//   const [attendanceList, setAttendanceList] = useState<any[]>(() => {
//   const savedData = localStorage.getItem("attendanceData");

//   return savedData
//     ? JSON.parse(savedData)
//     : attendanceData;
// });

const [viewData, setViewData] = useState<any>(null);

  const [formData, setFormData] = useState({
    student: "",
    regNo: "",
    hostel: "",
    room: "",
    checkIn: "",
    checkOut: "",
    status: "",
    entryType: "",
  });
  useEffect(() => {
  fetchAttendance();
}, []);

const fetchAttendance = async () => {

  try {

    const res =
      await getAttendanceEntries();

    setAttendanceList(
      res.data.rows || []
    );

  } catch (err) {

    console.log(err);

  }
};
  const filtered = attendanceList.filter(
    (d) =>
      (d.student ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (d.regNo ?? '').toLowerCase().includes(search.toLowerCase())
  );
const handleSave = async () => {

  try {

    if (editId) {

      await updateAttendanceEntry(
        editId,
        formData
      );

    } else {

      await createAttendanceEntry(
        formData
      );

    }

    fetchAttendance();

    setShowModal(false);

    setEditId(null);

    setFormData({
      student: "",
      regNo: "",
      hostel: "",
      room: "",
      checkIn: "",
      checkOut: "",
      status: "",
      entryType: "",
    });

  } catch (err) {

    console.log(err);

  }
};
// useEffect(() => {
//   localStorage.setItem(
//     "attendanceData",
//     JSON.stringify(attendanceList)
//   );
// }, [attendanceList]);
  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div className="bg-white border rounded-2xl px-6 py-5">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Attendance & Entry Tracking
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Dashboard / Hostel Management / Attendance Tracking
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

<button
  onClick={() => setShowModal(true)}
  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 text-sm"
>
                <Plus size={16} />
              Mark Attendance
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
                Present Students
              </p>

              <h3 className="text-2xl font-semibold mt-2 text-green-600">
                {
  attendanceList.filter(
    (d) => d.status === "Present"
  ).length
}
              </h3>
            </div>

            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <CheckCircle className="text-green-600" size={22} />
            </div>

          </div>
        </div>

        {/* CARD */}
        <div className="bg-white border rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Outside Hostel
              </p>

              <h3 className="text-2xl font-semibold mt-2 text-orange-600">
                {
  attendanceList.filter(
    (d) => d.status === "Outside"
  ).length
}
              </h3>
            </div>

            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <ScanLine className="text-orange-600" size={22} />
            </div>

          </div>
        </div>

        {/* CARD */}
        <div className="bg-white border rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Late Entries
              </p>

              <h3 className="text-2xl font-semibold mt-2 text-red-600">
              {
  attendanceList.filter(
    (d) => d.status === "Late Entry"
  ).length
}
              </h3>
            </div>

            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
              <AlertTriangle className="text-red-600" size={22} />
            </div>

          </div>
        </div>

        {/* CARD */}
        <div className="bg-white border rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Today Check-ins
              </p>

              <h3 className="text-2xl font-semibold mt-2 text-blue-600">
              {
  attendanceList.filter(
    (d) => d.entryType === "Check In"
  ).length
}
              </h3>
            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <CalendarCheck className="text-blue-600" size={22} />
            </div>

          </div>
        </div>

      </div>

      {/* ================= SEARCH ================= */}
      <div className="bg-white border rounded-xl px-6 py-4 space-y-4">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <h3 className="text-base font-semibold">
            Attendance List
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
            Total Records : {filtered.length}
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
<div className="hidden lg:block bg-white border rounded-xl overflow-x-auto">

        <table className="min-w-full text-sm">

          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-center">Student</th>
              <th className="px-4 py-3 text-center">Register No</th>
              <th className="px-4 py-3 text-center">Hostel</th>
              <th className="px-4 py-3 text-center">Room No</th>
              <th className="px-4 py-3 text-center">Check In</th>
              <th className="px-4 py-3 text-center">Check Out</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Entry Type</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>

{filtered.length === 0 ? (

<tr>

<td
  colSpan={9}
  className="text-center py-10 text-gray-500"
>
  No Data Found
</td>

</tr>

) : (

filtered.map((d) => (
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

                <td className="px-4 py-3 text-center">
                  {d.regNo}
                </td>

                <td className="px-4 py-3 text-center">
                  {d.hostel}
                </td>

                <td className="px-4 py-3 text-center">
                  {d.room}
                </td>

                <td className="px-4 py-3 text-center text-green-600 font-medium">
                  {d.checkIn}
                </td>

                <td className="px-4 py-3 text-center text-red-600 font-medium">
                  {d.checkOut}
                </td>

                <td className="px-4 py-3 text-center">

                  <span
                    className={`px-2 py-1 rounded-full text-xs
                    ${
                      d.status === "Present"
                        ? "bg-green-100 text-green-600"
                        : d.status === "Outside"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    ● {d.status}
                  </span>

                </td>

                <td className="px-4 py-3 text-center">

                  <span
                    className={`px-2 py-1 rounded-full text-xs
                    ${
                      d.entryType === "Check In"
                        ? "bg-blue-100 text-blue-600"
                        : d.entryType === "Check Out"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {d.entryType}
                  </span>

                </td>

                <td className="px-4 py-3 text-center">

                  <div className="flex items-center justify-center gap-3">

  {/* VIEW BUTTON */}
  <button
    onClick={() => setViewData(d)}
    className="text-blue-600 hover:text-blue-800"
  >
    <Eye size={18} />
  </button>

  {/* EDIT BUTTON */}
  <button
    onClick={() => {

      setFormData({
        student: d.student,
        regNo: d.regNo,
        hostel: d.hostel,
        room: d.room,
        checkIn: d.checkIn,
        checkOut: d.checkOut,
        status: d.status,
        entryType: d.entryType,
      });

      setEditId(d.id);

      setShowModal(true);

    }}
    className="text-yellow-600 hover:text-yellow-800"
  >
    <Edit size={18} />
  </button>

  {/* DELETE BUTTON */}
  <button
    onClick={async () => {

      await deleteAttendanceEntry(
        d.id
      );

      fetchAttendance();

    }}
    className="text-red-600 hover:text-red-800"
  >
    Delete
  </button>

</div>

                </td>

              </tr>
            ))

)}

          </tbody>
        </table>
      </div>

{/* ================= MOBILE & TABLET VIEW ================= */}

<div className="lg:hidden space-y-4">

  {filtered.length === 0 ? (

    <div className="bg-white border rounded-2xl p-8 text-center text-gray-500">
      No Data Found
    </div>

  ) : (

    filtered.map((d) => (

      <div
        key={d.id}
        className="bg-white border rounded-2xl p-4 space-y-4"
      >

        {/* TOP */}

        <div className="flex justify-between items-start">

          <div>

            <p className="font-semibold text-gray-800">
              {d.student}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              {d.regNo}
            </p>

          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs
            ${
              d.status === "Present"
                ? "bg-green-100 text-green-600"
                : d.status === "Outside"
                ? "bg-orange-100 text-orange-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            ● {d.status}
          </span>

        </div>

        {/* DETAILS */}

        <div className="grid grid-cols-2 gap-4 text-sm">

          <div>
            <p className="text-gray-500">
              Hostel
            </p>

            <p className="font-medium">
              {d.hostel}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Room
            </p>

            <p className="font-medium">
              {d.room}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Check In
            </p>

            <p className="font-medium text-green-600">
              {d.checkIn}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Check Out
            </p>

            <p className="font-medium text-red-600">
              {d.checkOut}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Entry Type
            </p>

            <p className="font-medium">
              {d.entryType}
            </p>
          </div>

        </div>

        {/* ACTIONS */}

        <div className="grid grid-cols-3 gap-3">

          <button
            onClick={() => setViewData(d)}
            className="border rounded-xl py-2 text-sm hover:bg-blue-50"
          >
            View
          </button>

          <button
            onClick={() => {

              setFormData({
                student: d.student,
                regNo: d.regNo,
                hostel: d.hostel,
                room: d.room,
                checkIn: d.checkIn,
                checkOut: d.checkOut,
                status: d.status,
                entryType: d.entryType,
              });

              setEditId(d.id);

              setShowModal(true);

            }}
            className="border rounded-xl py-2 text-sm hover:bg-yellow-50"
          >
            Edit
          </button>

          <button
            onClick={async () => {

              await deleteAttendanceEntry(
                d.id
              );

              fetchAttendance();

            }}
            className="border rounded-xl py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Delete
          </button>

        </div>

      </div>

    ))
  )}

</div>

{/* ================= MODAL ================= */}

{showModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

    <div className="bg-white rounded-2xl w-full max-w-3xl p-6">

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold">
          Mark Attendance
        </h2>

        <button
          onClick={() => setShowModal(false)}
          className="text-gray-500 text-xl"
        >
          ✕
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          placeholder="Student Name"
          value={formData.student}
          onChange={(e) =>
            setFormData({ ...formData, student: e.target.value })
          }
          className="border rounded-lg px-3 py-2"
        />

        <input
          placeholder="Register No"
          value={formData.regNo}
          onChange={(e) =>
            setFormData({ ...formData, regNo: e.target.value })
          }
          className="border rounded-lg px-3 py-2"
        />

        <input
          placeholder="Hostel"
          value={formData.hostel}
          onChange={(e) =>
            setFormData({ ...formData, hostel: e.target.value })
          }
          className="border rounded-lg px-3 py-2"
        />

        <input
          placeholder="Room No"
          value={formData.room}
          onChange={(e) =>
            setFormData({ ...formData, room: e.target.value })
          }
          className="border rounded-lg px-3 py-2"
        />

        <input
          type="time"
          value={formData.checkIn}
          onChange={(e) =>
            setFormData({ ...formData, checkIn: e.target.value })
          }
          className="border rounded-lg px-3 py-2"
        />

        <input
          type="time"
          value={formData.checkOut}
          onChange={(e) =>
            setFormData({ ...formData, checkOut: e.target.value })
          }
          className="border rounded-lg px-3 py-2"
        />

        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({ ...formData, status: e.target.value })
          }
          className="border rounded-lg px-3 py-2"
        >
          <option value="">Select Status</option>
          <option value="Present">Present</option>
          <option value="Outside">Outside</option>
          <option value="Late Entry">Late Entry</option>
        </select>

        <select
          value={formData.entryType}
          onChange={(e) =>
            setFormData({ ...formData, entryType: e.target.value })
          }
          className="border rounded-lg px-3 py-2"
        >
          <option value="">Select Entry Type</option>
          <option value="Check In">Check In</option>
          <option value="Check Out">Check Out</option>
          <option value="Late Check In">Late Check In</option>
        </select>

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Save
        </button>

      </div>
    </div>
  </div>
)}
{/* VIEW MODAL */}

{viewData && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

    <div className="bg-white rounded-2xl w-full max-w-2xl p-6">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-xl font-semibold">
          Student Details
        </h2>

        <button
          onClick={() => setViewData(null)}
          className="text-xl"
        >
          ✕
        </button>

      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">

        <div>
          <p className="text-gray-500">Student</p>
          <h3>{viewData.student}</h3>
        </div>

        <div>
          <p className="text-gray-500">Register No</p>
          <h3>{viewData.regNo}</h3>
        </div>

        <div>
          <p className="text-gray-500">Hostel</p>
          <h3>{viewData.hostel}</h3>
        </div>

        <div>
          <p className="text-gray-500">Room</p>
          <h3>{viewData.room}</h3>
        </div>

        <div>
          <p className="text-gray-500">Check In</p>
          <h3>{viewData.checkIn}</h3>
        </div>

        <div>
          <p className="text-gray-500">Check Out</p>
          <h3>{viewData.checkOut}</h3>
        </div>

        <div>
          <p className="text-gray-500">Status</p>
          <h3>{viewData.status}</h3>
        </div>

        <div>
          <p className="text-gray-500">Entry Type</p>
          <h3>{viewData.entryType}</h3>
        </div>

      </div>
    </div>
  </div>
)}
    </div>
  );
}