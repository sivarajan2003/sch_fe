import { toast } from "react-toastify";
//ComplaintsMaintenance.tsx
import { useState, useEffect } from "react";
import {
  Wrench,
  Clock3,
  CheckCircle,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  MessageSquareWarning,
  RefreshCcw,
  Printer,
  ArrowUpDown,
} from "lucide-react";
import {
  getComplaints,
  createComplaint,
  updateComplaint,
  deleteComplaint,
} from '../../service/complaintsmaintenanceService';
export default function ComplaintsMaintenance() {
  const [search, setSearch] = useState("");
const [showModal, setShowModal] = useState(false);

const [viewData, setViewData] = useState<any>(null);
const [editData, setEditData] =
  useState<any>(null);

const [deleteId, setDeleteId] =
  useState<string | null>(null);

const [filterStatus, setFilterStatus] = useState("");

const [sortOrder, setSortOrder] = useState("asc");
  // const defaultComplaintData = [
  //   {
  //     id: "CMP-1001",
  //     student: "Siva Kumar",
  //     initial: "SK",
  //     regNo: "21ISR049",
  //     hostel: "Boys Hostel A",
  //     room: "A-101",
  //     issue: "Water Leakage",
  //     priority: "High",
  //     date: "12 Jun 2026",
  //     status: "Pending",
  //     color: "blue",
  //   },
  //   {
  //     id: "CMP-1002",
  //     student: "Priya R",
  //     initial: "PR",
  //     regNo: "22ISR112",
  //     hostel: "Girls Hostel B",
  //     room: "G-204",
  //     issue: "Fan Repair",
  //     priority: "Medium",
  //     date: "13 Jun 2026",
  //     status: "In Progress",
  //     color: "pink",
  //   },
  //   {
  //     id: "CMP-1003",
  //     student: "Arun Raj",
  //     initial: "AR",
  //     regNo: "20ISR087",
  //     hostel: "Boys Hostel A",
  //     room: "A-305",
  //     issue: "WiFi Issue",
  //     priority: "Low",
  //     date: "14 Jun 2026",
  //     status: "Resolved",
  //     color: "orange",
  //   },
  // ];
const [complaintData, setComplaintData] =
  useState<any[]>([]);
  const filtered = complaintData
  .filter(
    (d) =>
      d.student
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (d.regNo || "")
  .toLowerCase()
        .includes(search.toLowerCase())
  )
  .filter((d) =>
    filterStatus
      ? d.status === filterStatus
      : true
  )
  .sort((a, b) =>
    sortOrder === "asc"
      ? a.student.localeCompare(b.student)
      : b.student.localeCompare(a.student)
  );
useEffect(() => {
  fetchComplaints();
}, []);
const fetchComplaints = async () => {
  try {
    const res = await getComplaints();

    setComplaintData(res.data.data);
  } catch (error) {
    console.log(error);
  }
};
const [formData, setFormData] = useState({
  student: "",
  hostel: "",
  room: "",
  issue: "",
  priority: "",
  date: "",
});
const handleSave = async () => {

  try {

    const payload = {
      student: formData.student,
      hostel: formData.hostel,
      room: formData.room,
      issue: formData.issue,
      priority: formData.priority,
      date: formData.date,
      regNo: "AUTO",
    };

    console.log("PAYLOAD =>", payload);

    const res = await createComplaint(payload);

    console.log("SAVE RESPONSE =>", res.data);

    await fetchComplaints();

    setFormData({
      student: "",
      hostel: "",
      room: "",
      issue: "",
      priority: "",
      date: "",
    });

    setShowModal(false);

    toast.success("Complaint Added Successfully");

  } catch (error: any) {

    console.log("SAVE ERROR =>", error);

    console.log(
      "BACKEND ERROR =>",
      error?.response?.data
    );

    toast.info(
      error?.response?.data?.message ||
      "Save Failed"
    );
  }
};
  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-6">

      {/* ================= HEADER ================= */}
      <div className="bg-white border rounded-2xl px-4 sm:px-6 py-5">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Complaints & Maintenance
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Dashboard / Hostel Management / Complaints
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">

            <button
  onClick={fetchComplaints}
  className="p-2.5 border rounded-lg"
>
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
  className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 text-sm"
>

              <Plus size={16} />
              Add Complaint
            </button>

          </div>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* CARD */}
        <div className="bg-white border rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Complaints
              </p>

              <h3 className="text-2xl font-semibold mt-2 text-blue-600">
                {complaintData.length}
              </h3>
            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <MessageSquareWarning className="text-blue-600" size={22} />
            </div>

          </div>
        </div>

        {/* CARD */}
        <div className="bg-white border rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Pending
              </p>

              <h3 className="text-2xl font-semibold mt-2 text-orange-600">
                {
  complaintData.filter(
    (d) => d.status === "Pending"
  ).length
}
              </h3>
            </div>

            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <Clock3 className="text-orange-600" size={22} />
            </div>

          </div>
        </div>

        {/* CARD */}
        <div className="bg-white border rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                In Progress
              </p>

              <h3 className="text-2xl font-semibold mt-2 text-yellow-600">
               {
  complaintData.filter(
    (d) => d.status === "In Progress"
  ).length
}
              </h3>
            </div>

            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
              <Wrench className="text-yellow-600" size={22} />
            </div>

          </div>
        </div>

        {/* CARD */}
        <div className="bg-white border rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Resolved
              </p>

              <h3 className="text-2xl font-semibold mt-2 text-green-600">
               {
  complaintData.filter(
    (d) => d.status === "Resolved"
  ).length
}
              </h3>
            </div>

            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <CheckCircle className="text-green-600" size={22} />
            </div>

          </div>
        </div>

      </div>

      {/* ================= SEARCH ================= */}
      <div className="bg-white border rounded-xl px-4 sm:px-6 py-4 space-y-4">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <h3 className="text-base font-semibold">
            Complaint List
          </h3>

<div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
<select
  value={filterStatus}
  onChange={(e) =>
    setFilterStatus(e.target.value)
  }
  className="w-full sm:w-auto px-3 py-2 border rounded-lg text-sm"
>
  <option value="">All Status</option>
  <option value="Pending">Pending</option>
  <option value="In Progress">In Progress</option>
  <option value="Resolved">Resolved</option>
</select>

            <select
  value={sortOrder}
  onChange={(e) =>
    setSortOrder(e.target.value)
  }
  className="w-full sm:w-auto px-3 py-2 border rounded-lg text-sm"
>
  <option value="asc">A-Z</option>
  <option value="desc">Z-A</option>
</select>

          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">

          <div className="text-sm text-gray-500">
            Total Complaints : {filtered.length}
          </div>

          <div className="relative w-full sm:w-64">

            <Search
              size={16}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              placeholder="Search Complaint"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg pl-9 pr-3 py-2 text-sm w-full"
            />

          </div>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="hidden lg:block bg-white border rounded-xl overflow-x-auto w-full">

        <table className="min-w-[1000px] w-full text-sm">

          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-center">Complaint ID</th>
              <th className="px-4 py-3 text-center">Student</th>
              <th className="px-4 py-3 text-center">Hostel</th>
              <th className="px-4 py-3 text-center">Room</th>
              <th className="px-4 py-3 text-center">Issue Type</th>
              <th className="px-4 py-3 text-center">Priority</th>
              <th className="px-4 py-3 text-center">Date</th>
              <th className="px-4 py-3 text-center">Status</th>
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

                <td className="px-4 py-3 text-center text-blue-600 font-medium">
                 {d.complaint_id}
                </td>

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
                        {d.regNo}
                      </p>
                    </div>

                  </div>

                </td>

                <td className="px-4 py-3 text-center">
                  {d.hostel}
                </td>

                <td className="px-4 py-3 text-center">
                  {d.room}
                </td>

                <td className="px-4 py-3 text-center">

                  <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-600">
                    {d.issue}
                  </span>

                </td>

                <td className="px-4 py-3 text-center">

                  <span
                    className={`px-2 py-1 rounded-full text-xs
                    ${
                      d.priority === "High"
                        ? "bg-red-100 text-red-600"
                        : d.priority === "Medium"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {d.priority}
                  </span>

                </td>

                <td className="px-4 py-3 text-center">
                  {d.date}
                </td>

                <td className="px-4 py-3 text-center">

                  <span
                    className={`px-2 py-1 rounded-full text-xs
                    ${
                      d.status === "Pending"
                        ? "bg-orange-100 text-orange-600"
                        : d.status === "In Progress"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    ● {d.status}
                  </span>

                </td>

                <td className="px-4 py-3 text-center">

                  <div className="flex flex-wrap items-center justify-center gap-2">

                    <button
  onClick={() => setViewData(d)}
  className="text-blue-600 hover:text-blue-800"
>
                      <Eye size={18} />
                    </button>

                    <button
  onClick={() => setEditData(d)}
  className="text-yellow-600 hover:text-yellow-800"
>
                      <Edit size={18} />

                    </button>
                    <button
  onClick={() => setDeleteId(d.id)}
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

    <div className="bg-white border rounded-2xl p-6 text-center text-gray-500">
      No Data Found
    </div>

  ) : (

    filtered.map((d) => (

      <div
        key={d.id}
        className="bg-white border rounded-2xl p-4 space-y-4"
      >

        {/* TOP */}
        <div className="flex justify-between items-start gap-3">

          <div>

            <p className="text-blue-600 font-semibold text-sm">
              {d.complaint_id}
            </p>

            <p className="font-semibold text-gray-800 mt-1">
              {d.student}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              {d.regNo}
            </p>

          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs
            ${
              d.status === "Pending"
                ? "bg-orange-100 text-orange-600"
                : d.status === "In Progress"
                ? "bg-blue-100 text-blue-600"
                : "bg-green-100 text-green-600"
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
              Issue
            </p>

            <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-600">
              {d.issue}
            </span>
          </div>

          <div>
            <p className="text-gray-500">
              Priority
            </p>

            <span
              className={`px-2 py-1 rounded-full text-xs
              ${
                d.priority === "High"
                  ? "bg-red-100 text-red-600"
                  : d.priority === "Medium"
                  ? "bg-orange-100 text-orange-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {d.priority}
            </span>
          </div>

          <div>
            <p className="text-gray-500">
              Date
            </p>

            <p className="font-medium">
              {d.date}
            </p>
          </div>

        </div>

        {/* ACTIONS */}
        <div className="grid grid-cols-3 gap-3">

          {/* VIEW */}
          <button
            onClick={() => setViewData(d)}
            className="flex items-center justify-center gap-2 border rounded-xl py-2.5 text-sm hover:bg-blue-50"
          >
            <Eye size={15} />
            View
          </button>

          {/* EDIT */}
          <button
            onClick={() => setEditData(d)}
            className="flex items-center justify-center gap-2 border rounded-xl py-2.5 text-sm hover:bg-yellow-50"
          >
            <Edit size={15} />
            Edit
          </button>

          {/* DELETE */}
          <button
            onClick={() => setDeleteId(d.id)}
            className="flex items-center justify-center gap-2 border rounded-xl py-2.5 text-sm text-red-600 hover:bg-red-50"
          >
            Delete
          </button>

        </div>

      </div>

    ))
  )}
</div>
      {/* ADD COMPLAINT MODAL */}

{showModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

    <div className="bg-white rounded-2xl w-full max-w-3xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-xl font-semibold">
          Add Complaint
        </h2>

        <button
          onClick={() => setShowModal(false)}
          className="text-xl"
        >
          ✕
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          placeholder="Student"
          value={formData.student}
          onChange={(e) =>
            setFormData({
              ...formData,
              student: e.target.value,
            })
          }
          className="border rounded-lg px-3 py-2 w-full"
        />

        <input
          placeholder="Hostel"
          value={formData.hostel}
          onChange={(e) =>
            setFormData({
              ...formData,
              hostel: e.target.value,
            })
          }
         className="border rounded-lg px-3 py-2 w-full"
        />

        <input
          placeholder="Room"
          value={formData.room}
          onChange={(e) =>
            setFormData({
              ...formData,
              room: e.target.value,
            })
          }
          className="border rounded-lg px-3 py-2 w-full"
        />

        <input
          placeholder="Issue Type"
          value={formData.issue}
          onChange={(e) =>
            setFormData({
              ...formData,
              issue: e.target.value,
            })
          }
          className="border rounded-lg px-3 py-2 w-full"
        />

        <select
          value={formData.priority}
          onChange={(e) =>
            setFormData({
              ...formData,
              priority: e.target.value,
            })
          }
          className="border rounded-lg px-3 py-2 w-full"
        >
          <option value="">Select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <input
          type="date"
          value={formData.date}
          onChange={(e) =>
            setFormData({
              ...formData,
              date: e.target.value,
            })
          }
          className="border rounded-lg px-3 py-2 w-full"
        />

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

   <div className="bg-white rounded-2xl w-full max-w-2xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-xl font-semibold">
          Complaint Details
        </h2>

        <button
          onClick={() => setViewData(null)}
          className="text-xl"
        >
          ✕
        </button>

      </div>

     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div>
          <p className="text-gray-500">Student</p>
          <h3>{viewData.student}</h3>
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
          <p className="text-gray-500">Issue</p>
          <h3>{viewData.issue}</h3>
        </div>

        <div>
          <p className="text-gray-500">Priority</p>
          <h3>{viewData.priority}</h3>
        </div>

        <div>
          <p className="text-gray-500">Date</p>
          <h3>{viewData.date}</h3>
        </div>

      </div>

    </div>
  </div>
)}
{editData && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

 <div className="bg-white rounded-2xl w-full max-w-3xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto">

    <div className="flex justify-between items-center mb-5">

      <h2 className="text-xl font-semibold">
        Edit Complaint
      </h2>

      <button
        onClick={() => setEditData(null)}
        className="text-xl"
      >
        ✕
      </button>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <input
        value={editData.student}
        onChange={(e) =>
          setEditData({
            ...editData,
            student: e.target.value,
          })
        }
       className="border rounded-lg px-3 py-2 w-full"
      />

      <input
        value={editData.hostel}
        onChange={(e) =>
          setEditData({
            ...editData,
            hostel: e.target.value,
          })
        }
        className="border rounded-lg px-3 py-2 w-full"
      />

      <input
        value={editData.room}
        onChange={(e) =>
          setEditData({
            ...editData,
            room: e.target.value,
          })
        }
       className="border rounded-lg px-3 py-2 w-full"
      />

      <input
        value={editData.issue}
        onChange={(e) =>
          setEditData({
            ...editData,
            issue: e.target.value,
          })
        }
        className="border rounded-lg px-3 py-2 w-full"
      />

    </div>

    <div className="flex justify-end gap-3 mt-6">

      <button
        onClick={() => setEditData(null)}
        className="px-4 py-2 border rounded-lg"
      >
        Cancel
      </button>

      <button
        onClick={async () => {

          try {

            await updateComplaint(
              editData.id,
              editData
            );

            fetchComplaints();

            setEditData(null);

          } catch (err) {

            console.log(err);

          }

        }}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Update
      </button>

    </div>

  </div>

</div>

)}
{deleteId && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

  <div className="bg-white rounded-2xl p-6 w-full max-w-md">

    <h2 className="text-lg font-semibold">
      Delete Complaint
    </h2>

    <p className="text-sm text-gray-500 mt-2">
      Are you sure want to delete?
    </p>

    <div className="flex justify-end gap-3 mt-6">

      <button
        onClick={() => setDeleteId(null)}
        className="px-4 py-2 border rounded-lg"
      >
        Cancel
      </button>

      <button
        onClick={async () => {

          try {

            await deleteComplaint(
              deleteId
            );

            fetchComplaints();

            setDeleteId(null);

          } catch (err) {

            console.log(err);

          }

        }}
        className="px-4 py-2 bg-red-600 text-white rounded-lg"
      >
        Delete
      </button>

    </div>

  </div>

</div>

)}
    </div>
  );
}