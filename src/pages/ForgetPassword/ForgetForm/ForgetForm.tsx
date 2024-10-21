import { useClient } from "@backend/client";
import { useSimpleMessage } from "@utils/hooks/message";
import { Button, Divider, Form, Input } from "antd";
import { useState } from "react";

export const ForgetForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const client = useClient();
  const [messageApi, contextHolder] = useSimpleMessage();

  const handleSubmit = async (e: { email: string }) => {
    setLoading(true);
    try {
      // Validate all fields
      await form.validateFields();
      const response = await client.resetPassword(e.email.toLowerCase());

      if (response.success) {
        messageApi.success(response.message);
      } else {
        messageApi.error(response.message);
      }
    } catch (error) {
      setErrMsg("Алдаа гарлаа. Дахин оролдоно уу!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {contextHolder}
      <Form
        layout="vertical"
        form={form}
        onFinish={(e) => handleSubmit(e)}
        onValuesChange={() => setErrMsg("")}
      >
        <h2 className="text-center text-2xl">Нууц үг солих</h2>
        <Divider />
        <Form.Item
          label="Цахим шуудан"
          name={"email"}
          rules={[{ required: true, message: "Цахим шуудангаа оруулна уу!" }]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item>
          <div className="text-red-500">{errMsg}</div>
          <Button
            htmlType="submit"
            type="primary"
            loading={loading}
            className="w-full"
          >
            Холбоос авах
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
