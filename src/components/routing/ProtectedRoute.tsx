import { Box, CircularProgress } from "@mui/material";
import { selectProfile } from "@redux/features/auth/selector";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const { data: user, status } = useSelector(selectProfile);

  if (status === "loading") {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
