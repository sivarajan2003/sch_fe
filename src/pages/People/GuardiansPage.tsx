import { useState } from "react";
import {
  RefreshCcw,
  Printer,
  LayoutGrid,
  List,
  Filter,
  CalendarDays,
  ArrowUpDown,
  MoreVertical,
} from "lucide-react";
import { Eye, Pencil, Trash2 } from "lucide-react";

import p1 from "../../assets/par/p1.png";
import p2 from "../../assets/par/p2.png";
import p3 from "../../assets/par/p3.png";
import p4 from "../../assets/par/p4.png";
import p5 from "../../assets/par/p5.png";
import p6 from "../../assets/par/p6.png";
import p7 from "../../assets/par/p7.png";
import p8 from "../../assets/par/p8.png";
import p9 from "../../assets/par/p9.png";
import p10 from "../../assets/par/p10.png";
import p11 from "../../assets/par/p11.png";
import p12 from "../../assets/par/p12.png";
import s1 from "../../assets/stud/s1.png";
import s2 from "../../assets/stud/s2.png";
import s3 from "../../assets/stud/s3.png";
import s4 from "../../assets/stud/s4.png";
import s5 from "../../assets/stud/s5.png";
import s6 from "../../assets/stud/s6.png";
import s7 from "../../assets/stud/s7.png";
import s8 from "../../assets/stud/s8.png";
import s9 from "../../assets/stud/s9.png";
import s10 from "../../assets/stud/s10.png";
/* ================= GUARDIANS DATA ================= */

const guardians = [
  {
    id: "G124545",
    name: "Avila",
    added: "01 Dec 2023",
    email: "avi@example.com",
    phone: "+1 65738 58937",
    image: p1,
    child: {
      name: "Gifford",
     image: s1,
    },
  },
  {
    id: "G124553",
    name: "Claudia",
    added: "27 Feb 2024",
    email: "tom@example.com",
    phone: "+1 65738 58937",
    image: p2,
    child: {
      name: "Richard",
      image: s2,
    },
  },
  {
    id: "G124549",
    name: "Jessie",
    added: "08 Jan 2024",
    email: "jes@example.com",
    phone: "+1 65738 58937",
    image: p3,
    child: {
      name: "Kathleen",
      image: s3,
    },
  },
  {
    id: "G124546",
    name: "Edwin",
    added: "10 Dec 2023",
    email: "edw@example.com",
    phone: "+1 65738 58937",
    image: p4,
    child: {
      name: "Susan",
      image: s4,
    },
  },
  {
    id: "G124548",
    name: "Mich",
    added: "22 Dec 2023",
    email: "mic@example.com",
    phone: "+1 65738 58937",
    image: p5,
    child: {
      name: "Julie",
      image: s5,
    },
  },
  {
    id: "G124547",
    name: "Mary",
    added: "15 Dec 2023",
    email: "mary@example.com",
    phone: "+1 65738 58937",
    image: p6,
    child: {
      name: "Ryan",
      image: s6,
    },
  },
  {
    id: "G124550",
    name: "Robert",
    added: "19 Jan 2024",
    email: "rob@example.com",
    phone: "+1 65738 58937",
    image: p7,
    child: {
      name: "Ralph",
      image: s7,
    },
  },
  {
    id: "G124552",
    name: "Arthur",
    added: "11 Feb 2024",
    email: "art@example.com",
    phone: "+1 65738 58937",
    image: p8,
    child: {
      name: "Gifford",
      image: s8,
    },
  },
  {
    id: "G124551",
    name: "Colleen",
    added: "24 Jan 2024",
    email: "col@example.com",
    phone: "+1 65738 58937",
    image: p9,
    child: {
      name: "Lisa",
      image: s9,
    },
  },
  {
    id: "G124556",
    name: "Thomas",
    added: "25 Mar 2024",
    email: "tom@example.com",
    phone: "+1 65738 58937",
    image: p10,
    child: {
      name: "Janet",
      image: s10,
    },
  },
  {
    id: "G124554",
    name: "Johnson",
    added: "14 Mar 2024",
    email: "john@example.com",
    phone: "+1 65738 58937",
    image: p1,
    child: {
      name: "Kathleen",
      image: s5,
    },
  },
  {
    id: "G124555",
    name: "Marquita",
    added: "18 Mar 2024",
    email: "mar@example.com",
    phone: "+1 65738 58937",
    image: p3,
    child: {
      name: "Joann",
      image: s1,
    },
  },
];

/* ================= PAGE ================= */

export default function GuardianPage() {
  const today = "15 May 2020 - 24 May 2024";
  const [view, setView] = useState<"grid" | "list">("grid");
  //const [view, setView] = useState<"grid" | "list">("grid");
  const [mode, setMode] = useState<"view" | "edit">("view");

  const [openDate, setOpenDate] = useState(false);
  const [startDate, setStartDate] = useState("2020-05-15");
  const [endDate, setEndDate] = useState("2024-05-24");
  
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  
  const [openFilter, setOpenFilter] = useState(false);
  const [filterBy, setFilterBy] = useState<"All" | "ID">("All");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
const [deleteId, setDeleteId] = useState<string | null>(null);
const [selectedGuardian, setSelectedGuardian] = useState<any>(null);

const filteredGuardians = guardians.filter((g) => {
  if (filterBy === "ID") {
    return g.id.startsWith("G");
  }
  return true;
});
const downloadGuardianCSV = (guardian: any) => {
  const headers = [
    "ID",
    "Name",
    "Email",
    "Phone",
    "Added On",
    "Child Name",
  ];

  const row = [
    guardian.id,
    guardian.name,
    guardian.email,
    guardian.phone,
    guardian.added,
    guardian.child.name,
  ];

  const csv =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), row.join(",")].join("\n");

  const link = document.createElement("a");
  link.href = encodeURI(csv);
  link.download = `${guardian.name}.csv`;
  link.click();
};

  return (
    <div className="space-y-6">
{/* ================= HEADER ================= */}
<div className="bg-white border rounded-xl px-5 py-4 space-y-3">

  {/* ===== TOP HEADER ===== */}
  <div className="flex items-center justify-between">
    {/* LEFT */}
    <div>
    <h2 className="text-2xl font-semibold text-gray-900">
        Guardian
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Dashboard / People / Guardian
      </p>
    </div>

    {/* RIGHT ACTIONS */}
    <div className="flex items-center gap-2">
      <button className="p-2 border rounded-lg hover:bg-gray-50">
        <RefreshCcw size={14} />
      </button>

      <button className="p-2 border rounded-lg hover:bg-gray-50">
        <Printer size={14} />
      </button>

      <button className="px-3 py-1.5 text-xs border rounded-lg hover:bg-gray-50">
        Export
      </button>

      <button className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg">
        Add Guardian
      </button>
    </div>
  </div>

  {/* DIVIDER */}
  <div className="border-t" />

  {/* ===== SUB HEADER ===== */}
  <div className="flex items-center justify-between">

    {/* LEFT */}
    <div className="flex items-center gap-4">
    <h3 className="text-lg font-semibold text-gray-900">
        Guardian Grid
      </h3>
    </div>

    {/* RIGHT */}
    <div className="flex items-center gap-3">
    <div className="relative">
  <button
    onClick={() => setOpenDate(!openDate)}
    className="flex items-center gap-2 text-xs text-gray-500 border px-3 py-1.5 rounded-lg hover:bg-gray-50"
  >
    <CalendarDays size={14} />
    {startDate} - {endDate}
  </button>

  {openDate && (
    <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg p-3 z-30 w-64">
      <label className="text-xs text-gray-500">Start Date</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="w-full border rounded px-2 py-1 text-xs mb-2"
      />

      <label className="text-xs text-gray-500">End Date</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="w-full border rounded px-2 py-1 text-xs mb-3"
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setOpenDate(false)}
          className="text-xs text-gray-500"
        >
          Cancel
        </button>
        <button
          onClick={() => setOpenDate(false)}
          className="text-xs text-blue-600 font-medium"
        >
          Apply
        </button>
      </div>
    </div>
  )}
</div>
<div className="relative">
<button
    onClick={() => setOpenFilter(!openFilter)}
    className="flex items-center gap-1 text-xs border px-3 py-1.5 rounded-lg hover:bg-gray-50"
  >
    <Filter size={14} />
    Filter
  </button>

  {openFilter && (
    <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-30">
      {["All", "ID"].map((f) => (
        <button
          key={f}
          onClick={() => {
            setFilterBy(f as any);
            setOpenFilter(false);
          }}
          className="block w-full text-left px-3 py-2 text-xs hover:bg-gray-50"
        >
          {f}
        </button>
      ))}
    </div>
  )}
</div>


      {/* GRID / LIST */}
      <div className="flex border rounded-lg overflow-hidden">
        <button
          onClick={() => setView("grid")}
          className={`p-2 ${
            view === "grid"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-600"
          }`}
        >
          <LayoutGrid size={14} />
        </button>

        <button
          onClick={() => setView("list")}
          className={`p-2 ${
            view === "list"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-600"
          }`}
        >
          <List size={14} />
        </button>
      </div>

      <button
  onClick={() =>
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }
  className="flex items-center gap-1 text-xs border px-3 py-1.5 rounded-lg hover:bg-gray-50"
>
  <ArrowUpDown size={14} />
  Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
</button>

    </div>
  </div>
</div>


      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredGuardians.map((g) => (
        <div
  key={g.id}
  className="
    bg-white border rounded-2xl p-3
    transition-all duration-300
    hover:-translate-y-1 hover:shadow-lg
  "
>

            <div className="flex items-center justify-between text-xs text-blue-600 mb-4">
              <span>{g.id}</span>
              <div className="relative">
  <button
    onClick={() =>
      setOpenMenuId(openMenuId === g.id ? null : g.id)
    }
    className="p-1 rounded hover:bg-gray-100"
  >
    <MoreVertical size={16} className="text-gray-400" />
  </button>

  {openMenuId === g.id && (
  <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-20">

    {/* VIEW */}
    <button
      onClick={() => {
        setSelectedGuardian(g);
        setMode("view");
        setOpenMenuId(null);
      }}
      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
    >
      <Eye size={14} />
      View
    </button>

    {/* EDIT */}
    <button
      onClick={() => {
        setSelectedGuardian(g);
        setMode("edit");
        setOpenMenuId(null);
      }}
      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
    >
      <Pencil size={14} />
      Edit
    </button>

    {/* DELETE */}
    <button
      onClick={() => {
        setDeleteId(g.id);
        setOpenMenuId(null);
      }}
      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
    >
      <Trash2 size={14} />
      Delete
    </button>
  </div>
)}
</div>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <img src={g.image} className="w-12 h-12 rounded-full" />
              <div>
                <h4 className="text-sm font-semibold">{g.name}</h4>
                <p className="text-xs text-gray-500">
                  Added on {g.added}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pb-3 border-b">
              <div>
                <p className="text-gray-500 mb-1">Email</p>
                <p className="font-medium">{g.email}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Phone</p>
                <p className="font-medium">{g.phone}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <img src={g.child.image} className="w-7 h-7 rounded-full" />
                <span className="text-xs font-medium">{g.child.name}</span>
              </div>

              <button
  onClick={() => setSelectedGuardian(g)}
  className="px-4 py-1.5 text-xs bg-gray-100 rounded-lg hover:bg-gray-200"
>
  View Details
</button>

            </div>

          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button className="px-6 py-2 text-sm bg-blue-600 text-white rounded-lg">
          Load More
        </button>
      </div>
      {deleteId && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-80">
      <h3 className="text-lg font-semibold mb-2">
        Delete Guardian?
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Are you sure you want to delete this guardian?
      </p>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setDeleteId(null)}
          className="px-4 py-2 text-sm border rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            // remove from list
            alert(`Deleted ${deleteId}`);
            setDeleteId(null);
          }}
          className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
{selectedGuardian && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl w-[420px] p-6 relative">

      <button
        onClick={() => setSelectedGuardian(null)}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>

      <div className="flex items-center gap-4 mb-5">
        <img
          src={selectedGuardian.image}
          className="w-14 h-14 rounded-full"
        />
        <div>
          <h3 className="text-lg font-semibold">
            {selectedGuardian.name}
          </h3>
          <p className="text-sm text-gray-500">
            Added on {selectedGuardian.added}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mb-5">
        <div>
          <p className="text-gray-500">Email</p>
          <p className="font-medium">{selectedGuardian.email}</p>
        </div>
        <div>
          <p className="text-gray-500">Phone</p>
          <p className="font-medium">{selectedGuardian.phone}</p>
        </div>
      </div>

      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
        <div className="flex items-center gap-3">
          <img
            src={selectedGuardian.child.image}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium">
            {selectedGuardian.child.name}
          </span>
        </div>
        <span className="text-xs text-gray-500">Child</span>
      </div>

    </div>
  </div>
)}
{selectedGuardian && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl w-[420px] p-6 relative">

      {/* CLOSE */}
      <button
        onClick={() => setSelectedGuardian(null)}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>

      {/* HEADER */}
      <h3 className="text-lg font-semibold mb-4">
        {mode === "view" ? "Guardian Details" : "Edit Guardian"}
      </h3>

      {/* PROFILE */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={selectedGuardian.image}
          className="w-14 h-14 rounded-full"
        />
        <div>
          <p className="font-medium">{selectedGuardian.name}</p>
          <p className="text-sm text-gray-500">
            Added on {selectedGuardian.added}
          </p>
        </div>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-3 text-sm">

        <div>
          <p className="text-gray-500">Email</p>
          {mode === "view" ? (
            <p className="font-medium">{selectedGuardian.email}</p>
          ) : (
            <input
              className="w-full border rounded px-2 py-1"
              value={selectedGuardian.email}
              onChange={(e) =>
                setSelectedGuardian({
                  ...selectedGuardian,
                  email: e.target.value,
                })
              }
            />
          )}
        </div>

        <div>
          <p className="text-gray-500">Phone</p>
          {mode === "view" ? (
            <p className="font-medium">{selectedGuardian.phone}</p>
          ) : (
            <input
              className="w-full border rounded px-2 py-1"
              value={selectedGuardian.phone}
              onChange={(e) =>
                setSelectedGuardian({
                  ...selectedGuardian,
                  phone: e.target.value,
                })
              }
            />
          )}
        </div>
      </div>

      {/* CHILD */}
      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 mt-4">
        <div className="flex items-center gap-3">
          <img
            src={selectedGuardian.child.image}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium">
            {selectedGuardian.child.name}
          </span>
        </div>
        <span className="text-xs text-gray-500">Child</span>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 mt-6">

      {mode === "view" && (
  <button
    onClick={() => downloadGuardianCSV(selectedGuardian)}
    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
  >
    Download
  </button>
)}


        {mode === "edit" && (
          <button
            onClick={() => {
              alert("Saved successfully");
              setSelectedGuardian(null);
            }}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
          >
            Save
          </button>
        )}

        <button
          onClick={() => setSelectedGuardian(null)}
          className="px-4 py-2 text-sm border rounded-lg"
        >
          {mode === "view" ? "Close" : "Cancel"}
        </button>

      </div>
    </div>
  </div>
)}


    </div>
  );
}
