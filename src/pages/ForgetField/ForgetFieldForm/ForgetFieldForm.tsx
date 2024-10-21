import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useClient } from "@backend/client";
import { useSimpleMessage } from "@utils/hooks/message";
import { Button, Divider, Form, Input, Result, Skeleton } from "antd";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface IChangePasswordRequest {
  email: string | null;
  password: string | null;
  confirmPassword?: string;
  token: string | null;
}

export const ForgetFieldForm = () => {
  const client = useClient();
  const [messageApi, contextHolder] = useSimpleMessage();

  const [form] = Form.useForm(); // Destructuring form from Form.useForm()

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email")!;
  const token = queryParams.get("token")!;

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("" as string | null);
  const [password, setPassword] = useState({ first: "", second: "" });
  const [valid, setIsValid] = useState(null as boolean | null);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await client.checkForgotPasswordToken(email, token);

      if (response.success) {
        return setIsValid(true);
      }

      return setIsValid(false);
    })();
  }, []);

  // Function to validate password
  const validatePassword = () => {
    if (password.first !== password.second) {
      setErr("Нууц үг таарахгүй байна!");
      return false;
    }

    setErr(null);
    return true;
  };

  // Function to handle form submission
  const handleSubmit = async (values: IChangePasswordRequest) => {
    setLoading(true);
    try {
      await form.validateFields(); // Validate all fields
      values.email = values.email?.toLowerCase() ?? null;
      const isPasswordValid = validatePassword();

      if (!isPasswordValid) {
        throw new Error("Password mismatch");
      }
      values.token = token;
      const response = await client.setPassword(
        values.email!.toLowerCase(),
        values.password!,
        token!,
      );

      if (response.success) {
        messageApi.success(response.message);
        navigate("/login");
      } else {
        messageApi.error(response.message);
      }
    } catch (error) {
      console.error("Validation failed:", error);
      messageApi.error("Алдаа гарлаа. Ахин шалгана уу.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      {valid && (
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <h2 className="text-2xl">Нууц үг солих</h2>
          <Divider />
          <Form.Item
            label="Цахим шуудан"
            name="email"
            rules={[
              {
                required: true,
                message: "Цахим шуудангаа оруулна уу!",
              },
            ]}
            initialValue={email}
          >
            <Input type="email" value={email} disabled />
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
                message:
                  "Нууц үг нь хамгийн багадаа 6 тэмдэгтээс тогтох ёстой!",
              },
            ]}
            style={{ width: "100%" }}
          >
            <Input.Password
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={(e) =>
                setPassword({ ...password, first: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Нууц үг давтах"
            name="confirmPassword" // Removed curly braces
            rules={[
              {
                required: true,
                message: "Давтан нууц үгээ оруулна уу!",
              },
              {
                min: 6,
                message:
                  "Нууц үг нь хамгийн багадаа 6 тэмдэгтээс тогтох ёстой!",
              },
            ]}
          >
            <Input.Password
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={(e) =>
                setPassword({ ...password, second: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item className={clsx(!err && "hidden", "text-red-500")}>
            {err}
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              loading={loading}
              className="w-full"
            >
              Нууц үг солих
            </Button>
          </Form.Item>
        </Form>
      )}
      {valid === null && <Skeleton />}
      {valid === false && (
        <Result
          status="error"
          title="Холбоос хүчингүй"
          subTitle="Нууц үг солих холбоосыг дахин авна уу"
        />
      )}
    </>
  );
};
