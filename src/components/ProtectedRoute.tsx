import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  role,
}: {
  children: JSX.Element;
  role: string | string[];
}) {
  const userRole = localStorage.getItem("role");
  const isAuth = localStorage.getItem("isAuth");
  const isParentPortal = localStorage.getItem("portal") === "true";

  if (!isAuth || !userRole) {
    return <Navigate to="/login" replace />;
  }

  const allowedRoles = Array.isArray(role) ? role : [role];

  // ✅ ALLOW PARENT PORTAL TO ACCESS RECEPTIONIST ROUTES
  if (
    allowedRoles.includes(userRole) ||
    (isParentPortal && allowedRoles.includes("receptionist"))
  ) {
    return children;
  }

  return <Navigate to="/unauthorized" replace />;
}
