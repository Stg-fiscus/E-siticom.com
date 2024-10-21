import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useClient } from "@backend/client";
import { useSimpleMessage } from "@utils/hooks/message";
import { Button, Divider, Form, Input } from "antd";
import clsx from "clsx";
import { useState } from "react";
import { Link } from "react-router-dom";

interface IRegsiterRequestParams {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export const Register = () => {
  const [form] = Form.useForm();
  const [password, setPassword] = useState({ first: "", second: "" });
  const [passwordError, setPasswordError] = useState(null as string | null);
  const [messageApi, contextHolder] = useSimpleMessage();
  const client = useClient();

  const [loading, setLoading] = useState(false);

  // Function to validate password
  const validatePassword = () => {
    if (password.first !== password.second) {
      setPasswordError("Нууц үг таарахгүй байна!");
      return false;
    } else {
      setPasswordError(null);
      return true;
    }
  };

  // Function to handle form submission
  const handleSubmit = async (values: IRegsiterRequestParams) => {
    setLoading(true);
    try {
      await form.validateFields(); // Validate all fields
      values.email = values.email.toLowerCase();
      // Password validation
      const isPasswordValid = validatePassword();

      if (!isPasswordValid) {
        throw new Error("Password mismatch");
      }

      const response = await client.register(
        values.name,
        values.email,
        values.password,
      );

      if (response.success) {
        messageApi.success(response.message);
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
      <Form
        layout="vertical"
        form={form}
        onFinish={(e) => handleSubmit(e)}
        onValuesChange={() => setPasswordError("")}
      >
        <h2 className="text-center text-2xl">Бүртгүүлэх</h2>
        <Divider />
        <Form.Item
          label="Нэр"
          name="name"
          rules={[
            {
              required: true,
              message: "Нэрээ бичнэ үү!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Цахим хуудас"
          name={"email"}
          rules={[
            {
              required: true,
              message: "Цахим хуудсаа бичнэ үү!",
            },
            { type: "email", message: "Зөв цахим шуудан оруулна уу!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Нууц үг"
          name={"password"}
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
            onChange={(e) =>
              setPassword({ ...password, second: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          label="Нууц үг давтах"
          name={"confirmPassword"}
          rules={[
            {
              required: true,
              message: "Нууц үгээ давтан оруулна уу!",
            },
          ]}
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
        <Form.Item className="mt-16">
          <Button
            htmlType="submit"
            type="primary"
            className="w-full"
            loading={loading}
          >
            Бүртгүүлэх
          </Button>
          <div
            className={clsx(
              "my-4 flex w-full justify-center text-red-500",
              !passwordError && "hidden",
            )}
          >
            {passwordError}
          </div>
        </Form.Item>
        <Form.Item className="text-center text-gray-400">
          Бүртгэлтэй бол{" "}
          <Link className="text-link" to="/login">
            Нэвтрэх
          </Link>
        </Form.Item>
      </Form>
    </>
  );
};
