import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Menu } from "antd";
import { useState } from "react";
import MediaQuery from "react-responsive";
import { Link, useLocation, useNavigate } from "react-router-dom";

const items = [
  { label: "Бидний тухай", key: "/aboutUs" },
  { label: "Мэдлэгийн сан", key: "/knowledge" },
  { label: "Мэдээ, мэдээлэл", key: "/information" },
  // { label: "Захиалга ", key: "/order" },
  // { label: "Сургалт", key: "/training" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <MediaQuery minWidth={1200}>
        <Menu
          mode="horizontal"
          items={items}
          onClick={({ key }) => navigate(key)}
          className="h-full min-w-[300px] gap-x-4 border-0 text-xl"
          selectedKeys={[location.pathname]}
        ></Menu>
        {/*<Menu mode="horizontal" className="bg-transparent gap-4 border-0">
          {items.map((item, index) => (
            <div key={index}>
              <HeaderLink to={item.to} name={item.name} />
            </div>
          ))}
        </Menu>*/}
      </MediaQuery>
      <MediaQuery maxWidth={1199}>
        <Button type="text" className="px-4 pb-1 pt-0" onClick={showDrawer}>
          <MenuOutlined />
        </Button>
        <Drawer title="Меню" onClose={onClose} open={open}>
          <ul>
            {items.map((item, index) => (
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
