import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useClient } from "@backend/client";
import { BackendStatus } from "@types";
import { message } from "@utils/hooks/message";
import { Button, Divider, Form, Input } from "antd";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface ILoginRequestParams {
  email: string;
  password: string;
}

export const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const client = useClient();
  const [errMsg, setErrMsg] = useState("");
  const { state: locationState } = useLocation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: ILoginRequestParams) => {
    setLoading(true);
    setErrMsg(""); // Reset the error message
    try {
      // Validate all fields
      await form.validateFields();
      values.email = values.email.toLowerCase();

      // Submit the form
      const response = await client.login(values.email, values.password);

      if (response.success) {
        message.success("Амжилттай нэвтэрлээ!");
        navigate(
          locationState
            ? `${locationState.redirectTo.pathname}${locationState.redirectTo.search}`
            : "/dashboard",
        );
      } else if (response.status === BackendStatus.EFORBIDDEN) {
        navigate(
          `/emailVerificationRequired?email=${encodeURIComponent(values.email)}`,
        );
      } else {
        message.error(response.message || "Нэвтрэхэд алдаа гарлаа!");
      }
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 403) {
        navigate(
          `/emailVerificationRequired?email=${encodeURIComponent(values.email)}`,
        );
      } else if (error.code === "ECONNABORTED") {
        setErrMsg("Холболт хугацаа дууссан");
      } else {
        const errorMsg =
          error?.response?.data?.data?.error || "Нэвтрэхэд алдаа гарлаа!";
        message.error(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        onValuesChange={() => setErrMsg("")}
      >
        <h2 className="mb-4 text-center text-2xl">Нэвтрэх</h2>
        <Divider />

        <Form.Item
          label="Цахим шуудан"
          name="email"
          rules={[{ required: true, message: "Цахим шуудангаа оруулна уу!" }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Нууц үг"
          name="password"
          rules={[
            { required: true, message: "Нууц үгээ оруулна уу!" },
            {
              min: 7,
              message: "Нууц үг нь хамгийн багадаа 7 тэмдэгтээс тогтох ёстой!",
            },
          ]}
        >
          <Input.Password
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item>
          <Link className="text-link" to="/forgetpassword">
            Нууц үг мартсан
          </Link>
        </Form.Item>

        <Form.Item>
          <div className="text-red-500">{errMsg}</div>
          <Button
            htmlType="submit"
            loading={loading}
            className="w-full"
            type="primary"
          >
            Нэвтрэх
          </Button>
        </Form.Item>

        <Form.Item className="text-center text-gray-400">
          Бүртгэл хийгдээгүй бол{" "}
          <Link className="text-link" to="/register">
            Бүртгүүлэх
          </Link>
        </Form.Item>
      </Form>
    </>
  );
};
