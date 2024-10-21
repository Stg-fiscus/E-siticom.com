import { EditOutlined } from "@ant-design/icons";
import { message } from "@utils/hooks/message";
import { Button, Form, Input, InputRef, Modal } from "antd";
import React, { useState } from "react";

interface IChangeFieldProps {
  value: string;
  setValue: (value: string) => void;
  title: string;
}

export const ChangeField = ({ value, setValue, title }: IChangeFieldProps) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalsOpened, setModalsOpened] = useState(0);
  const ref = React.useRef<InputRef>(null);

  const setFocus = (isOpen: boolean) => {
    isOpen && ref.current!.focus();
  };

  const showModal = () => {
    setModalsOpened(modalsOpened + 1);
    setIsModalOpen(true);
  };

  const processNewValue = (changeValue: string) => {
    if (value == changeValue || !changeValue.trim()) {
      message.error("Нэр ижил байна!");
    } else {
      setValue(changeValue);
      setIsModalOpen(false);
    }
  };

  const handleOk = () => {
    processNewValue(form.getFieldValue("newValue"));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="text-md align-center flex gap-x-2">
      <div>{value}</div>
      <Button
        type="text"
        size="small"
        shape="circle"
        className="flex items-center justify-center"
        onClick={showModal}
      >
        <EditOutlined />
      </Button>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="Цуцлах"
        okText="ОК"
        afterOpenChange={setFocus}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(e) => processNewValue(e.newValue)}
        >
          <Form.Item
            name="newValue"
            rules={[
              {
                required: true,
                message: `${title} бичнэ үү!`,
              },
            ]}
          >
            <Input defaultValue={value} key={modalsOpened} ref={ref} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
