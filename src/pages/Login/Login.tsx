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
    try {
      // Validate all fields
      await form.validateFields();
      values.email = values.email.toLowerCase();
      // If all validations pass, submit the form
      const response = await client.login(values.email, values.password);

      if (response.success) {
        message.success("Амжилттай нэвтэрлээ!");

        if (locationState) {
          navigate(
            `${locationState.redirectTo.pathname}${locationState.redirectTo.search}`,
          );
        } else {
          navigate("/dashboard");
        }
      } else if (response.status == BackendStatus.EFORBIDDEN) {
        navigate(
          `/emailVerificationRequired?email=${encodeURIComponent(values.email)}`,
        );
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      console.error(error);
      if (error.response.status === 403) {
        navigate(
          `/emailVerificationRequired?email=${encodeURIComponent(values.email)}`,
        );
      } else if (error.code === "ECONNABORTED") {
        // Connection timeout occurred
        setErrMsg("Холболт хугацаа дууссан");
      } else {
        // Other errors
        message.error(error.response.data.data.error);
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
        onFinish={(e) => handleSubmit(e)}
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
            {
              required: true,
              message: "Нууц үгээ оруулна уу!",
            },
            {
              min: 6,
              message: "Нууц үг нь хамгийн багадаа 6 тэмдэгтээс тогтох ёстой!",
            },
            // {
            //   pattern:
            //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
            //   message:
            //     "Хамгийн багадаа нэг том үсэг, нэг тоо, нэг тусгай тэмдэгт агуулна!",
            // },
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
