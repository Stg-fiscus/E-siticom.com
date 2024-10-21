import { useClient } from "@backend/client";
import { useSimpleMessage } from "@utils/hooks/message";
import { Button, Result } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const RegisterVerfication = () => {
  const client = useClient();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const [messageApi, contextHolder] = useSimpleMessage();
  const [loading, setLoading] = useState(false);
  const email = queryParams.get("email");

  const [response, setResponse] = useState({});
  useEffect(() => {
    const getData = async () => {
      const response = await client.verification(token!);
      setResponse(response.success);
    };

    if (token) {
      getData();
    }
  }, [token]);

  const handleResend = async () => {
    setLoading(true);
    try {
      const response = await client.resendEmailVerification(email!);

      if (response.success) {
        return messageApi.success(response.message);
      }

      return messageApi.error(response.message);
    } catch (e: any) {
      messageApi.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="flex h-full w-full items-center justify-center">
        {response ? (
          <Result
            status={"success"}
            title={"Амжилттай баталгаажлаа."}
            extra={
              <Button
                onClick={() => {
                  navigate("/login");
                }}
              >
                Нэвтрэх
              </Button>
            }
          />
        ) : (
          <Result
            status="error"
            title="Баталгаажилт амжилтгүй."
            subTitle="Та мэдээллээ шалгаад дахин оролдоно уу!"
            extra={
              <>
                {email && (
                  <Button
                    type="primary"
                    onClick={handleResend}
                    loading={loading}
                  >
                    Баталгаажуулах имэйл дахин авах
                  </Button>
                )}
                <Button
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Нүүр хуудас
                </Button>
              </>
            }
          />
        )}
      </div>
    </>
  );
};
