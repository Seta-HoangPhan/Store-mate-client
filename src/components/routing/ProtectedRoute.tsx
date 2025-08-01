import { selectProfile } from "@redux/features/auth/selector";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const isLoggedIn = useSelector(selectProfile);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}
