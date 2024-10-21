import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Result
        status="403"
        title="403"
        subTitle="Уучлаарай, та энэ хуудсанд хандах эрхгүй байна."
        extra={
          <Button
            onClick={() => {
              navigate(-1);
            }}
            type="primary"
          >
            Буцах
          </Button>
        }
      />
    </div>
  );
};
