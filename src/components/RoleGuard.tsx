import { Navigate } from "react-router-dom";
import { ROLE_PERMISSIONS } from "../lib/rolePermissions";

interface Props {
  children: JSX.Element;
  requiredRole: "admin" | "teacher" | "student" | "parent";
}

export default function RoleGuard({ children, requiredRole }: Props) {
  const isAuth = localStorage.getItem("isAuth");
  const role = localStorage.getItem("role") as
    | "admin"
    | "teacher"
    | "student"
    | "parent"
    | null;

  // Not logged in
  if (!isAuth || !role) {
    return <Navigate to="/login" replace />;
  }

  const allowedRoles = ROLE_PERMISSIONS[role];

  // Role not allowed → FORCE re-login
  if (!allowedRoles.includes(requiredRole)) {
    localStorage.clear(); // 🔥 force logout
    return <Navigate to="/login" replace />;
  }

  return children;
}
