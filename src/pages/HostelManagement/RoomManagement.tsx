//roommanagement.tsx

import { useEffect, useState } from "react";
import {
  BedDouble,
  Users,
  Plus,
  Search,
  Filter,
  Pencil,
  Trash2,
  RefreshCcw,
  Printer,
  ArrowUpDown,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../../service/roommanagementService";
export default function RoomManagement() {

 

  // ✅ FIRST INITIAL DATA
  // const INITIAL_DATA = [
  //   {
  //     id: "RM1001",
  //     roomNo: "A-101",
  //     hostel: "Boys Hostel",
  //     floor: "1st Floor",
  //     capacity: 4,
  //     occupied: 3,
  //     type: "AC Room",
  //     status: "Available",
  //   },
  //   {
  //     id: "RM1002",
  //     roomNo: "G-204",
  //     hostel: "Girls Hostel",
  //     floor: "2nd Floor",
  //     capacity: 6,
  //     occupied: 6,
  //     type: "Non AC",
  //     status: "Full",
  //   },
  // ];
 const [search, setSearch] = useState("");
  // ✅ AFTER THAT USESTATE
 const [data, setData] = useState<any[]>([]);

 useEffect(() => {
  fetchRooms();
}, []);

const fetchRooms = async () => {
  try {

    const res = await getRooms();

    setData(res.data.rows);

  } catch (err) {
    console.log(err);
  }
};


  const [openAdd, setOpenAdd] = useState(false);
const [openEdit, setOpenEdit] = useState(false);

const [selectedRoom, setSelectedRoom] =
  useState<any>(null);

const [confirmDeleteId, setConfirmDeleteId] =
  useState<string | null>(null);

const [openFilter, setOpenFilter] =
  useState(false);

const [sortAsc, setSortAsc] =
  useState(true);
  const [newRoom, setNewRoom] = useState({
    roomNo: "",
    hostel: "",
    floor: "",
    capacity: 0,
    occupied: 0,
    type: "",
    status: "Available",
  });
  const filtered = data.filter(
    (d) =>
      d.roomNo.toLowerCase().includes(search.toLowerCase()) ||
     d.room_id?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div className="bg-white border rounded-2xl px-6 py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Room Management
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Dashboard / Hostel Management / Room Management
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
  onClick={() => setOpenAdd(true)}
  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 text-sm"
>
              <Plus size={16} />
              Add Room
            </button>

          </div>
        </div>
      </div>

      {/* ================= TOP CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

        {/* CARD */}
        <div className="bg-white border rounded-2xl p-5">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Rooms
              </p>

              <h3 className="text-2xl font-semibold mt-2">
  {data.length}
</h3>
            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <BedDouble className="text-blue-600" size={22} />
            </div>

          </div>
        </div>

        {/* CARD */}
        <div className="bg-white border rounded-2xl p-5">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Available Rooms
              </p>

              <h3 className="text-2xl font-semibold mt-2 text-green-600">
  {
    data.filter(
      (d) => d.status === "Available"
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
                Occupied Rooms
              </p>

              <h3 className="text-2xl font-semibold mt-2 text-orange-600">
  {
    data.filter(
      (d) => d.status === "Full"
    ).length
  }
</h3>
            </div>

            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <Users className="text-orange-600" size={22} />
            </div>

          </div>
        </div>

        {/* CARD */}
        <div className="bg-white border rounded-2xl p-5">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Maintenance
              </p>

              <h3 className="text-2xl font-semibold mt-2 text-red-600">
  {
    data.filter(
      (d) => d.status === "Maintenance"
    ).length
  }
</h3>
            </div>

            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
              <XCircle className="text-red-600" size={22} />
            </div>

          </div>
        </div>

      </div>

      {/* ================= SEARCH + FILTER ================= */}
      <div className="bg-white border rounded-xl px-6 py-4 space-y-4">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <h3 className="text-base font-semibold">
            Room List
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

      setData(
  data.filter(
    (d) => d.status === "Available"
  )
);

      setOpenFilter(false);
    }}
    className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm"
  >
    Available Rooms
  </button>

  <button
    onClick={() => {

      setData(
  data.filter(
    (d) => d.status === "Full"
  )
);

      setOpenFilter(false);
    }}
    className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm"
  >
    Full Rooms
  </button>

  <button
    onClick={() => {

      fetchRooms();

      setOpenFilter(false);
    }}
    className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm"
  >
    All Rooms
  </button>

</div>
)}

</div>

           <button
  onClick={() => {

    setData((prev) =>
      [...prev].sort((a, b) =>
        sortAsc
          ? a.roomNo.localeCompare(b.roomNo)
          : b.roomNo.localeCompare(a.roomNo)
      )
    );

    setSortAsc(!sortAsc);
  }}
  className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm"
>
              <ArrowUpDown size={14} />
              Sort By
            </button>

          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="text-sm text-gray-500">
            Total Rooms : {filtered.length}
          </div>

          <div className="relative w-full sm:w-64">

            <Search
              size={16}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              placeholder="Search Room"
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
              <th className="px-4 py-3 text-center">Room No</th>
              <th className="px-4 py-3 text-center">Hostel</th>
              <th className="px-4 py-3 text-center">Floor</th>
              <th className="px-4 py-3 text-center">Capacity</th>
              <th className="px-4 py-3 text-center">Occupied</th>
              <th className="px-4 py-3 text-center">Room Type</th>
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

filtered.map((d: any) => (
              <tr
                key={d.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-center text-blue-600">
                {d.room_id}
                </td>

                <td className="px-4 py-3 text-center font-medium">
                  {d.roomNo}
                </td>

                <td className="px-4 py-3 text-center">
                  {d.hostel}
                </td>

                <td className="px-4 py-3 text-center">
                  {d.floor}
                </td>

                <td className="px-4 py-3 text-center">
                  {d.capacity}
                </td>

                <td className="px-4 py-3 text-center">
                  {d.occupied}
                </td>

                <td className="px-4 py-3 text-center">

                  <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-600">
                    {d.type}
                  </span>

                </td>

                <td className="px-4 py-3 text-center">

                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      d.status === "Available"
                        ? "bg-green-100 text-green-600"
                        : d.status === "Full"
                        ? "bg-red-100 text-red-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    ● {d.status}
                  </span>

                </td>

                <td className="px-4 py-3 text-center">

                  <div className="flex items-center justify-center gap-3">

<button
  onClick={() => {

    setSelectedRoom(d);

    setOpenEdit(true);
  }}
  className="text-blue-600 hover:text-blue-800"
>
                      <Pencil size={18} />
                    </button>

                    <button
  onClick={() =>
    setConfirmDeleteId(d.id)
  }
  className="text-red-500 hover:text-red-700"
>
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>
              </tr>
           ))

)}

</tbody>

        </table>
      </div>
      {/* ================= MOBILE + TABLET VIEW ================= */}

<div className="lg:hidden space-y-4">

{filtered.length === 0 ? (

<div className="bg-white border rounded-2xl p-10 text-center text-gray-500">
  No Data Found
</div>

) : (

filtered.map((d: any) =>(

    <div
      key={d.id}
      className="bg-white border rounded-2xl p-4"
    >

      {/* TOP */}
      <div className="flex justify-between items-start">

        <div>

          <p className="text-blue-600 font-semibold text-sm">
           {d.room_id}
          </p>

          <h3 className="font-semibold text-gray-800 mt-1">
            {d.roomNo}
          </h3>

          <p className="text-sm text-gray-500">
            {d.hostel}
          </p>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs ${
            d.status === "Available"
              ? "bg-green-100 text-green-600"
              : d.status === "Full"
              ? "bg-red-100 text-red-600"
              : "bg-orange-100 text-orange-600"
          }`}
        >
          ● {d.status}
        </span>

      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-4 mt-5 text-sm">

        <div>
          <p className="text-gray-500">
            Floor
          </p>

          <p className="font-medium">
            {d.floor}
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
            Occupied
          </p>

          <p className="font-medium">
            {d.occupied}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Room Type
          </p>

          <span className="inline-block px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-600 mt-1">
            {d.type}
          </span>
        </div>

      </div>

      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-2 gap-3 mt-5">

<button
  onClick={() => {

    setSelectedRoom(d);

    setOpenEdit(true);
  }}
  className="flex items-center justify-center gap-2 border rounded-xl py-2 text-sm text-blue-600"
>
          <Pencil size={16} />
          Edit
        </button>

<button
  onClick={() =>
    setConfirmDeleteId(d.id)
  }
  className="flex items-center justify-center gap-2 border rounded-xl py-2 text-sm text-red-600"
>
          <Trash2 size={16} />
          Delete
        </button>

      </div>

    </div>
  ))

)}

</div>
{/* ================= ADD ROOM MODAL ================= */}

{openAdd && (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

  <div className="bg-white rounded-2xl w-full max-w-2xl p-6">

    {/* HEADER */}
    <div className="flex items-center justify-between mb-6">

      <h2 className="text-xl font-semibold text-gray-800">
        Add Room
      </h2>

      <button
        onClick={() => setOpenAdd(false)}
        className="text-gray-500 text-xl"
      >
        ✕
      </button>

    </div>

    {/* FORM */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {/* ROOM NO */}
      <div>
        <label className="text-sm text-gray-600">
          Room No
        </label>

        <input
          type="text"
          value={newRoom.roomNo}
          onChange={(e) =>
            setNewRoom({
              ...newRoom,
              roomNo: e.target.value,
            })
          }
          className="w-full border rounded-xl px-4 py-3 mt-1"
        />
      </div>

      {/* HOSTEL */}
      <div>
        <label className="text-sm text-gray-600">
          Hostel
        </label>

        <select
          value={newRoom.hostel}
          onChange={(e) =>
            setNewRoom({
              ...newRoom,
              hostel: e.target.value,
            })
          }
          className="w-full border rounded-xl px-4 py-3 mt-1"
        >
          <option>Boys Hostel</option>
          <option>Girls Hostel</option>
          <option>Staff Hostel</option>
        </select>
      </div>

      {/* FLOOR */}
      <div>
        <label className="text-sm text-gray-600">
          Floor
        </label>

        <input
          type="text"
          value={newRoom.floor}
          onChange={(e) =>
            setNewRoom({
              ...newRoom,
              floor: e.target.value,
            })
          }
          className="w-full border rounded-xl px-4 py-3 mt-1"
        />
      </div>

      {/* CAPACITY */}
      <div>
        <label className="text-sm text-gray-600">
          Capacity
        </label>

        <input
          type="number"
          value={newRoom.capacity}
          onChange={(e) =>
            setNewRoom({
              ...newRoom,
              capacity: Number(e.target.value),
            })
          }
          className="w-full border rounded-xl px-4 py-3 mt-1"
        />
      </div>

      {/* OCCUPIED */}
      <div>
        <label className="text-sm text-gray-600">
          Occupied
        </label>

        <input
          type="number"
          value={newRoom.occupied}
          onChange={(e) =>
            setNewRoom({
              ...newRoom,
              occupied: Number(e.target.value),
            })
          }
          className="w-full border rounded-xl px-4 py-3 mt-1"
        />
      </div>

      {/* ROOM TYPE */}
      <div>
        <label className="text-sm text-gray-600">
          Room Type
        </label>

        <select
          value={newRoom.type}
          onChange={(e) =>
            setNewRoom({
              ...newRoom,
              type: e.target.value,
            })
          }
          className="w-full border rounded-xl px-4 py-3 mt-1"
        >
          <option>AC Room</option>
          <option>Non AC</option>
          <option>Deluxe</option>
        </select>
      </div>

      {/* STATUS */}
      <div>
        <label className="text-sm text-gray-600">
          Status
        </label>

        <select
          value={newRoom.status}
          onChange={(e) =>
            setNewRoom({
              ...newRoom,
              status: e.target.value,
            })
          }
          className="w-full border rounded-xl px-4 py-3 mt-1"
        >
          <option>Available</option>
          <option>Full</option>
          <option>Maintenance</option>
        </select>
      </div>

    </div>

    {/* FOOTER */}
    <div className="flex justify-end gap-3 mt-8">

      {/* CANCEL */}
      <button
        onClick={() => setOpenAdd(false)}
        className="px-5 py-2.5 border rounded-xl text-sm"
      >
        Cancel
      </button>

      {/* SAVE */}
      {/* SAVE */}
<button
  onClick={async () => {
          try {

  await createRoom(newRoom);

  fetchRooms();

  setNewRoom({
    roomNo: "",
    hostel: "",
    floor: "",
    capacity: 0,
    occupied: 0,
    type: "",
    status: "Available",
  });

  setOpenAdd(false);

} catch (err) {

  console.log(err);

}
        }}
        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm"
      >
        Save
      </button>

    </div>

  </div>

</div>
)}
{/* ================= EDIT MODAL ================= */}

{openEdit && selectedRoom && (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

  <div className="bg-white rounded-2xl w-full max-w-2xl p-6">

    <div className="flex justify-between items-center mb-6">

      <h2 className="text-xl font-semibold">
        Edit Room
      </h2>

      <button
        onClick={() => setOpenEdit(false)}
      >
        ✕
      </button>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <input
        value={selectedRoom.roomNo}
        onChange={(e) =>
          setSelectedRoom({
            ...selectedRoom,
            roomNo: e.target.value,
          })
        }
        placeholder="Room No"
        className="border rounded-xl px-4 py-3"
      />

      <input
        value={selectedRoom.hostel}
        onChange={(e) =>
          setSelectedRoom({
            ...selectedRoom,
            hostel: e.target.value,
          })
        }
        placeholder="Hostel"
        className="border rounded-xl px-4 py-3"
      />

      <input
        value={selectedRoom.floor}
        onChange={(e) =>
          setSelectedRoom({
            ...selectedRoom,
            floor: e.target.value,
          })
        }
        placeholder="Floor"
        className="border rounded-xl px-4 py-3"
      />

      <input
        type="number"
        value={selectedRoom.capacity}
        onChange={(e) =>
          setSelectedRoom({
            ...selectedRoom,
            capacity: Number(e.target.value),
          })
        }
        placeholder="Capacity"
        className="border rounded-xl px-4 py-3"
      />

      <input
        type="number"
        value={selectedRoom.occupied}
        onChange={(e) =>
          setSelectedRoom({
            ...selectedRoom,
            occupied: Number(e.target.value),
          })
        }
        placeholder="Occupied"
        className="border rounded-xl px-4 py-3"
      />

      <select
        value={selectedRoom.status}
        onChange={(e) =>
          setSelectedRoom({
            ...selectedRoom,
            status: e.target.value,
          })
        }
        className="border rounded-xl px-4 py-3"
      >
        <option>Available</option>
        <option>Full</option>
        <option>Maintenance</option>
      </select>

    </div>

    <div className="flex justify-end gap-3 mt-8">

      <button
        onClick={() => setOpenEdit(false)}
        className="px-5 py-2.5 border rounded-xl"
      >
        Cancel
      </button>

      <button
  onClick={async () => {

          try {

  await updateRoom(
    selectedRoom.id,
    selectedRoom
  );

  fetchRooms();

  setOpenEdit(false);

} catch (err) {

  console.log(err);

}
        }}
        className="px-5 py-2.5 bg-blue-600 text-white rounded-xl"
      >
        Save
      </button>

    </div>

  </div>

</div>
)}
{/* ================= DELETE MODAL ================= */}

{confirmDeleteId && (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

  <div className="bg-white rounded-2xl p-6 w-full max-w-md">

    <h2 className="text-lg font-semibold text-gray-800">
      Delete Room
    </h2>

    <p className="text-sm text-gray-500 mt-2">
      Are you sure want to delete this room?
    </p>

    <div className="flex justify-end gap-3 mt-6">

      <button
        onClick={() =>
          setConfirmDeleteId(null)
        }
        className="px-5 py-2 border rounded-xl"
      >
        Cancel
      </button>

      <button
  onClick={async () => {
         try {

  await deleteRoom(confirmDeleteId);

  fetchRooms();

  setConfirmDeleteId(null);

} catch (err) {

  console.log(err);

}
        }}
        className="px-5 py-2 bg-red-600 text-white rounded-xl"
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