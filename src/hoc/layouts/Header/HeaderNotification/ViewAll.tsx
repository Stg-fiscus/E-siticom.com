import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export const ViewAll = ({ closeDropdown }: { closeDropdown: () => void }) => {
  const navigate = useNavigate();
  const onClick = () => {
    closeDropdown();
    navigate("/dashboard/notifications");
  };
  return (
    <Button type="primary" onClick={onClick}>
      Бүгдийг харах
    </Button>
  );
};
