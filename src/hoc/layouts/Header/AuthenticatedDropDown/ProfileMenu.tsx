import { LineChartOutlined, LogoutOutlined } from "@ant-design/icons";
import { ProfileIcon } from "@icons/ProfileIcon";
import { Button, Card, Dropdown } from "antd";
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

interface IProfileMenu {
  name: string;
  email: string;
  handleLogout: () => void;
}

export const ProfileMenu = ({ name, email, handleLogout }: IProfileMenu) => {
  return (
    <Dropdown
      menu={{
        items: [
          {
            key: 1,
            icon: <LineChartOutlined />,
            label: <Link to="/dashboard">Хянах самбар</Link>,
          },
          {
            key: 2,
            icon: <LogoutOutlined />,
            label: (
              <Link key="Log out" onClick={handleLogout} to="/">
                Системээс гарах
              </Link>
            ),
          },
        ],
      }}
      dropdownRender={(menu) => {
        return (
          <Card>
            <div className="mb-2 flex cursor-default items-center gap-x-2">
              <ProfileIcon size={40} color="#000000" />
              <div>
                <div>{name}</div>
                <div>{email}</div>
              </div>
            </div>
            {/* Using style instead of tailwind since classes are appended to the end, causing them not to override antd's styles */}
            {React.cloneElement(menu as ReactElement, {
              style: {
                background: "transparent",
                boxShadow: "none",
                margin: 0,
                padding: 0,
              },
            })}
          </Card>
        );
      }}
      trigger={["click"]}
    >
      <Button
        type="text"
        size="large"
        className="flex cursor-pointer items-center"
      >
        <ProfileIcon color="#000" size={25} />
        <div className="ml-1 text-xl">{name}</div>
      </Button>
    </Dropdown>
  );
};
