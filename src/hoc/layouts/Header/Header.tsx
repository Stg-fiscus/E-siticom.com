import { Logo } from "@components/Logo/Logo";
import { useAppSelector } from "@store/hooks";
import { useSimpleMessage } from "@utils/hooks/message";
import { Layout } from "antd";
import { AuthenticatedDropDown } from "./AuthenticatedDropDown/AuthenticatedDropDown";
import { Navbar } from "./Navbar/Navbar";
import { UnauthenticateSection } from "./UnauthenticateSection/UnauthenticateSection";
const { Header: AntdHeader } = Layout;

export const Header = () => {
  const user = useAppSelector((state) => state.user);

  const [notificationApi, contextHolder] = useSimpleMessage();

  return (
    <>
      {contextHolder}
      <AntdHeader className="sticky top-0 z-50 flex h-[80px] w-full items-center justify-between bg-primary-bg pe-[10%] ps-[10%] text-primary-txt shadow-sm">
        <div className="flex items-center gap-x-4">
          <Logo />
          <Navbar />
        </div>

        {!user.isAnonymous ? (
          <AuthenticatedDropDown
            name={user.name ?? ""}
            email={user.email ?? ""}
            success={notificationApi.success}
            // notificationCount={localStorage.getItem("notificationCount")}
          />
        ) : (
          <UnauthenticateSection />
        )}
      </AntdHeader>
    </>
  );
};
