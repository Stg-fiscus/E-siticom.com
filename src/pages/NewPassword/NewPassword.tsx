import { useClient } from "@backend/client";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setNavigationProfileSubpage } from "@store/navigation/navigationSlice";
import { useSimpleMessage } from "@utils/hooks/message";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useState } from "react";

type FieldType = {
  oldPassword?: string;
  password?: string;
  confirmPassword?: string;
};

export const NewPassword = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const client = useClient();
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = useSimpleMessage();

  dispatch(setNavigationProfileSubpage("Шинэ нууц үг"));

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    try {
      await form.validateFields(); // Validate all fields
      if (values.password != values.confirmPassword) {
        messageApi.error("Нууц үгийн давталт тохирохгүй байна!");
        return;
      }

      const response = await client.changePassword(
        user.email!,
        values.password!,
      );

      if (response.success) {
        messageApi.success(response.message);
      } else {
        messageApi.error(response.message);
      }
    } catch (error) {
      messageApi.error("Алдаа гарлаа. Түр хүлээгээд дахин оролдоно уу.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo,
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Хуучин нууц үг"
          name="oldPassword"
          rules={[{ required: true, message: "Хуучин нууц үгээ оруулна уу!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<FieldType>
          label="Шинэ нууц үг"
          name="password"
          rules={[
            { required: true, message: "Шинэ нууц үгээ оруулна уу!" },
            {
              min: 6,
              message: "Нууц үг нь хамгийн багадаа 6 тэмдэгтээс тогтох ёстой!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<FieldType>
          label="Шинэ нууц үг давтах"
          name="confirmPassword"
          rules={[
            { required: true, message: "Шинэ нууц үгээ давтан оруулна уу!" },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Илгээх
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
