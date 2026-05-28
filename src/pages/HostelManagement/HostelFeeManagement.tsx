//hostelfeemanagement.tsx
import { useState, useEffect } from "react";
import {
  IndianRupee,
  Users,
  AlertCircle,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  RefreshCcw,
  Printer,
  ArrowUpDown,
  CheckCircle,
  Clock3,
} from "lucide-react";
import {
  getFees,
  createFee,
  updateFee,
  deleteFee,
} from '../../service/hostelfeemanagementService';
export default function HostelFeeManagement() {
  const [search, setSearch] = useState("");
  const [feeData, setFeeData] =
  useState<any[]>([]);

  // const feeData = [
  //   {
  //     id: "HF1001",
  //     student: "Siva Kumar",
  //     initial: "SK",
  //     regNo: "21ISR049",
  //     hostel: "Boys Hostel A",
  //     room: "A-101",
  //     total: "₹45,000",
  //     paid: "₹45,000",
  //     balance: "₹0",
  //     dueDate: "12 Jun 2026",
  //     status: "Paid",
  //     color: "blue",
  //     year: "Final Year",
  //   },
  //   {
  //     id: "HF1002",
  //     student: "Priya R",
  //     initial: "PR",
  //     regNo: "22ISR112",
  //     hostel: "Girls Hostel B",
  //     room: "G-204",
  //     total: "₹40,000",
  //     paid: "₹25,000",
  //     balance: "₹15,000",
  //     dueDate: "25 Jun 2026",
  //     status: "Partial",
  //     color: "pink",
  //     year: "III Year",
  //   },
  //   {
  //     id: "HF1003",
  //     student: "Arun Raj",
  //     initial: "AR",
  //     regNo: "20ISR087",
  //     hostel: "Boys Hostel A",
  //     room: "A-305",
  //     total: "₹42,000",
  //     paid: "₹0",
  //     balance: "₹42,000",
  //     dueDate: "10 Jun 2026",
  //     status: "Overdue",
  //     color: "orange",
  //     year: "II Year",
  //   },
  // ];
 
const [filterStatus, setFilterStatus] =
  useState("");

const [sortOrder, setSortOrder] =
  useState("asc");

const filtered = feeData
  .filter(
    (d) =>
      d.student
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      d.regNo
        ?.toLowerCase()
        .includes(search.toLowerCase())
  )

  .filter((d) =>
    filterStatus
      ? d.status === filterStatus
      : true
  )

  .sort((a, b) =>
    sortOrder === "asc"
      ? (a.student || "").localeCompare(
          b.student || ""
        )
      : (b.student || "").localeCompare(
          a.student || ""
        )
  );
  const [showModal, setShowModal] =
  useState(false);

// const [filterStatus, setFilterStatus] =
//   useState("");

// const [sortOrder, setSortOrder] =
//   useState("asc");

const [viewData, setViewData] =
  useState<any>(null);

const [formData, setFormData] =
  useState({
    student: "",
    regNo: "",
    hostel: "",
    room: "",
    total: "",
    paid: "",
    balance: "",
    dueDate: "",
    status: "Paid",
    year: "",
  });
useEffect(() => {
  fetchFees();
}, []);

const fetchFees = async () => {

  try {

    const res = await getFees();

    setFeeData(res.data.data);

  } catch (error) {

    console.log(error);

  }
};
const handleSave = async () => {

  try {

    const payload = {
      ...formData,
      total: Number(formData.total),
      paid: Number(formData.paid),
      balance: Number(formData.balance),
    };

    const res =
      await createFee(payload);

    setFeeData([
      res.data.data,
      ...feeData,
    ]);

    setFormData({
      student: "",
      regNo: "",
      hostel: "",
      room: "",
      total: "",
      paid: "",
      balance: "",
      dueDate: "",
      status: "Paid",
      year: "",
    });

    setShowModal(false);

  } catch (error) {

    console.log(error);

  }
};
  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div className="bg-white border rounded-2xl px-6 py-5">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Hostel Fee Management
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Dashboard / Hostel Management / Fee Management
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-3">

            <button
  onClick={fetchFees}
  className="p-2.5 border rounded-lg"
>
              <RefreshCcw size={16} />
            </button>

            <button className="p-2.5 border rounded-lg">
              <Printer size={16} />
            </button>

            <button
  onClick={() =>
    window.print()
  }
  className="px-4 py-2 border rounded-lg text-sm"
>
              Export
            </button>

<button
  onClick={() =>
    setShowModal(true)
  }
  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 text-sm"
>

              <Plus size={16} />
              Add Fee
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
                Total Collection
              </p>

              <h3 className="text-2xl font-semibold mt-2 text-green-600">
                ₹{
  feeData.reduce(
    (a, b) => a + b.paid,
    0
  )
}
              </h3>
            </div>

            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <IndianRupee className="text-green-600" size={22} />
            </div>

          </div>
        </div>

        {/* CARD */}
        <div className="bg-white border rounded-2xl p-5">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Paid Students
              </p>

              <h3 className="text-2xl font-semibold mt-2 text-blue-600">
               {
  feeData.filter(
    (d) =>
      d.status === "Paid"
  ).length
}
              </h3>
            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <CheckCircle className="text-blue-600" size={22} />
            </div>

          </div>
        </div>

        {/* CARD */}
        <div className="bg-white border rounded-2xl p-5">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Pending Fees
              </p>

              <h3 className="text-2xl font-semibold mt-2 text-orange-600">
               {
  feeData.filter(
    (d) =>
      d.status === "Partial"
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
                Overdue
              </p>

              <h3 className="text-2xl font-semibold mt-2 text-red-600">
                {
  feeData.filter(
    (d) =>
      d.status === "Overdue"
  ).length
}
              </h3>
            </div>

            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
              <AlertCircle className="text-red-600" size={22} />
            </div>

          </div>
        </div>

      </div>

      {/* ================= SEARCH ================= */}
      <div className="bg-white border rounded-xl px-6 py-4 space-y-4">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <h3 className="text-base font-semibold">
            Hostel Fee List
          </h3>

          <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-3">

            <select
  value={filterStatus}
  onChange={(e) =>
    setFilterStatus(e.target.value)
  }
  className="px-3 py-2 border rounded-lg text-sm"
>
  <option value="">
    All Status
  </option>

  <option value="Paid">
    Paid
  </option>

  <option value="Partial">
    Partial
  </option>

  <option value="Overdue">
    Overdue
  </option>
</select>

           <select
  value={sortOrder}
  onChange={(e) =>
    setSortOrder(e.target.value)
  }
  className="px-3 py-2 border rounded-lg text-sm"
>
  <option value="asc">
    A-Z
  </option>

  <option value="desc">
    Z-A
  </option>
</select>

          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="text-sm text-gray-500">
            Total Fees : {filtered.length}
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
              <th className="px-4 py-3 text-center">Room</th>
              <th className="px-4 py-3 text-center">Total Fee</th>
              <th className="px-4 py-3 text-center">Paid</th>
              <th className="px-4 py-3 text-center">Balance</th>
              <th className="px-4 py-3 text-center">Due Date</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>

            {filtered.length === 0 ? (

<tr>

  <td
    colSpan={10}
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

                <td className="px-4 py-3 text-center font-semibold">
                  {d.total}
                </td>

                <td className="px-4 py-3 text-center text-green-600 font-semibold">
                  {d.paid}
                </td>

                <td className="px-4 py-3 text-center text-red-600 font-semibold">
                  {d.balance}
                </td>

                <td className="px-4 py-3 text-center">
                  {d.dueDate}
                </td>

                <td className="px-4 py-3 text-center">

                  <span
                    className={`px-2 py-1 rounded-full text-xs
                    ${
                      d.status === "Paid"
                        ? "bg-green-100 text-green-600"
                        : d.status === "Partial"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    ● {d.status}
                  </span>

                </td>

                <td className="px-4 py-3 text-center">

                  <div className="flex items-center justify-center gap-3">

                   <button
  onClick={() =>
    setViewData(d)
  }
  className="text-blue-600 hover:text-blue-800"
>
                      <Eye size={18} />
                    </button>

                    <button className="text-yellow-600 hover:text-yellow-800">
                      <Edit size={18} />
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
              d.status === "Paid"
                ? "bg-green-100 text-green-600"
                : d.status === "Partial"
                ? "bg-yellow-100 text-yellow-600"
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
              Total
            </p>

            <p className="font-medium">
              ₹{d.total}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Paid
            </p>

            <p className="font-medium text-green-600">
              ₹{d.paid}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Balance
            </p>

            <p className="font-medium text-red-600">
              ₹{d.balance}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Due Date
            </p>

            <p className="font-medium">
              {d.dueDate}
            </p>
          </div>

        </div>

        {/* ACTIONS */}

        <div className="grid grid-cols-2 gap-3">

          <button
            onClick={() =>
              setViewData(d)
            }
            className="border rounded-xl py-2 text-sm hover:bg-blue-50"
          >
            View
          </button>

          <button
            className="border rounded-xl py-2 text-sm hover:bg-yellow-50"
          >
            Edit
          </button>

        </div>

      </div>

    ))
  )}

</div>

{/* ADD FEE MODAL */}

{showModal && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

  <div className="bg-white rounded-2xl w-full max-w-4xl p-6">

    <div className="flex justify-between items-center mb-5">

      <h2 className="text-xl font-semibold">
        Add Fee
      </h2>

      <button
        onClick={() =>
          setShowModal(false)
        }
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
            student:
              e.target.value,
          })
        }
        className="border rounded-lg px-3 py-2"
      />

      <input
        placeholder="Register No"
        value={formData.regNo}
        onChange={(e) =>
          setFormData({
            ...formData,
            regNo:
              e.target.value,
          })
        }
        className="border rounded-lg px-3 py-2"
      />

      <input
        placeholder="Hostel"
        value={formData.hostel}
        onChange={(e) =>
          setFormData({
            ...formData,
            hostel:
              e.target.value,
          })
        }
        className="border rounded-lg px-3 py-2"
      />

      <input
        placeholder="Room"
        value={formData.room}
        onChange={(e) =>
          setFormData({
            ...formData,
            room:
              e.target.value,
          })
        }
        className="border rounded-lg px-3 py-2"
      />

      <input
        placeholder="Total Fee"
        value={formData.total}
        onChange={(e) =>
          setFormData({
            ...formData,
            total:
              e.target.value,
          })
        }
        className="border rounded-lg px-3 py-2"
      />

      <input
        placeholder="Paid"
        value={formData.paid}
        onChange={(e) =>
          setFormData({
            ...formData,
            paid:
              e.target.value,
          })
        }
        className="border rounded-lg px-3 py-2"
      />

      <input
        placeholder="Balance"
        value={formData.balance}
        onChange={(e) =>
          setFormData({
            ...formData,
            balance:
              e.target.value,
          })
        }
        className="border rounded-lg px-3 py-2"
      />

      <input
        type="date"
        value={formData.dueDate}
        onChange={(e) =>
          setFormData({
            ...formData,
            dueDate:
              e.target.value,
          })
        }
        className="border rounded-lg px-3 py-2"
      />

      <select
        value={formData.status}
        onChange={(e) =>
          setFormData({
            ...formData,
            status:
              e.target.value,
          })
        }
        className="border rounded-lg px-3 py-2"
      >
        <option value="Paid">
          Paid
        </option>

        <option value="Partial">
          Partial
        </option>

        <option value="Overdue">
          Overdue
        </option>
      </select>

      <input
        placeholder="Year"
        value={formData.year}
        onChange={(e) =>
          setFormData({
            ...formData,
            year:
              e.target.value,
          })
        }
        className="border rounded-lg px-3 py-2"
      />

    </div>

    <div className="flex justify-end gap-3 mt-6">

      <button
        onClick={() =>
          setShowModal(false)
        }
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
        Fee Details
      </h2>

      <button
        onClick={() =>
          setViewData(null)
        }
      >
        ✕
      </button>

    </div>

    <div className="grid grid-cols-2 gap-4">

      <div>
        <p className="text-gray-500">
          Student
        </p>

        <h3>
          {viewData?.student}
        </h3>
      </div>

      <div>
        <p className="text-gray-500">
          Register No
        </p>

        <h3>
          {viewData?.regNo}

        </h3>
      </div>

      <div>
        <p className="text-gray-500">
          Hostel
        </p>

        <h3>
          {viewData?.hostel}
        </h3>
      </div>

      <div>
        <p className="text-gray-500">
          Room
        </p>

        <h3>
         {viewData?.room}
        </h3>
      </div>

      <div>
        <p className="text-gray-500">
          Total
        </p>

        <h3>
          ₹{viewData?.total}
        </h3>
      </div>

      <div>
        <p className="text-gray-500">
          Paid
        </p>

        <h3>
          ₹{viewData?.paid}
        </h3>
      </div>

      <div>
        <p className="text-gray-500">
          Balance
        </p>

        <h3>
          ₹{viewData?.balance}
        </h3>
      </div>

      <div>
        <p className="text-gray-500">
          Due Date
        </p>

        <h3>
          {viewData?.dueDate}
        </h3>
      </div>

    </div>

  </div>

</div>

)}
    </div>
  );
}