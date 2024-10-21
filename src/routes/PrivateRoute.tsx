import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "@store/hooks";

export const PrivateRoute = () => {
  const user = useAppSelector((state) => state.user);
  const location = useLocation();
  if (user.isAnonymous) {
    return <Navigate to="/login" replace state={{ redirectTo: location }} />;
  }

  return <Outlet />;
};
