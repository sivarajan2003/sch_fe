import { useEffect, useState } from "react";
import {
  RefreshCcw,
  Printer,
  ArrowUpDown,
  CalendarDays,
  Filter,
  Plus,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import AddLibraryMemberModal from "../../components/tables/AddLibraryMemberModal";

/* ================= DATA ================= */
const INITIAL_DATA = [
  {
    id: "LMB23748",
    name: "James",
    avatar: "https://i.pravatar.cc/40?img=12",
    cardNo: "501",
    email: "james@example.com",
    date: "22 Apr 2024",
    mobile: "+1 78429 82414",
  },
  {
    id: "LMB23747",
    name: "Garcia",
    avatar: "https://i.pravatar.cc/40?img=32",
    cardNo: "502",
    email: "garcia@example.com",
    date: "30 Apr 2024",
    mobile: "+1 37489 46485",
  },
  {
    id: "LMB23746",
    name: "Frank",
    avatar: "https://i.pravatar.cc/40?img=45",
    cardNo: "503",
    email: "frank@example.com",
    date: "05 May 2024",
    mobile: "+1 87651 64816",
  },
  {
    id: "LMB23745",
    name: "Jennie",
    avatar: "https://i.pravatar.cc/40?img=47",
    cardNo: "504",
    email: "jennie@example.com",
    date: "16 May 2024",
    mobile: "+1 49879 86498",
  },
  {
    id: "LMB23744",
    name: "Paul",
    avatar: "https://i.pravatar.cc/40?img=8",
    cardNo: "505",
    email: "paul@example.com",
    date: "28 May 2024",
    mobile: "+1 69787 87984",
  },
  {
    id: "LMB23743",
    name: "Elaine",
    avatar: "https://i.pravatar.cc/40?img=19",
    cardNo: "506",
    email: "elaine@example.com",
    date: "06 Jun 2024",
    mobile: "+1 98764 84984",
  },
  {
    id: "LMB23742",
    name: "Jackson",
    avatar: "https://i.pravatar.cc/40?img=21",
    cardNo: "507",
    email: "jackson@example.com",
    date: "10 Jun 2024",
    mobile: "+1 46876 55498",
  },
  {
    id: "LMB23741",
    name: "Kerry",
    avatar: "https://i.pravatar.cc/40?img=25",
    cardNo: "508",
    email: "kerry@example.com",
    date: "18 Jun 2024",
    mobile: "+1 79468 87467",
  },
  {
    id: "LMB23740",
    name: "Roger",
    avatar: "https://i.pravatar.cc/40?img=30",
    cardNo: "509",
    email: "roger@example.com",
    date: "20 Jul 2024",
    mobile: "+1 65598 64658",
  },
  {
    id: "LMB23739",
    name: "Denise",
    avatar: "https://i.pravatar.cc/40?img=36",
    cardNo: "510",
    email: "denise@example.com",
    date: "26 Jul 2024",
    mobile: "+1 57866 68746",
  },
];

/* ================= PAGE ================= */

export default function LibraryMembers() {
  const navigate = useNavigate();

  const [data, setData] = useState(INITIAL_DATA);
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);
  //const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  
  const [openFilter, setOpenFilter] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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

  /* 📤 EXPORT */
  const handleExport = () => {
    const csv =
      "data:text/csv;charset=utf-8," +
      ["ID,Member,Card No,Email,Date of Join,Mobile"]
        .concat(
          data.map(
            (d) =>
              `${d.id},${d.name},${d.cardNo},${d.email},${d.date},${d.mobile}`
          )
        )
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "library_members.csv";
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
  
    const rowDate = new Date(d.date);
    const from = new Date(startDate);
    const to = new Date(endDate);
  
    return matchSearch && rowDate >= from && rowDate <= to;
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
        <div className="flex items-start gap-3">
  {/* BACK ARROW */}
  <button
            onClick={() => navigate("/admin/dashboard")}
    className="mt-1 p-2 rounded-lg hover:bg-gray-100"
    title="Go Back"
  >
    <ArrowLeft size={20} />
  </button>

  {/* TITLE */}
  <div>
    <h2 className="text-2xl font-semibold">Library Members</h2>
    <p className="text-sm text-gray-500 mt-1">
      Dashboard / Management / Library Members
    </p>
  </div>
</div>


<div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-3">
            <button
              onClick={handleRefresh}
              className="p-2.5 border rounded-lg hover:bg-gray-50"
            >
              <RefreshCcw size={16} />
            </button>

            <button
              onClick={() => window.print()}
              className="p-2.5 border rounded-lg hover:bg-gray-50"
            >
              <Printer size={16} />
            </button>

            <button
              onClick={handleExport}
              className="px-4 py-2 border rounded-lg text-sm"
            >
              Export
            </button>

            <button
  onClick={() => setOpenAdd(true)}
  className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-1"
>
  <Plus size={14} />
  Add Member
</button>

          </div>
        </div>
      </div>

      {/* ================= SUB HEADER ================= */}
      <div className="bg-white border rounded-xl px-6 py-4 space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h3 className="text-base font-semibold">
            Library Members List
          </h3>

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
    {startDate && endDate
      ? `${startDate} - ${endDate}`
      : "Select Date Range"}
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
      className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-30"
    >
      <button
        onClick={() => {
          setData([...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
          setOpenFilter(false);
        }}
        className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50"
      >
        Recently Added
      </button>

      <button
        onClick={() => {
          setData([...data].sort((a, b) => a.name.localeCompare(b.name)));
          setOpenFilter(false);
        }}
        className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50"
      >
        Name A–Z
      </button>

      <button
        onClick={() => {
          setData([...data].sort((a, b) => b.name.localeCompare(a.name)));
          setOpenFilter(false);
        }}
        className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50"
      >
        Name Z–A
      </button>
    </div>
  )}
</div>


            <button
              onClick={handleSort}
              className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm"
            >
              <ArrowUpDown size={14} />
              Sort By A-Z
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm">
            Row Per Page
            <select
              value={rowsPerPage}
              onChange={(e) =>
                setRowsPerPage(Number(e.target.value))
              }
              className="border rounded px-2 py-1"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
            Entries
          </div>

          <input
            type="text"
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
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3 text-left">Member</th>
              <th className="px-4 py-3">Card No</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Date of Join</th>
              <th className="px-4 py-3">Mobile</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((d) => (
           <tr key={d.id} className="border-t hover:bg-gray-50">
           <td className="px-4 py-3 text-center text-blue-600">{d.id}</td>
         
           <td className="px-4 py-3">
  <div className="flex items-center gap-3">
    <img
      src={d.avatar}
      className="w-8 h-8 rounded-full object-cover"
      alt={d.name}
    />
    <span className="whitespace-nowrap">{d.name}</span>
  </div>
</td>

           <td className="px-4 py-3 text-center">{d.cardNo}</td>
           <td className="px-4 py-3 text-center">{d.email}</td>
           <td className="px-4 py-3 text-center">{d.date}</td>
           <td className="px-4 py-3 text-center">{d.mobile}</td>
         
           <td className="px-4 py-3 text-center">
  <div className="flex items-center justify-center gap-3">

    {/* VIEW */}
    {/* VIEW */}
<button
  title="View"
  onClick={() => {
    setSelectedMember(d);
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
    setSelectedMember(d);
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
        <div className="flex items-center gap-3">
          <img
            src={d.avatar}
            className="w-10 h-10 rounded-full object-cover"
            alt={d.name}
          />
          <div>
            <p className="font-semibold">{d.name}</p>
            <p className="text-xs text-gray-500">{d.id}</p>
          </div>
        </div>

        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
          Card #{d.cardNo}
        </span>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Email</p>
          <p className="font-medium truncate">{d.email}</p>
        </div>

        <div>
          <p className="text-gray-500">Joined</p>
          <p className="font-medium">{d.date}</p>
        </div>

        <div className="col-span-2">
          <p className="text-gray-500">Mobile</p>
          <p className="font-medium">{d.mobile}</p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => {
            setSelectedMember(d);
            setOpenView(true);
          }}
          className="flex items-center justify-center gap-1 border rounded-lg py-2 text-sm"
        >
          <Eye size={14} /> View
        </button>

        <button
          onClick={() => {
            setSelectedMember(d);
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
</div>

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
  {confirmDeleteId && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl w-[320px] p-6">
      <h3 className="text-lg font-semibold mb-2">
        Confirm Delete
      </h3>

      <p className="text-sm text-gray-500 mb-4">
        Are you sure you want to delete this member?
        This action cannot be undone.
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
  <AddLibraryMemberModal
    onClose={() => setOpenAdd(false)}
    onAdd={(member) =>
      setData((prev) => [member, ...prev])
    }
  />
)}
{openView && selectedMember && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl w-full max-w-md p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">Library Member Details</h3>
        <button onClick={() => setOpenView(false)}>✕</button>
      </div>

      {/* DETAILS */}
      <div className="space-y-3 text-sm">
        {[
          ["Member ID", selectedMember.id],
          ["Name", selectedMember.name],
          ["Card No", selectedMember.cardNo],
          ["Email", selectedMember.email],
          ["Date of Join", selectedMember.date],
          ["Mobile", selectedMember.mobile],
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
              "ID,Name,Card No,Email,Date of Join,Mobile\n" +
              `${selectedMember.id},${selectedMember.name},${selectedMember.cardNo},${selectedMember.email},${selectedMember.date},${selectedMember.mobile}`;

            const link = document.createElement("a");
            link.href = encodeURI(csv);
            link.download = `library_member_${selectedMember.id}.csv`;
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
{openEdit && selectedMember && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl w-full max-w-md p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">Edit Library Member</h3>
        <button onClick={() => setOpenEdit(false)}>✕</button>
      </div>

      {/* FORM */}
      <div className="space-y-4 text-sm">
        <div>
          <label className="text-gray-500">Name</label>
          <input
            value={selectedMember.name}
            onChange={(e) =>
              setSelectedMember({ ...selectedMember, name: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="text-gray-500">Card No</label>
          <input
            value={selectedMember.cardNo}
            onChange={(e) =>
              setSelectedMember({ ...selectedMember, cardNo: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="text-gray-500">Email</label>
          <input
            value={selectedMember.email}
            onChange={(e) =>
              setSelectedMember({ ...selectedMember, email: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="text-gray-500">Mobile</label>
          <input
            value={selectedMember.mobile}
            onChange={(e) =>
              setSelectedMember({ ...selectedMember, mobile: e.target.value })
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
                item.id === selectedMember.id
                  ? selectedMember
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
