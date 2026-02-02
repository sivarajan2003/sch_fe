import { useEffect, useState } from "react";
import {
  RefreshCcw,
  Printer,
  CalendarDays,
  Filter,
  ArrowUpDown,
  Eye,
  Pencil,
  Trash2,
  Download,
} from "lucide-react";

/* ================= DATA ================= */
const INITIAL_DATA = [
  { id: "LT748294", leaveType: "Medical Leave", status: "Active" },
  { id: "LT748293", leaveType: "Casual Leave", status: "Active" },
  { id: "LT748292", leaveType: "Maternity Leave", status: "Active" },
  { id: "LT748291", leaveType: "Sick Leave", status: "Active" },
  { id: "LT748290", leaveType: "Paternity Leave", status: "Inactive" },
  { id: "LT748289", leaveType: "Special Leave", status: "Active" },
];

/* ================= PAGE ================= */
export default function LeaveList() {
  const [data, setData] = useState(INITIAL_DATA);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);
  const rowsPerPage = 10;
  const [openView, setOpenView] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<any>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  
  const [openFilter, setOpenFilter] = useState(false);

  /* CLOSE DROPDOWN */
  useEffect(() => {
    const close = () => setOpenFilter(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  /* EXPORT CSV */
  const handleExport = () => {
    const csv =
      "data:text/csv;charset=utf-8," +
      ["ID,Leave Type,Status"]
        .concat(data.map(d => `${d.id},${d.leaveType},${d.status}`))
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "leave_list.csv";
    link.click();
  };

  /* SORT */
  const handleSort = () => {
    setData(prev =>
      [...prev].sort((a, b) =>
        sortAsc
          ? a.leaveType.localeCompare(b.leaveType)
          : b.leaveType.localeCompare(a.leaveType)
      )
    );
    setSortAsc(!sortAsc);
  };

  /* SEARCH */
  const filtered = data.filter(
    d =>
      d.leaveType.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase())
  );

  /* PAGINATION */
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div className="bg-white border rounded-2xl px-6 py-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Leave List</h2>

          <div className="flex items-center gap-3">
            <button className="p-2.5 border rounded-lg">
              <RefreshCcw size={16} />
            </button>
            <button className="p-2.5 border rounded-lg">
              <Printer size={16} />
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 border rounded-lg text-sm flex items-center gap-1"
            >
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2 text-sm">
            Row Per Page
            <select className="border rounded px-2 py-1">
              <option>10</option>
            </select>
            Entries
          </div>

          <input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm w-52"
          />
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Leave Type</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((d) => (
              <tr key={d.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-blue-600">{d.id}</td>

                <td className="px-4 py-3">{d.leaveType}</td>

                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                      d.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    ● {d.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                <div className="flex justify-center gap-3">

  {/* VIEW */}
  <button
    onClick={() => {
      setSelectedLeave(d);
      setOpenView(true);
    }}
    className="text-gray-600 hover:text-blue-600"
  >
    <Eye size={18} />
  </button>

  {/* DELETE */}
  <button
    onClick={() => setConfirmDeleteId(d.id)}
    className="text-red-600 hover:text-red-700"
  >
    <Trash2 size={18} />
  </button>

</div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-end gap-2 px-4 py-3 border-t text-sm">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>

          <button className="px-3 py-1 bg-blue-600 text-white rounded">
            {currentPage}
          </button>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
      {openView && selectedLeave && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl w-full max-w-md p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Leave Details</h3>
        <button onClick={() => setOpenView(false)}>✕</button>
      </div>

      {/* DETAILS */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between bg-gray-50 px-4 py-3 rounded-lg">
          <span className="text-gray-500">Leave ID</span>
          <span className="font-medium">{selectedLeave.id}</span>
        </div>

        <div className="flex justify-between bg-gray-50 px-4 py-3 rounded-lg">
          <span className="text-gray-500">Leave Type</span>
          <span className="font-medium">{selectedLeave.leaveType}</span>
        </div>

        <div className="flex justify-between bg-gray-50 px-4 py-3 rounded-lg">
          <span className="text-gray-500">Status</span>
          <span
            className={`px-3 py-1 text-xs rounded-full ${
              selectedLeave.status === "Active"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {selectedLeave.status}
          </span>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setOpenView(false)}
          className="px-4 py-2 border rounded-lg text-sm"
        >
          Close
        </button>

        <button
          onClick={() => {
            const csv =
              "data:text/csv;charset=utf-8," +
              "ID,Leave Type,Status\n" +
              `${selectedLeave.id},${selectedLeave.leaveType},${selectedLeave.status}`;

            const link = document.createElement("a");
            link.href = encodeURI(csv);
            link.download = `leave_${selectedLeave.id}.csv`;
            link.click();
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          Download
        </button>
      </div>

    </div>
  </div>
)}
{confirmDeleteId && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl w-full max-w-sm p-6">

      <h3 className="text-lg font-semibold mb-2">
        Confirm Delete
      </h3>

      <p className="text-sm text-gray-600 mb-6">
        Are you sure you want to delete this leave?
        <br />This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setConfirmDeleteId(null)}
          className="px-4 py-2 border rounded-lg text-sm"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setData(prev =>
              prev.filter(item => item.id !== confirmDeleteId)
            );
            setConfirmDeleteId(null);
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm"
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
