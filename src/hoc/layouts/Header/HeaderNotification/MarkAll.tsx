import { Button } from "antd";
import { useClient } from "@backend/client";

interface IMarkAllProps {
  RemoveAll: () => void;
  reRender: () => void;
}

export const MarkAll = ({ RemoveAll, reRender }: IMarkAllProps) => {
  const client = useClient();

  const onClick = async () => {
    try {
      const response = await client.markSeenAll();
      if (response.success) {
        // localStorage.setItem("notificationCount", 0);
        // setNotificationCount(0);
        RemoveAll();
        reRender();
      }
    } catch (error) {
      console.log("error from mark seen all:", error);
    }
  };
  return (
    <Button type="primary" onClick={onClick}>
      Бүгдийг Уншсан
    </Button>
  );
};
