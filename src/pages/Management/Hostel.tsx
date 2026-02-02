import { useEffect, useState } from "react";
import {
  RefreshCcw,
  Printer,
  ArrowUpDown,
  //MoreVertical,
  Eye,
  Pencil,
  Trash2,
  CalendarDays,
  Filter,
  Plus,
} from "lucide-react";
import AddHostelModal from "../../components/tables/AddHostelModal";

/* ================= DATA ================= */
const INITIAL_DATA = [
  {
    id: "H823828",
    name: "Phoenix Residence",
    type: "Boys",
    address: "25 Crowfield Road, Phoenix",
    intake: 150,
    description: "Rising to nurture young minds",
  },
  {
    id: "H823827",
    name: "Tranquil Haven",
    type: "Girls",
    address: "81 Hartland Avenue, Milwaukee",
    intake: 200,
    description: "Where peace meets academic pursuits",
  },
  {
    id: "H823826",
    name: "Radiant Towers",
    type: "Boys",
    address: "School Campus",
    intake: 180,
    description: "Illuminating minds with knowledge and warmth",
  },
  {
    id: "H823825",
    name: "Nova Nest",
    type: "Girls",
    address: "School Campus",
    intake: 100,
    description: "A nestling ground for budding intellectuals",
  },
  {
    id: "H823824",
    name: "Vista Villa",
    type: "Boys",
    address: "65 Braxton Street, Sheffield",
    intake: 250,
    description: "Overlooking the vast landscape of knowledge",
  },
  {
    id: "H823823",
    name: "Zenith Zone",
    type: "Girls",
    address: "School Campus",
    intake: 150,
    description: "Living at the peak of academic achievement",
  },
  {
    id: "H823822",
    name: "Summit Springs",
    type: "Boys",
    address: "55 Upton Avenue, Monson",
    intake: 300,
    description: "Drawing from the wellspring of knowledge",
  },
  {
    id: "H823821",
    name: "Beacon Breeze",
    type: "Girls",
    address: "School Campus",
    intake: 280,
    description: "Riding the winds of educational inspiration",
  },
  {
    id: "H823820",
    name: "Empyrean Estate",
    type: "Boys",
    address: "45 Cinnamon Lane, San Antonio",
    intake: 200,
    description: "Infusing energy into scholarly endeavors",
  },
  {
    id: "H823819",
    name: "Nexus Nook",
    type: "Girls",
    address: "School Campus",
    intake: 350,
    description: "A communal hub for academic excellence",
  },
];

/* ================= PAGE ================= */
export default function Hostel() {
  const [data, setData] = useState(INITIAL_DATA);
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);
  //const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openView, setOpenView] = useState(false);
const [openEdit, setOpenEdit] = useState(false);
const [selectedHostel, setSelectedHostel] = useState<any>(null);

  const [openCalendar, setOpenCalendar] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [openAdd, setOpenAdd] = useState(false);

  useEffect(() => {
    const close = () => {
      setOpenCalendar(false);
      setOpenFilter(false);
    };
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);
  

  /* 🔄 REFRESH */
  const handleRefresh = () => {
    setData(INITIAL_DATA);
    setSearch("");
    setCurrentPage(1);
  };

  /* 📤 EXPORT CSV */
  const handleExport = () => {
    const csv =
      "data:text/csv;charset=utf-8," +
      ["ID,Hostel Name,Hostel Type,Address,Intake,Description"]
        .concat(
          data.map(
            (d) =>
              `${d.id},${d.name},${d.type},${d.address},${d.intake},${d.description}`
          )
        )
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "hostel_list.csv";
    link.click();
  };

  /* 🔃 SORT */
  const handleSort = () => {
    setData((prev) =>
      [...prev].sort((a, b) =>
        sortAsc
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      )
    );
    setSortAsc(!sortAsc);
  };

  /* 🔍 SEARCH */
  const filtered = data.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase());
  
    if (!startDate || !endDate) return matchSearch;
  
    const from = new Date(startDate);
    const to = new Date(endDate);
    const today = new Date(); // since hostel has no date field
  
    return matchSearch && today >= from && today <= to;
  });
  

  /* 📄 PAGINATION */
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
            <h2 className="text-2xl font-semibold">Hostel</h2>
            <p className="text-sm text-gray-500 mt-1">
              Dashboard / Management / Hostel
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-3">
            <button onClick={handleRefresh} className="p-2.5 border rounded-lg hover:bg-gray-50">
              <RefreshCcw size={16} />
            </button>
            <button onClick={() => window.print()} className="p-2.5 border rounded-lg hover:bg-gray-50">
              <Printer size={16} />
            </button>
            <button onClick={handleExport} className="px-4 py-2 border rounded-lg text-sm">
              Export
            </button>
            <button
  onClick={() => setOpenAdd(true)}
  className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-1"
>
  <Plus size={14} /> Add Hostel
</button>

          </div>
        </div>
      </div>

      {/* ================= SUB HEADER ================= */}
      <div className="bg-white border rounded-xl px-6 py-4 space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h3 className="text-base font-semibold">Hostel List</h3>

          <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-3">
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
    Select Date Range
  </button>

  {openCalendar && (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute right-0 mt-2 w-72 bg-white border rounded-xl shadow-lg p-4 z-30"
    >
      <div className="space-y-3">
        <div>
          <label className="text-xs text-gray-500">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <button
          onClick={() => setOpenCalendar(false)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm"
        >
          Apply
        </button>
      </div>
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
    <Filter size={14} />
    Filter
  </button>

  {openFilter && (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-30"
    >
      <button
        onClick={() => {
          setData([...data].sort((a, b) => a.intake - b.intake));
          setOpenFilter(false);
        }}
        className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50"
      >
        Intake (Low → High)
      </button>

      <button
        onClick={() => {
          setData([...data].sort((a, b) => b.intake - a.intake));
          setOpenFilter(false);
        }}
        className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50"
      >
        Intake (High → Low)
      </button>

      <button
        onClick={() => {
          setData([...data].sort((a, b) => a.type.localeCompare(b.type)));
          setOpenFilter(false);
        }}
        className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50"
      >
        Hostel Type (Boys / Girls)
      </button>
    </div>
  )}
</div>

            <button onClick={handleSort} className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm">
              <ArrowUpDown size={14} /> Sort By A-Z
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm">
            Row Per Page
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="border rounded px-2 py-1"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
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
      <div className="hidden lg:block bg-white border rounded-xl overflow-x-auto">
      <div className="min-w-[900px]">
  <table className="min-w-[900px] w-full text-sm">

          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-center">ID</th>
              <th className="px-4 py-3 text-center">Hostel Name</th>
              <th className="px-4 py-3 text-center">Hostel Type</th>
              <th className="px-4 py-3 text-center">Address</th>
              <th className="px-4 py-3 text-center">Intake</th>
              <th className="px-4 py-3 text-center">Description</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((d) => (
              <tr key={d.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-center text-blue-600">{d.id}</td>
                <td className="px-4 py-3 text-center">{d.name}</td>
                <td className="px-4 py-3 text-center">{d.type}</td>
                <td className="px-4 py-3 text-center">{d.address}</td>
                <td className="px-4 py-3 text-center">{d.intake}</td>
                <td className="px-4 py-3 text-center">{d.description}</td>

                <td className="px-4 py-3 text-center">
  <div className="flex items-center justify-center gap-3">

    {/* VIEW */}
    {/* VIEW */}
<button
  title="View"
  onClick={() => {
    setSelectedHostel(d);
    setOpenView(true);
  }}
  className="p-2 rounded-full hover:bg-blue-50 text-gray-600 hover:text-blue-600"
>
  <Eye size={18} />
</button>

{/* EDIT */}
<button
  title="Edit"
  onClick={() => {
    setSelectedHostel(d);
    setOpenEdit(true);
  }}
  className="p-2 rounded-full hover:bg-green-50 text-gray-600 hover:text-green-600"
>
  <Pencil size={18} />
</button>


    {/* DELETE */}
    <button
      title="Delete"
      onClick={() => setConfirmDeleteId(d.id)}
      className="text-red-500 hover:text-red-700"
    >
      <Trash2 size={18} />
    </button>

  </div>
</td>

             </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
        {/* ================= MOBILE & TABLET VIEW ================= */}
<div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
  {paginated.map((d) => (
    <div
      key={d.id}
      className="bg-white border rounded-2xl p-4 space-y-4"
    >

      {/* TOP */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-blue-600 font-semibold">{d.id}</p>
          <p className="font-medium">{d.name}</p>
          <p className="text-xs text-gray-500">{d.type} Hostel</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs ${
            d.type === "Boys"
              ? "bg-blue-100 text-blue-600"
              : "bg-pink-100 text-pink-600"
          }`}
        >
          {d.type}
        </span>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Intake</p>
          <p className="font-medium">{d.intake}</p>
        </div>

        <div>
          <p className="text-gray-500">Address</p>
          <p className="font-medium line-clamp-2">{d.address}</p>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div>
        <p className="text-gray-500 text-sm">Description</p>
        <p className="text-sm">{d.description}</p>
      </div>

      {/* ACTIONS */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => {
            setSelectedHostel(d);
            setOpenView(true);
          }}
          className="flex items-center justify-center gap-1 border rounded-lg py-2 text-sm"
        >
          <Eye size={14} /> View
        </button>

        <button
          onClick={() => {
            setSelectedHostel(d);
            setOpenEdit(true);
          }}
          className="flex items-center justify-center gap-1 border rounded-lg py-2 text-sm"
        >
          <Pencil size={14} /> Edit
        </button>

        <button
          onClick={() => setConfirmDeleteId(d.id)}
          className="flex items-center justify-center gap-1 border rounded-lg py-2 text-sm text-red-600"
        >
          <Trash2 size={14} /> Delete
        </button>
      </div>

    </div>
  ))}


{/* ✅ PAGINATION — INSIDE SAME WIDTH */}
<div className="flex justify-end gap-2 px-4 py-3 border-t text-sm">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(p => p - 1)}
        className="px-3 py-1 border rounded disabled:opacity-40"
      >
        Prev
      </button>

      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-3 py-1 rounded ${
            currentPage === i + 1
              ? "bg-blue-600 text-white"
              : "border"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(p => p + 1)}
        className="px-3 py-1 border rounded disabled:opacity-40"
      >
        Next
      </button>
    </div>

  
</div> 
      {confirmDeleteId && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-80">
      <h3 className="text-lg font-semibold mb-2">
        Confirm Delete
      </h3>

      <p className="text-sm text-gray-600 mb-6">
        Are you sure you want to delete this hostel?
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
            setData((prev) =>
              prev.filter((x) => x.id !== confirmDeleteId)
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
{openAdd && (
  <AddHostelModal
    onClose={() => setOpenAdd(false)}
    onAdd={(newHostel) =>
      setData((prev) => [newHostel, ...prev])
    }
  />
)}
{openView && selectedHostel && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl w-full max-w-md p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">Hostel Details</h3>
        <button onClick={() => setOpenView(false)}>✕</button>
      </div>

      {/* DETAILS */}
      <div className="space-y-3 text-sm">
        {[
          ["Hostel ID", selectedHostel.id],
          ["Hostel Name", selectedHostel.name],
          ["Hostel Type", selectedHostel.type],
          ["Address", selectedHostel.address],
          ["Intake", selectedHostel.intake],
          ["Description", selectedHostel.description],
        ].map(([label, value]) => (
          <div
            key={label}
            className="flex justify-between bg-gray-50 px-4 py-3 rounded-lg"
          >
            <span className="text-gray-500">{label}</span>
            <span className="font-medium">{value}</span>
          </div>
        ))}
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
              "ID,Hostel Name,Hostel Type,Address,Intake,Description\n" +
              `${selectedHostel.id},${selectedHostel.name},${selectedHostel.type},${selectedHostel.address},${selectedHostel.intake},${selectedHostel.description}`;

            const link = document.createElement("a");
            link.href = encodeURI(csv);
            link.download = `hostel_${selectedHostel.id}.csv`;
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
{openEdit && selectedHostel && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl w-full max-w-md p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">Edit Hostel</h3>
        <button onClick={() => setOpenEdit(false)}>✕</button>
      </div>

      {/* FORM */}
      <div className="space-y-4 text-sm">
        <div>
          <label className="text-gray-500">Hostel Name</label>
          <input
            value={selectedHostel.name}
            onChange={(e) =>
              setSelectedHostel({ ...selectedHostel, name: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="text-gray-500">Hostel Type</label>
          <select
            value={selectedHostel.type}
            onChange={(e) =>
              setSelectedHostel({ ...selectedHostel, type: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          >
            <option>Boys</option>
            <option>Girls</option>
          </select>
        </div>

        <div>
          <label className="text-gray-500">Address</label>
          <input
            value={selectedHostel.address}
            onChange={(e) =>
              setSelectedHostel({ ...selectedHostel, address: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="text-gray-500">Intake</label>
          <input
            type="number"
            value={selectedHostel.intake}
            onChange={(e) =>
              setSelectedHostel({
                ...selectedHostel,
                intake: Number(e.target.value),
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="text-gray-500">Description</label>
          <textarea
            value={selectedHostel.description}
            onChange={(e) =>
              setSelectedHostel({
                ...selectedHostel,
                description: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setOpenEdit(false)}
          className="px-4 py-2 border rounded-lg text-sm"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setData(prev =>
              prev.map(item =>
                item.id === selectedHostel.id
                  ? selectedHostel
                  : item
              )
            );
            setOpenEdit(false);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          Update
        </button>
      </div>

    </div>
  </div>
)}

    </div>
  );
}
