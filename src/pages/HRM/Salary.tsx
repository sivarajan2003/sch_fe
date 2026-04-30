import { useEffect, useState } from "react";
import {
  RefreshCcw,
  ArrowUpDown,
  Trash2,
  Wallet,
  Plus,
  Filter,
} from "lucide-react";
import payrollService from "../../service/payrollService";
import { toast } from "react-toastify";

type SalaryType = {
  id: string;
  name: string;
  netSalary: number;
  status: string;
  month: string;
};

const statusStyle = (status: string) =>
  status === "Paid"
    ? "bg-green-100 text-green-700"
    : "bg-yellow-100 text-yellow-700";

export default function Salary() {
  const [data, setData] = useState<SalaryType[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(false);
const [addModal, setAddModal] = useState(false);

const [form, setForm] = useState({
  name: "",
  basic: 0,
  allowance: 0,
  deduction: 0,
  month: "",
});
  const load = async () => {
    try {
      setLoading(true);
      const res = await payrollService.getPayroll();
      setData(res.data.data || []);
    } catch {
      toast.error("Failed to load salary");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);
const handleCreate = async () => {
  try {
    if (!form.name.trim()) {
      return toast.error("Name required");
    }

    if (!form.month.trim()) {
      return toast.error("Month required");
    }

    // ✅ FIX: clean payload
    const payload = {
      name: form.name,
      basic: Number(form.basic),
      allowance: form.allowance ? Number(form.allowance) : 0,
      deduction: form.deduction ? Number(form.deduction) : 0,
      month: form.month,
    };

    console.log("SENDING:", payload); // debug

    await payrollService.createPayroll(payload);

    toast.success("Salary Added ✅");

    setAddModal(false);
    setForm({
      name: "",
      basic: 0,
      allowance: 0,
      deduction: 0,
      month: "",
    });

    load();
  } catch (err: any) {
    console.log("CREATE ERROR:", err?.response?.data);
    toast.error(err?.response?.data?.message || "Failed");
  }
};

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

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this record?")) return;
    await payrollService.deletePayroll(id);
    toast.success("Deleted");
    load();
  };

  const handlePay = async (id: string) => {
    await payrollService.paySalary(id);
    toast.success("Paid 💰");
    load();
  };

  const filtered = data.filter((item) => {
    const text = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(text) &&
      (statusFilter === "All" || item.status === statusFilter)
    );
  });

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div className="bg-white border rounded-2xl px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-xl sm:text-2xl font-semibold">
              Salary
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Dashboard / HR / Salary
            </p>
          </div>

          <div className="flex gap-2 sm:gap-3">
            <button onClick={load} className="p-2 border rounded-lg">
              <RefreshCcw size={16} />
            </button>

            <button className="px-3 py-2 border rounded-lg text-sm">
              Export
            </button>

            <button
  onClick={() => setAddModal(true)}
  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-1"
>
  <Plus size={14} /> Add Salary
</button>
          </div>
        </div>
      </div>

      {/* ================= SUB HEADER ================= */}
      <div className="bg-white border rounded-xl px-4 sm:px-6 py-4 space-y-4">

        {/* TOP ROW */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <h3 className="text-base font-semibold">
            Salary List
          </h3>

          <div className="flex items-center gap-3">

            {/* FILTER */}
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2 text-sm">
              <Filter size={14} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="outline-none"
              >
                <option>All</option>
                <option>Pending</option>
                <option>Paid</option>
              </select>
            </div>

            {/* SORT */}
            <button
              onClick={handleSort}
              className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm"
            >
              <ArrowUpDown size={14} /> Sort
            </button>
          </div>
        </div>

        {/* SEARCH */}
        <div className="flex justify-between items-center flex-col sm:flex-row gap-3">
          <p className="text-sm text-gray-500">
            Total: {filtered.length}
          </p>

          <input
            placeholder="Search salary..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-56 border rounded-lg px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="hidden lg:block bg-white border rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-center">Month</th>
              <th className="px-4 py-3 text-center">Salary</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6">
                  No Data
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">

                  <td className="px-4 py-3">{item.name}</td>

                  <td className="px-4 py-3 text-center">
                    {item.month}
                  </td>

                  <td className="px-4 py-3 text-center font-medium">
                    ₹{item.netSalary}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${statusStyle(item.status)}`}>
                      {item.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 flex justify-center gap-2">

                    {item.status !== "Paid" && (
                      <button
                        onClick={() => handlePay(item.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Pay
                      </button>
                    )}

                    <button onClick={() => handleDelete(item.id)}>
                      <Trash2 size={18} className="text-red-500" />
                    </button>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE VIEW ================= */}
      <div className="lg:hidden space-y-4">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white border rounded-xl p-4 space-y-3">

            <div className="flex justify-between">
              <h4 className="font-semibold">{item.name}</h4>
              <span className={`text-xs px-2 py-1 rounded ${statusStyle(item.status)}`}>
                {item.status}
              </span>
            </div>

            <div className="text-sm text-gray-500">
              Month: {item.month}
            </div>

            <div className="font-semibold text-lg">
              ₹{item.netSalary}
            </div>

            {item.status !== "Paid" && (
              <button
                onClick={() => handlePay(item.id)}
                className="w-full bg-green-600 text-white py-2 rounded-lg"
              >
                Pay Salary
              </button>
            )}
          </div>
        ))}
      </div>
{addModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white p-6 rounded-xl w-80 space-y-4">

      <h2 className="text-lg font-semibold">Add Salary</h2>

      <input
        placeholder="Name"
        className="w-full border px-3 py-2 rounded"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Basic Salary"
        className="w-full border px-3 py-2 rounded"
        value={form.basic}
        onChange={(e) =>
          setForm({ ...form, basic: Number(e.target.value) })
        }
      />

      <input
        type="number"
        placeholder="Allowance"
        className="w-full border px-3 py-2 rounded"
        value={form.allowance}
        onChange={(e) =>
          setForm({ ...form, allowance: Number(e.target.value) })
        }
      />

      <input
        type="number"
        placeholder="Deduction"
        className="w-full border px-3 py-2 rounded"
        value={form.deduction}
        onChange={(e) =>
          setForm({ ...form, deduction: Number(e.target.value) })
        }
      />

      <input
        placeholder="Month (e.g. April)"
        className="w-full border px-3 py-2 rounded"
        value={form.month}
        onChange={(e) =>
          setForm({ ...form, month: e.target.value })
        }
      />

      <div className="flex justify-end gap-2">

        <button
          onClick={() => setAddModal(false)}
          className="px-3 py-1 border rounded"
        >
          Cancel
        </button>

        <button
          onClick={handleCreate}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Save
        </button>

      </div>

    </div>
  </div>
)}
    </div>
  );
}