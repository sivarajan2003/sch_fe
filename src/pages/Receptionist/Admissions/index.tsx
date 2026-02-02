import { Outlet, useLocation } from "react-router-dom";

export default function ReceptionistAdmissions() {
  const location = useLocation();

  // 👇 hide heading only on verification detail page
  const hideAdmissionsHeading =
    location.pathname.includes(
      "/admin/dashboard/receptionist/admissions/verification/"
    );

  return (
    <div className="p-6">
      {!hideAdmissionsHeading && (
        <h1 className="text-xl font-semibold mb-4">Admissions</h1>
      )}

      <Outlet />
    </div>
  );
}
