import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Menu } from "antd";
import { useEffect, useState } from "react";
import MediaQuery from "react-responsive";
import { Link, useLocation, useNavigate } from "react-router-dom";

const items = [
  {label:"", key:""},
  { label: "Мэдлэгийн сан", key: "/knowledge" },
  { label: "Мэдээ, мэдээлэл", key: "/information" },
];

// Нэвтэрсэн үед нэмэлт линкүүд
const additionalItems = [
  { label: "Захиалга", key: "/dashboard/service" },
  { label: "Сургалт", key: "/dashboard/course" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Нэвтрэх статусыг шалгах (жишээ)
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const displayItems = isLoggedIn ? [...items, ...additionalItems] : items;

  return (
    <>
      <MediaQuery minWidth={1200}>
        <Menu
          mode="horizontal"
          items={displayItems}
          onClick={({ key }) => navigate(key)}
          className="h-full min-w-[300px] gap-x-4 border-0 text-xl"
          selectedKeys={[location.pathname]}
        />
      </MediaQuery>
      <MediaQuery maxWidth={1199}>
        <Button type="text" className="px-4 pb-1 pt-0" onClick={showDrawer}>
          <MenuOutlined />
        </Button>
        <Drawer title="Меню" onClose={onClose} open={open}>
          <ul>
            {displayItems.map((item, index) => (
              <li key={index}>
                <Link
                  className="text-lg text-link"
                  to={item.key}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Drawer>
      </MediaQuery>
    </>
  );
};
