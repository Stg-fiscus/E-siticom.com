import {
  BellOutlined,
  EditOutlined,
  LogoutOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PhoneOutlined,
  ReadOutlined,
  UnorderedListOutlined,
  UserOutlined,
  FileTextOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { resetNotifications } from "@store/notifications/notificationsSlice";
import { resetUser } from "@store/user/userSlice";
import { IUser } from "@types";
import { message } from "@utils/hooks/message";
import { Breadcrumb, Button, Divider, Layout, Menu, Modal } from "antd";
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./style.css";   

const { Content, Sider } = Layout;

const items = [
  {
    label: "Захиалга",
    to: "/dashboard/service",
    key: "Захиалга",
    isAllowed: (user: IUser) => user.isClient,
    icon: <PhoneOutlined className="text-lg" />,
  },
  {
    label: "Төлбөр тооцоо",
    to: "/dashboard/payment",
    key: "Төлбөр тооцоо",
    isAllowed: (user: IUser) => user.isAccountant,
    icon: <UnorderedListOutlined className="text-lg" />,
  },
  {
    label: "Сургалт",
    to: "/dashboard/course",
    key: "Сургалт",
    isAllowed: (user: IUser) => user.isSite,
    icon: <ReadOutlined className="text-lg" />,
  },
  {
    label: "Санал хүсэлт",
    to: "/dashboard/feedback",
    key: "Санал хүсэлт",
    isAllowed: (user: IUser) => user.isSite,
    icon: <MailOutlined className="text-lg" />,
  },
  {
    label: "Дотоод журам",
    to: "/dashboard/internal-policy",
    key: "Дотоод журам",
    isAllowed: (user: IUser) => user.isEmployee,
    icon: <FileTextOutlined className="text-lg" />,
  },
  
  {
    label: "Дотоод сургалт",
    to: "/dashboard/internal-procedures",
    key: "Дотоод сургалт",
    isAllowed: (user: IUser) => user.isEmployee,
    icon: <TeamOutlined className="text-lg" />,
  },
];



export const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const breadcrumb = useAppSelector((state) => state.navigation.breadcrumb || []);
  const menuKey = useAppSelector((state) => state.navigation.menuKey || "");
  const user = useAppSelector((state) => state.user) || {};
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  const getBreadcrumbItems = () => {
    return breadcrumb.map((item) => {
      if (item.linkTo) {
        return { title: <Link to={item.linkTo}>{item.title}</Link> };
      }
      return { title: item.title };
    });
  };

  const handleLogout = () => {
    navigate("/");
    dispatch(resetUser());
    dispatch(resetNotifications());
    message.success("Системээс гарлаа.");
  };

  return (
    <Layout className="mx-[5vw] bg-transparent">
      <Breadcrumb
        items={getBreadcrumbItems()}
        className="my-4 w-full rounded-lg px-2"
      />
      <Content className="mb-4 grow-0 shadow-md">
        <Layout className="h-full min-h-[600px] items-stretch bg-primary-bg">
          <Sider
            width={250}
            collapsible
            collapsed={collapsed}
            onCollapse={handleToggle}
            collapsedWidth={50}
            className="z-10"
            trigger={null}
            breakpoint="md"
          >
            <Menu
              className="flex flex-col text-lg"
              theme="dark"
              selectedKeys={[menuKey]}
            >
              <div className="mx-0.5 mt-4 flex items-center justify-between">
                {!collapsed && (
                  <div className="ml-4 flex items-center transition duration-200">
                    <div className="mr-2 flex items-center justify-center rounded-full border border-white">
                      <UserOutlined />
                    </div>
                    {user.name?.substring(0, 20)}
                  </div>
                )}
                <Button
                  type="text"
                  onClick={handleToggle}
                  className="flex w-fit items-center justify-center"
                >
                  {collapsed ? (
                    <MenuUnfoldOutlined className="text-lg text-white" />
                  ) : (
                    <MenuFoldOutlined className="text-lg text-white" />
                  )}
                </Button>
              </div>
              <Divider className="bg-[rgba(225,225,225,0.5)]" />
              {items.map((item) => (
                <Menu.Item
                  key={item.key}
                  icon={item.icon}
                  style={{
                    display: item.isAllowed?.(user) ? "block" : "none",
                  }}
                >
                  <Link to={item.to}>{item.label}</Link>
                </Menu.Item>
              ))}
              <Divider className="bg-[rgba(225,225,225,0.5)]" />
              <Menu.Item key="Мэдэгдэл" icon={<BellOutlined />}>
                <Link to="/dashboard/notifications">Мэдэгдэл</Link>
              </Menu.Item>
              <Menu.Item key="Мэдээлэл засах" icon={<EditOutlined />}>
                <Link to={"/dashboard/profile"}>Мэдээлэл засах</Link>
              </Menu.Item>
              <Menu.Item
                key="logOut"
                icon={<LogoutOutlined />}
                onClick={() => setIsModalOpen(true)}
              >
                Гарах
              </Menu.Item>
            </Menu>
          </Sider>
          <Content className="sm:ml-250 relative ml-0 h-full bg-white">
            <div className="mt-[2vh] overflow-hidden px-5">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Content>
      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="logout" onClick={handleLogout}>
            Гарах
          </Button>,
        ]}
        title="Та системээс гарах гэж байна."
      />
    </Layout>
  );
};
