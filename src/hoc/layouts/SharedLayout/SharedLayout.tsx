import { useClient } from "@backend/client";
import { Maintenance } from "@layouts/SharedLayout/Maintenance/Maintenance";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { resetNotifications } from "@store/notifications/notificationsSlice";
import { resetUser } from "@store/user/userSlice";
import Layout, { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export const SharedLayout = () => {
  const user = useAppSelector((state) => state.user);
  const client = useClient();
  const dispatch = useAppDispatch();
  const [isMaintenace, setIsMaintenance] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await client.settings();

      const dbIsMaintenace = response.success
        ? response?.data?.find(({ key }) => key == "maintenance")?.value!
        : "1";

      if (!response.success || dbIsMaintenace !== "0") {
        setIsMaintenance(true);
      }
    })();
  }, []);

  if (!user.id && !user.isAnonymous) {
    dispatch(resetUser());
    dispatch(resetNotifications());
  }

  return isMaintenace ? (
    <Maintenance />
  ) : (
    <Layout className="flex min-h-screen flex-col bg-secondary-bg">
      <Header />
      <Content className="flex grow flex-col">
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
};
