import { selectProfile } from "@redux/features/auth/selector";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export default function PublicRoute() {
  const { data: user } = useSelector(selectProfile);

  return user ? <Navigate to="/product" replace /> : <Outlet />;
}
