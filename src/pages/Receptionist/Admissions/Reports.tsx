import { Download, Filter } from "lucide-react";
import { useState } from "react";



export default function Report() {
  const data = [
    {
      id: "ADM-2026-0145",
      name: "Rajesh Kumar",
      className: "Grade 1",
      quota: "General",
      date: "15 Jan 2026",
      status: "Interview Done",
      fee: "Paid",
    },
    {
      id: "ADM-2026-0156",
      name: "Priya Sharma",
      className: "Nursery",
      quota: "OBC",
      date: "16 Jan 2026",
      status: "Enrolled",
      fee: "Paid",
    },
    {
      id: "ADM-2026-0167",
      name: "Amit Patel",
      className: "Grade 2",
      quota: "General",
      date: "17 Jan 2026",
      status: "Documents Pending",
      fee: "Pending",
    },
    {
      id: "ADM-2026-0178",
      name: "Sneha Reddy",
      className: "Grade 3",
      quota: "SC/ST",
      date: "18 Jan 2026",
      status: "Offer Sent",
      fee: "Paid",
    },
    {
      id: "ADM-2026-0189",
      name: "Vikram Singh",
      className: "Grade 1",
      quota: "EWS",
      date: "19 Jan 2026",
      status: "Interview Scheduled",
      fee: "Paid",
    },
    {
      id: "ADM-2026-0190",
      name: "Anjali Verma",
      className: "Nursery",
      quota: "General",
      date: "20 Jan 2026",
      status: "Registered",
      fee: "Pending",
    },
  ];
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [quotaFilter, setQuotaFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const filteredData = data.filter((row) => {
    const rowDate = new Date(row.date);
  
    if (fromDate && rowDate < new Date(fromDate)) return false;
    if (toDate && rowDate > new Date(toDate)) return false;
  
    if (classFilter !== "All" && row.className !== classFilter) return false;
    if (quotaFilter !== "All" && row.quota !== quotaFilter) return false;
    if (statusFilter !== "All" && row.status !== statusFilter) return false;
  
    return true;
  });
  const exportExcel = () => {
    const header = "ID,Name,Class,Quota,Date,Status,Fee\n";
    const rows = filteredData
      .map(
        (r) =>
          `${r.id},${r.name},${r.className},${r.quota},${r.date},${r.status},${r.fee}`
      )
      .join("\n");
  
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "admission_report.csv";
    a.click();
  };
  const exportPDF = () => {
    window.print();
  };
    
  return (
    <div className="p-6 space-y-8">

      {/* ================= FILTER BAR (IMG 1) ================= */}
      <div className="bg-white border rounded-xl p-6 grid grid-cols-1 md:grid-cols-6 gap-4">
  <Input
    label="Date Range From"
    type="date"
    value={fromDate}
    onChange={setFromDate}
  />
  <Input
    label=" Date To"
    type="date"
    value={toDate}
    onChange={setToDate}
  />

  <Select
    label="Stream/Class"
    value={classFilter}
    options={["All", "Nursery", "Grade 1", "Grade 2", "Grade 3"]}
    onChange={setClassFilter}
  />

  <Select
    label="Quota"
    value={quotaFilter}
    options={["All", "General", "OBC", "SC/ST", "EWS"]}
    onChange={setQuotaFilter}
  />

  <Select
    label="Status"
    value={statusFilter}
    options={[
      "All",
      "Registered",
      "Interview Scheduled",
      "Interview Done",
      "Documents Pending",
      "Offer Sent",
      "Enrolled",
    ]}
    onChange={setStatusFilter}
  />

  <div className="flex items-end">
    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2">
      <Filter size={16} /> Apply Filters
    </button>
  </div>
</div>

      {/* ================= REPORT TABLE (IMG 2) ================= */}
      <div className="bg-white border rounded-xl p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold">Admission Report</h2>
            <p className="text-sm text-gray-500">
              Showing {data.length} applications
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
          <button
  onClick={exportExcel}
  className="px-4 py-2 border rounded-lg text-green-600 flex gap-2"
>
  <Download size={16} /> Export Excel
</button>
<button
  onClick={exportPDF}
  className="px-4 py-2 border rounded-lg text-red-600 flex gap-2"
>
  <Download size={16} /> Export PDF
</button>

          </div>
        </div>
        <div className="hidden md:block overflow-x-auto">
  <table className="w-full text-sm">
   <thead className="bg-gray-50 text-gray-600">
              <tr>
                <Th>Application ID</Th>
                <Th>Student Name</Th>
                <Th>Class</Th>
                <Th>Quota</Th>
                <Th>Applied Date</Th>
                <Th>Status</Th>
                <Th>Fee Status</Th>
                <Th>Actions</Th>
              </tr>
            </thead>

            <tbody>
            {filteredData.map((row) => (
                <tr key={row.id} className="border-t">
                  <Td className="text-blue-600 font-medium">{row.id}</Td>
                  <Td className="font-medium">{row.name}</Td>
                  <Td>{row.className}</Td>
                  <Td><Badge>{row.quota}</Badge></Td>
                  <Td>{row.date}</Td>
                  <Td><StatusBadge status={row.status} /></Td>
                  <Td><FeeBadge status={row.fee} /></Td>
                  <Td>
                    <button className="text-blue-600 font-medium">View</button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
{/* ================= MOBILE VIEW (CARDS) ================= */}
<div className="md:hidden space-y-4">
  {filteredData.map((row) => (
    <div
      key={row.id}
      className="bg-white border rounded-xl p-4 space-y-3"
    >
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-blue-600">{row.id}</p>
          <p className="font-medium">{row.name}</p>
          <p className="text-xs text-gray-500">{row.className}</p>
        </div>
        <StatusBadge status={row.status} />
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-500">Quota</p>
          <Badge>{row.quota}</Badge>
        </div>

        <div>
          <p className="text-gray-500">Applied Date</p>
          <p className="font-medium">{row.date}</p>
        </div>

        <div>
          <p className="text-gray-500">Fee Status</p>
          <FeeBadge status={row.fee} />
        </div>
      </div>

      {/* ACTION */}
      <button className="w-full border border-blue-600 text-blue-600 rounded-lg py-2 text-sm font-medium">
        View Details
      </button>
    </div>
  ))}
</div>

        <div className="flex justify-between items-center text-sm text-gray-500 pt-4">
          <span>Total Records: {data.length}</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded">Previous</button>
            <button className="px-3 py-1 border rounded bg-gray-100">1</button>
            <button className="px-3 py-1 border rounded">Next</button>
          </div>
        </div>
      </div>

      {/* ================= SUMMARY CARDS (IMG 3 + HOVER) ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Applications" value="284" />
        <StatCard title="Enrolled" value="89" color="text-green-600" />
        <StatCard title="In Process" value="156" color="text-blue-600" />
        <StatCard title="Pending" value="39" color="text-orange-500" />
      </div>

    </div>
    
  );
}

/* ================= COMPONENTS ================= */

function Input({ label, type = "text", value, onChange }: any) {
    return (
      <div>
        {label && <p className="text-sm font-medium mb-1">{label}</p>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>
    );
  }
  function Select({ label, value, options, onChange }: any) {
    return (
      <div>
        <p className="text-sm font-medium mb-1">{label}</p>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        >
          {options.map((opt: string) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }
function Th({ children }: any) {
  return <th className="text-left px-4 py-3">{children}</th>;
}

function Td({ children, className = "" }: any) {
  return <td className={`px-4 py-4 ${className}`}>{children}</td>;
}

function Badge({ children }: any) {
  return (
    <span className="px-3 py-1 text-xs border rounded-full">
      {children}
    </span>
  );
}

function StatusBadge({ status }: any) {
  const styles: any = {
    "Interview Done": "bg-purple-100 text-purple-700",
    Enrolled: "bg-green-100 text-green-700",
    "Documents Pending": "bg-yellow-100 text-yellow-700",
    "Offer Sent": "bg-blue-100 text-blue-700",
    "Interview Scheduled": "bg-cyan-100 text-cyan-700",
    Registered: "bg-gray-100 text-gray-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs ${styles[status]}`}>
      {status}
    </span>
  );
}

function FeeBadge({ status }: any) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs ${
        status === "Paid"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-600"
      }`}
    >
      {status}
    </span>
  );
}

function StatCard({ title, value, color = "text-gray-900" }: any) {
  return (
    <div className="bg-white border rounded-xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
      <p className="text-gray-500 mt-1">{title}</p>
    </div>
  );
}
