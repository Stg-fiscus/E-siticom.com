import { useAppDispatch } from "@store/hooks";
import { resetNotifications } from "@store/notifications/notificationsSlice";
import { resetUser } from "@store/user/userSlice";
import { useNavigate } from "react-router-dom";
import { HeaderNotification } from "../HeaderNotification/HeaderNotification";
import { ProfileMenu } from "./ProfileMenu";

interface IAuthenticatedDropDownProps {
  name: string;
  email: string;
  success: (msg: string) => void;
}

export const AuthenticatedDropDown = ({
  name,
  email,
  success,
}: IAuthenticatedDropDownProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    navigate("/");
    dispatch(resetUser());
    dispatch(resetNotifications());

    success("Системээс гарлаа.");
  };
  return (
    <>
      <div className="flex h-fit items-center gap-x-2 text-xl">
        <ProfileMenu name={name} email={email} handleLogout={handleLogout} />
        <HeaderNotification />
      </div>
    </>
  );
};
