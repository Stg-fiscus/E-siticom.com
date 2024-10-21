import { UserRole } from "@types";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@store/hooks";
import { hasRole } from "@utils/functions/roles";

interface IAuthProps {
  allowedRole: UserRole;
}

export const Auth = ({ allowedRole }: IAuthProps) => {
  const user = useAppSelector((state) => state.user);
  const location = useLocation();
  return hasRole(user.roles, allowedRole) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};
