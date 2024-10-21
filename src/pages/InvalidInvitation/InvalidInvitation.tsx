import { Button, Empty } from "antd";
import { useNavigate } from "react-router-dom";

export const InvalidInvitation = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Empty description="Холбоос хүчингүй байна">
        <div>Та цахим шуудангаар очсон холбоосоо нягтална уу!</div>
        <Button className="mt-5" onClick={() => navigate("/")}>
          Нүүр хуудас руу шилжих
        </Button>
      </Empty>
    </div>
  );
};
