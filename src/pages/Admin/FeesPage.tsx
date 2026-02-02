import { useNavigate } from "react-router-dom";
import FeesTable from "../../components/tables/FeesTable";
import { ArrowLeft } from "lucide-react";

export default function FeesPage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Header with Back button */}
      <div className="flex items-center gap-3 mb-3">
      <button
  onClick={() => navigate("/admin/dashboard")}
  className="p-2 rounded-full hover:bg-gray-100"
>
  <ArrowLeft size={28} />
</button>

      </div>

      {/* Page Title */}
      <h2 className="text-xl font-semibold mb-1">
        Fees Management
      </h2>

      <p className="text-sm text-gray-500 mb-6">
        Dashboard / Fees
      </p>

      {/* Fees Table */}
      <FeesTable />
    </>
  );
}
