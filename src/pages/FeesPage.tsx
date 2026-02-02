import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import StudentFeesTable from "../components/tables/StudentFeesTable";

export default function FeesPageHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex items-start justify-between mb-6">
      {/* LEFT */}
      <div>
        <h2 className="text-xl font-semibold">
          Fees Management
        </h2>
        <p className="text-sm text-gray-500">
          Dashboard / Fees
        </p>
      </div>

      {/* RIGHT — BACK BUTTON */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 px-4 py-2
                   border rounded-lg text-sm
                   text-gray-600 hover:bg-gray-100"
      >
        <ArrowLeft size={16} />
        Back
      </button>
    </div>
  );
}
