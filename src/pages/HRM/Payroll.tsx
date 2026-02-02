import { useEffect, useState } from "react";
import {
  RefreshCcw,
  Printer,
  ArrowUpDown,
  FileText,
  CalendarDays,
  Filter,
} from "lucide-react";

/* ================= DATA ================= */
const INITIAL_DATA = [
  {
    id: "P738198",
    name: "Kevin",
    image: "https://i.pravatar.cc/40?img=1",
    department: "Admin",
    designation: "Technical Head",
    phone: "+1 63423 72397",
    amount: 15000,
    status: "Paid",
  },
  {
    id: "P738197",
    name: "Willie",
    image: "https://i.pravatar.cc/40?img=2",
    department: "Management",
    designation: "Receptionist",
    phone: "+1 82913 61371",
    amount: 12000,
    status: "Generated",
  },
  {
    id: "P738196",
    name: "Daniel",
    image: "https://i.pravatar.cc/40?img=3",
    department: "Management",
    designation: "Admin",
    phone: "+1 56752 86742",
    amount: 13000,
    status: "Paid",
  },
  {
    id: "P738195",
    name: "Teresa",
    image: "https://i.pravatar.cc/40?img=4",
    department: "Management",
    designation: "Admin",
    phone: "+1 82392 37359",
    amount: 13000,
    status: "Paid",
  },
  {
    id: "P738194",
    name: "Johnson",
    image: "https://i.pravatar.cc/40?img=5",
    department: "Finance",
    designation: "Accountant",
    phone: "+1 53619 54691",
    amount: 18000,
    status: "Paid",
  },
  {
    id: "P738193",
    name: "Hellana",
    image: "https://i.pravatar.cc/40?img=6",
    department: "Management",
    designation: "HR Manager",
    phone: "+1 23566 52683",
    amount: 12000,
    status: "Generated",
  },
  {
    id: "P738192",
    name: "James",
    image: "https://i.pravatar.cc/40?img=7",
    department: "Library",
    designation: "Librarian",
    phone: "+1 78429 82414",
    amount: 10000,
    status: "Paid",
  },
  {
    id: "P738191",
    name: "Jacquelin",
    image: "https://i.pravatar.cc/40?img=8",
    department: "Transport",
    designation: "Driver",
    phone: "+1 77502 54845",
    amount: 8000,
    status: "Paid",
  },
  {
    id: "P738190",
    name: "Edward",
    image: "https://i.pravatar.cc/40?img=9",
    department: "Finance",
    designation: "Accounts Manager",
    phone: "+1 56187 87489",
    amount: 12000,
    status: "Generated",
  },
  {
    id: "P738189",
    name: "Elizabeth",
    image: "https://i.pravatar.cc/40?img=10",
    department: "Management",
    designation: "Receptionist",
    phone: "+1 97846 84518",
    amount: 10000,
    status: "Paid",
  },
];

/* ================= PAGE ================= */
export default function Payroll() {
  const [data, setData] = useState(INITIAL_DATA);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [sortAsc, setSortAsc] = useState(true);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openView, setOpenView] = useState(false);
const [selectedPayroll, setSelectedPayroll] = useState<any>(null);

  const [statusFilter, setStatusFilter] = useState<"Active" | "Inactive" | null>(null);
  useEffect(() => {
    const close = () => {
      setOpenCalendar(false);
      setOpenFilter(false);
    };
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);
    
  /* EXPORT CSV */
  const handleExport = () => {
    const csv =
      "data:text/csv;charset=utf-8," +
      ["ID,Name,Department,Designation,Phone,Amount,Status"]
        .concat(
          data.map(
            (d) =>
              `${d.id},${d.name},${d.department},${d.designation},${d.phone},${d.amount},${d.status}`
          )
        )
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "payroll_list.csv";
    link.click();
  };

  /* SORT */
  const handleSort = () => {
    setData((prev) =>
      [...prev].sort((a, b) =>
        sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      )
    );
    setSortAsc(!sortAsc);
  };

  /* SEARCH */
  const filtered = data.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase());
  
    const matchStatus = statusFilter ? d.status === statusFilter : true;
  
    return matchSearch && matchStatus;
  });
  

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Payroll</h2>
            <p className="text-sm text-gray-500 mt-1">
              Dashboard / HRM / Payroll
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2.5 border rounded-lg">
              <RefreshCcw size={16} />
            </button>
            <button
  onClick={() => window.print()}
  className="p-2.5 border rounded-lg hover:bg-gray-50"
  title="Print"
>
  <Printer size={16} />
</button>

            <button
              onClick={handleExport}
              className="px-4 py-2 border rounded-lg text-sm"
            >
              Export
            </button>
          </div>
        </div>
      </div>

      {/* ================= SUB HEADER ================= */}
      <div className="bg-white border rounded-xl px-4 sm:px-6 py-4 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-base font-semibold">Payroll List</h3>

          <div className="flex flex-wrap gap-2">
          <div className="relative">
  <button
    onClick={(e) => {
      e.stopPropagation();
      setOpenCalendar(!openCalendar);
      setOpenFilter(false);
    }}
    className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
  >
    <CalendarDays size={14} />
    {startDate && endDate ? `${startDate} - ${endDate}` : "Select Date Range"}
  </button>
  {openCalendar && (
  <div
    onClick={(e) => e.stopPropagation()}
    className="absolute left-0 mt-2 w-80 bg-white border rounded-xl shadow-lg p-5 z-40"
  >
    {/* START DATE */}
    <div className="mb-4">
      <label className="text-sm font-medium text-gray-600">
        Start Date
      </label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
      />
    </div>

    {/* END DATE */}
    <div className="mb-5">
      <label className="text-sm font-medium text-gray-600">
        End Date
      </label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
      />
    </div>

    {/* APPLY */}
    <button
      onClick={() => {
        if (!startDate || !endDate) return;

        const filteredByDate = INITIAL_DATA.filter((d) => {
          // Payroll has no date field → normally backend handles this
          return true;
        });

        setData(filteredByDate);
        setCurrentPage(1);
        setOpenCalendar(false);
      }}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold"
    >
      Apply
    </button>
  </div>
)}
  </div>
  <div className="relative">
  <button
    onClick={(e) => {
      e.stopPropagation();
      setOpenFilter(!openFilter);
      setOpenCalendar(false);
    }}
    className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-50"
  >
    <Filter size={14} /> Filter
  </button>

            {openFilter && (
  <div
    onClick={(e) => e.stopPropagation()}
    className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-40"
  >
    <button
      onClick={() => {
        setStatusFilter("Active");
        setOpenFilter(false);
      }}
      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
    >
     Paid
    </button>

    <button
      onClick={() => {
        setStatusFilter("Inactive");
        setOpenFilter(false);
      }}
      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
    >
    Generated
    </button>

    <button
      onClick={() => {
        setStatusFilter(null);
        setData(INITIAL_DATA);
        setOpenFilter(false);
      }}
      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
    >
      Clear
    </button>
  </div>
)}
</div>

            <button
              onClick={handleSort}
              className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm"
            >
              <ArrowUpDown size={14} /> Sort By A-Z
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">Row Per Page 10 Entries</div>

          <input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-52 border rounded-lg px-3 py-2 text-sm"
            />
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="hidden lg:block bg-white border rounded-xl overflow-x-auto">
  <table className="min-w-[900px] w-full text-sm">
        <thead className="bg-gray-50">
  <tr>
    <th className="px-4 py-3 text-center">ID</th>
    <th className="px-4 py-3 text-left">Name</th>
    <th className="px-4 py-3 text-center">Department</th>
    <th className="px-4 py-3 text-center">Designation</th>
    <th className="px-4 py-3 text-center">Phone</th>
    <th className="px-4 py-3 text-center">Amount</th>
    <th className="px-4 py-3 text-center">Status</th>
    <th className="px-4 py-3 text-center">Action</th>
  </tr>
</thead>


          <tbody>
            {paginated.map((d) => (
              <tr key={d.id} className="border-t hover:bg-gray-50">
<td className="px-4 py-3 text-center text-blue-600">
  {d.id}
</td>

<td className="px-4 py-3">
  <div className="flex items-center gap-3">
    <img
      src={d.image}
      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
      alt={d.name}
    />
    <span className="whitespace-nowrap">{d.name}</span>
  </div>
</td>



<td className="px-4 py-3 text-center">{d.department}</td>
<td className="px-4 py-3 text-center">{d.designation}</td>
<td className="px-4 py-3 text-center">{d.phone}</td>

<td className="px-4 py-3 text-center">
  ${d.amount.toLocaleString()}
</td>
<td className="px-4 py-3 text-center">
  <span
    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
      d.status === "Paid"
        ? "bg-green-100 text-green-600"
        : "bg-yellow-100 text-yellow-600"
    }`}
  >
    ● {d.status}
  </span>
</td>


<td className="px-4 py-3 text-center">
<button
  onClick={() => {
    setSelectedPayroll(d);
    setOpenView(true);
  }}
  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs"
>
  <FileText size={12} />
  {d.status === "Paid" ? "View Payslip" : "View Details"}
</button>

</td>

              </tr>
            ))}
          </tbody>
        </table>
        </div>
{/* ================= MOBILE & TABLET VIEW ================= */}
<div className="lg:hidden space-y-4">
  {paginated.map((d) => (
    <div
      key={d.id}
      className="bg-white border rounded-2xl p-4 space-y-4"
    >
      {/* TOP */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <img
            src={d.image}
            className="w-10 h-10 rounded-full object-cover"
            alt={d.name}
          />
          <div>
            <p className="font-semibold">{d.name}</p>
            <p className="text-xs text-gray-500">{d.id}</p>
          </div>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs ${
            d.status === "Paid"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {d.status}
        </span>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Department</p>
          <p className="font-medium">{d.department}</p>
        </div>
        <div>
          <p className="text-gray-500">Designation</p>
          <p className="font-medium">{d.designation}</p>
        </div>
        <div>
          <p className="text-gray-500">Phone</p>
          <p className="font-medium">{d.phone}</p>
        </div>
        <div>
          <p className="text-gray-500">Amount</p>
          <p className="font-semibold text-green-600">
            ${d.amount.toLocaleString()}
          </p>
        </div>
      </div>

      {/* ACTION */}
      <button
        onClick={() => {
          setSelectedPayroll(d);
          setOpenView(true);
        }}
        className="w-full h-10 border rounded-lg flex items-center justify-center gap-2 text-sm"
      >
        <FileText size={16} />
        {d.status === "Paid" ? "View Payslip" : "View Details"}
      </button>
    </div>
  ))}
</div>

        {/* PAGINATION */}
        <div className="flex justify-end gap-2 px-4 py-3 border-t text-sm">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          <button className="px-3 py-1 bg-blue-600 text-white rounded">
            {currentPage}
          </button>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
     
      {openView && selectedPayroll && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl w-full max-w-md p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {selectedPayroll.status === "Paid"
            ? "Salary Payslip"
            : "Payroll Details"}
        </h3>
        <button onClick={() => setOpenView(false)}>✕</button>
      </div>

      {/* RECEIPT */}
      <div className="border rounded-lg p-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Payroll ID</span>
          <span className="font-medium">{selectedPayroll.id}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Employee Name</span>
          <span className="font-medium">{selectedPayroll.name}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Department</span>
          <span className="font-medium">{selectedPayroll.department}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Designation</span>
          <span className="font-medium">{selectedPayroll.designation}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Phone</span>
          <span className="font-medium">{selectedPayroll.phone}</span>
        </div>

        <div className="flex justify-between border-t pt-3">
          <span className="text-gray-500">Amount</span>
          <span className="font-semibold text-green-600">
            ${selectedPayroll.amount.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Status</span>
          <span
            className={`font-medium ${
              selectedPayroll.status === "Paid"
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            {selectedPayroll.status}
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
              "ID,Name,Department,Designation,Phone,Amount,Status\n" +
              `${selectedPayroll.id},${selectedPayroll.name},${selectedPayroll.department},${selectedPayroll.designation},${selectedPayroll.phone},${selectedPayroll.amount},${selectedPayroll.status}`;

            const link = document.createElement("a");
            link.href = encodeURI(csv);
            link.download =
              selectedPayroll.status === "Paid"
                ? `payslip_${selectedPayroll.id}.csv`
                : `payroll_${selectedPayroll.id}.csv`;
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

    </div>
  );
}
