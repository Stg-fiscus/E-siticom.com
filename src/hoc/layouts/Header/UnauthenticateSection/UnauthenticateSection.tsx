import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";

const items = [{ label: "Нэвтрэх", key: "/login" }];

export const UnauthenticateSection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex items-center">
      <Menu
        mode="horizontal"
        items={items}
        onClick={({ key }) => navigate(key)}
        className="h-full gap-x-4 border-0 text-xl"
        selectedKeys={[location.pathname]}
      ></Menu>
    </div>
  );
};
