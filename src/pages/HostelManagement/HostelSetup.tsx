import { useState } from "react";
import {
  Building,
  BedDouble,
  Users,
  Search,
  Filter,
  Plus,
  Pencil,
  Trash2,
  RefreshCcw,
  Printer,
  ArrowUpDown,
} from "lucide-react";

const INITIAL_DATA = [
  {
    id: "HS1001",
    name: "Boys Hostel A",
    type: "Boys",
    rooms: 40,
    capacity: 160,
    warden: "Mr. Kumar",
    status: "Active",
  },
  {
    id: "HS1002",
    name: "Girls Hostel B",
    type: "Girls",
    rooms: 35,
    capacity: 140,
    warden: "Mrs. Priya",
    status: "Active",
  },
  {
    id: "HS1003",
    name: "Staff Hostel",
    type: "Staff",
    rooms: 20,
    capacity: 60,
    warden: "Mr. Raj",
    status: "Active",
  },
];

export default function HostelSetup() {
  const [data, setData] = useState(INITIAL_DATA);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const [openEdit, setOpenEdit] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState<any>(null);

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [openAdd, setOpenAdd] = useState(false);

const [newHostel, setNewHostel] = useState({
  name: "",
  type: "Boys",
  rooms: 0,
  capacity: 0,
  warden: "",
  status: "Active",
});
  /* SEARCH */
  const filtered = data.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase())
  );

  /* REFRESH */
  const handleRefresh = () => {
    setData(INITIAL_DATA);
    setSearch("");
  };

  /* EXPORT */
  const handleExport = () => {
    const csv =
      "data:text/csv;charset=utf-8," +
      ["ID,Hostel Name,Type,Rooms,Capacity,Warden,Status"]
        .concat(
          data.map(
            (d) =>
              `${d.id},${d.name},${d.type},${d.rooms},${d.capacity},${d.warden},${d.status}`
          )
        )
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "hostel_setup.csv";
    link.click();
  };

  /* SORT */
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

  /* FILTER */
  const handleFilter = () => {
    setData(
      INITIAL_DATA.filter((d) => d.status === "Active")
    );
  };

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div className="bg-white border rounded-2xl px-6 py-5">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Hostel Setup
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Dashboard / Hostel Management / Hostel Setup
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-3">

            <button
              onClick={handleRefresh}
              className="p-2.5 border rounded-lg"
            >
              <RefreshCcw size={16} />
            </button>

            <button
              onClick={() => window.print()}
              className="p-2.5 border rounded-lg"
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
  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 text-sm"
>
  <Plus size={16} />
  Add Hostel
</button>

          </div>
        </div>
      </div>

      {/* ================= CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* CARD */}
        <div className="bg-white border rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Hostels
              </p>

              <h3 className="text-2xl font-semibold mt-2">
                12
              </h3>
            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Building className="text-blue-600" size={22} />
            </div>

          </div>
        </div>

        {/* CARD */}
        <div className="bg-white border rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Rooms
              </p>

              <h3 className="text-2xl font-semibold mt-2">
                120
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
                Students Allocated
              </p>

              <h3 className="text-2xl font-semibold mt-2">
                540
              </h3>
            </div>

            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <Users className="text-orange-600" size={22} />
            </div>

          </div>
        </div>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="bg-white border rounded-xl px-6 py-4 space-y-4">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <h3 className="text-base font-semibold">
            Hostel List
          </h3>

          <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-3">

            <div className="relative">

  <button
    onClick={() => setOpenFilter(!openFilter)}
    className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm"
  >
    <Filter size={14} />
    Filter
  </button>

  {openFilter && (
    <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg z-50">

      <button
        onClick={() => {
          setSelectedFilter("All");
          setData(INITIAL_DATA);
          setOpenFilter(false);
        }}
        className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm"
      >
        All Hostels
      </button>

      <button
        onClick={() => {
          setSelectedFilter("Boys");
          setData(
            INITIAL_DATA.filter((d) => d.type === "Boys")
          );
          setOpenFilter(false);
        }}
        className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm"
      >
        Boys Hostel
      </button>

      <button
        onClick={() => {
          setSelectedFilter("Girls");
          setData(
            INITIAL_DATA.filter((d) => d.type === "Girls")
          );
          setOpenFilter(false);
        }}
        className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm"
      >
        Girls Hostel
      </button>

      <button
        onClick={() => {
          setSelectedFilter("Staff");
          setData(
            INITIAL_DATA.filter((d) => d.type === "Staff")
          );
          setOpenFilter(false);
        }}
        className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm"
      >
        Staff Hostel
      </button>

      <button
        onClick={() => {
          setData(
            INITIAL_DATA.filter((d) => d.status === "Active")
          );
          setOpenFilter(false);
        }}
        className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm"
      >
        Active Hostels
      </button>

    </div>
  )}
</div>

            <button
              onClick={handleSort}
              className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm"
            >
              <ArrowUpDown size={14} />
              Sort By
            </button>

          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="text-sm text-gray-500">
            Total Hostels : {filtered.length}
          </div>

          <div className="relative w-full sm:w-64">

            <Search
              size={16}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              placeholder="Search Hostel"
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
              <th className="px-4 py-3 text-center">ID</th>
              <th className="px-4 py-3 text-center">Hostel Name</th>
              <th className="px-4 py-3 text-center">Type</th>
              <th className="px-4 py-3 text-center">Rooms</th>
              <th className="px-4 py-3 text-center">Capacity</th>
              <th className="px-4 py-3 text-center">Warden</th>
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

                <td className="px-4 py-3 text-center text-blue-600">
                  {d.id}
                </td>

                <td className="px-4 py-3 text-center font-medium">
                  {d.name}
                </td>

                <td className="px-4 py-3 text-center">

                  <span
                    className={`px-2 py-1 rounded-full text-xs
                    ${
                      d.type === "Boys"
                        ? "bg-blue-100 text-blue-600"
                        : d.type === "Girls"
                        ? "bg-pink-100 text-pink-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {d.type}
                  </span>

                </td>

                <td className="px-4 py-3 text-center">
                  {d.rooms}
                </td>

                <td className="px-4 py-3 text-center">
                  {d.capacity}
                </td>

                <td className="px-4 py-3 text-center">
                  {d.warden}
                </td>

                <td className="px-4 py-3 text-center">

                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-600">
                    ● {d.status}
                  </span>

                </td>

                <td className="px-4 py-3 text-center">

                  <div className="flex items-center justify-center gap-3">

                    {/* EDIT */}
                    <button
                      onClick={() => {
                        setSelectedHostel(d);
                        setOpenEdit(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={18} />
                    </button>

                    {/* DELETE */}
                    <button
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
      {/* ================= MOBILE & TABLET VIEW ================= */}
<div className="lg:hidden space-y-4">

  {filtered.map((d) => (

    <div
      key={d.id}
      className="bg-white border rounded-2xl p-4 space-y-4"
    >

      {/* TOP */}
      <div className="flex justify-between items-start">

        <div>

          <p className="text-blue-600 font-semibold text-sm">
            {d.id}
          </p>

          <p className="font-semibold text-gray-800 mt-1">
            {d.name}
          </p>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs
          ${
            d.type === "Boys"
              ? "bg-blue-100 text-blue-600"
              : d.type === "Girls"
              ? "bg-pink-100 text-pink-600"
              : "bg-orange-100 text-orange-600"
          }`}
        >
          {d.type}
        </span>

      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-4 text-sm">

        <div>
          <p className="text-gray-500">
            Rooms
          </p>

          <p className="font-medium">
            {d.rooms}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Capacity
          </p>

          <p className="font-medium">
            {d.capacity}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Warden
          </p>

          <p className="font-medium">
            {d.warden}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Status
          </p>

          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-600">
            ● {d.status}
          </span>
        </div>

      </div>

      {/* ACTIONS */}
      <div className="grid grid-cols-2 gap-3">

        {/* EDIT */}
        <button
          onClick={() => {
            setSelectedHostel(d);
            setOpenEdit(true);
          }}
          className="flex items-center justify-center gap-2 border rounded-xl py-2.5 text-sm hover:bg-blue-50"
        >
          <Pencil size={15} />
          Edit
        </button>

        {/* DELETE */}
        <button
          onClick={() => setConfirmDeleteId(d.id)}
          className="flex items-center justify-center gap-2 border rounded-xl py-2.5 text-sm text-red-600 hover:bg-red-50"
        >
          <Trash2 size={15} />
          Delete
        </button>

      </div>

    </div>
  ))}
</div>

      {/* ================= EDIT MODAL ================= */}
      {openEdit && selectedHostel && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

          <div className="bg-white rounded-xl w-full max-w-md p-6">

            <div className="flex justify-between items-center mb-5">

              <h3 className="text-lg font-semibold">
                Edit Hostel
              </h3>

              <button onClick={() => setOpenEdit(false)}>
                ✕
              </button>

            </div>

            <div className="space-y-4">

  {/* HOSTEL NAME */}
  <input
    value={selectedHostel.name}
    onChange={(e) =>
      setSelectedHostel({
        ...selectedHostel,
        name: e.target.value,
      })
    }
    placeholder="Hostel Name"
    className="w-full border rounded-lg px-3 py-2 text-sm"
  />

  {/* TYPE */}
  <select
    value={selectedHostel.type}
    onChange={(e) =>
      setSelectedHostel({
        ...selectedHostel,
        type: e.target.value,
      })
    }
    className="w-full border rounded-lg px-3 py-2 text-sm"
  >
    <option>Boys</option>
    <option>Girls</option>
    <option>Staff</option>
  </select>

  {/* ROOMS */}
  <input
    type="number"
    value={selectedHostel.rooms}
    onChange={(e) =>
      setSelectedHostel({
        ...selectedHostel,
        rooms: e.target.value,
      })
    }
    placeholder="Rooms"
    className="w-full border rounded-lg px-3 py-2 text-sm"
  />

  {/* CAPACITY */}
  <input
    type="number"
    value={selectedHostel.capacity}
    onChange={(e) =>
      setSelectedHostel({
        ...selectedHostel,
        capacity: e.target.value,
      })
    }
    placeholder="Capacity"
    className="w-full border rounded-lg px-3 py-2 text-sm"
  />

  {/* WARDEN */}
  <input
    value={selectedHostel.warden}
    onChange={(e) =>
      setSelectedHostel({
        ...selectedHostel,
        warden: e.target.value,
      })
    }
    placeholder="Warden Name"
    className="w-full border rounded-lg px-3 py-2 text-sm"
  />

  {/* STATUS */}
  <select
    value={selectedHostel.status}
    onChange={(e) =>
      setSelectedHostel({
        ...selectedHostel,
        status: e.target.value,
      })
    }
    className="w-full border rounded-lg px-3 py-2 text-sm"
  >
    <option>Active</option>
    <option>Inactive</option>
  </select>

</div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setOpenEdit(false)}
                className="px-4 py-2 border rounded-lg text-sm"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setData((prev) =>
                    prev.map((item) =>
                      item.id === selectedHostel.id
                        ? selectedHostel
                        : item
                    )
                  );

                  setOpenEdit(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
              >
                Save
              </button>

            </div>
          </div>
        </div>
      )}
{/* ================= ADD MODAL ================= */}
{openAdd && (

  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

    <div className="bg-white rounded-xl w-full max-w-md p-6">

      <div className="flex justify-between items-center mb-5">

        <h3 className="text-lg font-semibold">
          Add Hostel
        </h3>

        <button onClick={() => setOpenAdd(false)}>
          ✕
        </button>

      </div>

      <div className="space-y-4">

        <input
          placeholder="Hostel Name"
          value={newHostel.name}
          onChange={(e) =>
            setNewHostel({
              ...newHostel,
              name: e.target.value,
            })
          }
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />

        <select
          value={newHostel.type}
          onChange={(e) =>
            setNewHostel({
              ...newHostel,
              type: e.target.value,
            })
          }
          className="w-full border rounded-lg px-3 py-2 text-sm"
        >
          <option>Boys</option>
          <option>Girls</option>
          <option>Staff</option>
        </select>

        <input
          type="number"
          placeholder="Rooms"
          value={newHostel.rooms}
          onChange={(e) =>
  setNewHostel({
    ...newHostel,
    rooms: Number(e.target.value),
  })
}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />

        <input
          type="number"
          placeholder="Capacity"
          value={newHostel.capacity}
          onChange={(e) =>
  setNewHostel({
    ...newHostel,
    capacity: Number(e.target.value),
  })
}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />

        <input
          placeholder="Warden Name"
          value={newHostel.warden}
          onChange={(e) =>
            setNewHostel({
              ...newHostel,
              warden: e.target.value,
            })
          }
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />

        <select
          value={newHostel.status}
          onChange={(e) =>
            setNewHostel({
              ...newHostel,
              status: e.target.value,
            })
          }
          className="w-full border rounded-lg px-3 py-2 text-sm"
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => setOpenAdd(false)}
          className="px-4 py-2 border rounded-lg text-sm"
        >
          Cancel
        </button>

        <button
          onClick={() => {

            const newItem = {
  ...newHostel,
  id: `HS${Math.floor(1000 + Math.random() * 9000)}`,
};

            setData((prev: any) => [
              ...prev,
              newItem,
            ]);

            setOpenAdd(false);

            setNewHostel({
  name: "",
  type: "Boys",
  rooms: 0,
  capacity: 0,
  warden: "",
  status: "Active",
});
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          Save
        </button>

      </div>
    </div>
  </div>
)}
      {/* ================= DELETE MODAL ================= */}
      {confirmDeleteId && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

          <div className="bg-white rounded-xl w-full max-w-sm p-6">

            <h3 className="text-lg font-semibold mb-2">
              Confirm Delete
            </h3>

            <p className="text-sm text-gray-500 mb-6">
              Are you sure want to delete this hostel?
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
                    prev.filter(
                      (item) => item.id !== confirmDeleteId
                    )
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