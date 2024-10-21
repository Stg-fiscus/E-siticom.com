import { useClient } from "@backend/client";
import { useSimpleMessage } from "@utils/hooks/message";
import { Button, Result } from "antd";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export const EmailVerificationRequired = () => {
  const client = useClient();
  const [messageApi, contextHolder] = useSimpleMessage();
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email")!;

  const handleResend = async () => {
    setLoading(true);
    try {
      const response = await client.resendEmailVerification(email);

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
      <Result
        status="warning"
        title="Та имэйл хаягаа баталгаажуулна уу!"
        subTitle="Танд захиа очоогүй бол доорх товчийг даран баталгаажуулалтын эмайлийг дахин аваарай."
        extra={
          <Button type="primary" onClick={handleResend} loading={loading}>
            Баталгаажуулах имэйл дахин авах
          </Button>
        }
      />
    </>
  );
};
