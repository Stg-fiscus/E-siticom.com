import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

export const AnonymousPageLayout = () => {
  return (
    <Layout className="my-10 lg:mx-[10%]">
      <Content className="bg-white p-10 shadow-md">
        <Outlet />
      </Content>
    </Layout>
  );
};
