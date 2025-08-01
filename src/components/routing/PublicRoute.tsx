import { selectProfile } from "@redux/features/auth/selector";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export default function PublicRoute() {
  const isLoggedIn = useSelector(selectProfile);

  return isLoggedIn ? <Navigate to="/product" replace /> : <Outlet />;
}
