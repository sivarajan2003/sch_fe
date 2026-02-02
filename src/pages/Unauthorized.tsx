// src/pages/Unauthorized.tsx
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-2">
          Access Denied
        </h1>

        <p className="text-gray-600 mb-6">
          You do not have permission to access this page.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
