import { useClient } from "@backend/client";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setNavigationDashboardSubpage } from "@store/navigation/navigationSlice";
import { roles } from "@utils/functions/getRoleName";
import { useSimpleMessage } from "@utils/hooks/message";
import { Button, Descriptions, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { ChangeField } from "./ChangeField/ChangeField";

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = useSimpleMessage();

  dispatch(setNavigationDashboardSubpage("Мэдээлэл засах"));

  const user = useAppSelector((state) => state.user);
  const client = useClient();

  const changeName = async (name: string) => {
    const response = await client.changeName(user.email!, name);

    if (response.success) {
      messageApi.success(response.message);
    } else {
      messageApi.error(response.message);
    }
  };

  return (
    <>
      {contextHolder}
      <Descriptions
        contentStyle={{
          fontSize: 16,
        }}
        labelStyle={{
          fontSize: 16,
        }}
        column={1}
        items={[
          {
            key: "name",
            label: "Нэр",
            children: (
              <ChangeField
                title="Шинэ нэр"
                value={user.name!}
                setValue={changeName}
              />
            ),
          },
          {
            key: "email",
            label: "Имейл",
            children: user.email,
          },
          {
            key: "password",
            label: "Нууц үг",
            children: (
              <Button
                type="primary"
                onClick={() => navigate("/dashboard/changepassword")}
              >
                Нууц үг засах
              </Button>
            ),
          },
        ]}
      />
      {user.isClient && (
        <Table
          columns={[
            {
              title: "Компани",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Албан тушаал",
              dataIndex: "position",
              key: "position",
              render: (value) => roles[value],
            },
          ]}
          dataSource={user.companies!}
          pagination={false}
        />
      )}
    </>
  );
};
