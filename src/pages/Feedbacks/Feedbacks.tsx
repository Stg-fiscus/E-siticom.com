import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { useClient } from "@backend/client";
import { setFeedback } from "@store/feedback/feedbackSlice";
import { useAppDispatch } from "@store/hooks";
import { setNavigationDashboardSubpage } from "@store/navigation/navigationSlice";
import { IFeedback, IFeedbackCategory } from "@types";
import { useSimpleMessage } from "@utils/hooks/message";
import {
  Button,
  Divider,
  Form,
  Image,
  Input,
  List,
  Modal,
  Select,
  Tag,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

interface IFeedbackFormValues {
  title: string;
  content: string;
  categoryId: number;
  image?: { file: File };
}

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};

export const Feedback = () => {
  const client = useClient();
  const dispatch = useAppDispatch();
  dispatch(setNavigationDashboardSubpage("Санал хүсэлт"));
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);
  const [categories, setCategories] = useState<IFeedbackCategory[]>([]);
  const [form] = Form.useForm();
  const [editId, setEditId] = useState<number | null>(null);
  // const [visibleImageId, setVisibleImageId] = useState<number | null>(null);

  const [messageApi, contextHolder] = useSimpleMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await client.getFeedbacks();

      if (response.success) {
        setFeedbacks(response.data!);
      } else {
        messageApi.error(response.message);
      }
    })();

    (async () => {
      const response = await client.getFeedbackCategories();

      if (response.success) {
        setCategories(response.data!);
      } else {
        messageApi.error(response.message);
      }
    })();
  }, []);

  const onFinish = async (values: IFeedbackFormValues) => {
    try {
      await form.validateFields();
    } catch (e: any) {
      return;
    }

    if (!editId) {
      const response = await client.createFeedback(
        values.title,
        values.content,
        values.categoryId,
        values.image,
      );

      if (response.success) {
        setFeedbacks([response.data!, ...feedbacks]);
      } else {
        messageApi.error(response.message);
      }
    } else {
      const response = await client.updateFeedback(
        editId,
        values.title,
        values.content,
        values.categoryId,
        values.image,
      );

      if (response.success) {
        setFeedbacks(
          feedbacks.map((e) => (e.id == editId ? response.data! : e)),
        );
      } else {
        messageApi.error(response.message);
      }
    }

    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        onClick={() => {
          setEditId(null);
          setIsModalOpen(true);
        }}
      >
        Шинэ
      </Button>
      <List
        className="pb-10"
        pagination={{
          defaultPageSize: 5,
        }}
        dataSource={feedbacks}
        renderItem={(item) => (
          <List.Item className="flex flex-col !items-start justify-start gap-y-1">
            <h3 className="flex items-center gap-x-2">
              <span className="text-2xl">{item.title}</span>
              <Button
                type="text"
                shape="circle"
                size="small"
                className="flex items-center justify-center"
                onClick={() => {
                  setEditId(item.id);
                  form.setFieldsValue({
                    title: item.title,
                    content: item.content,
                    categoryId: item.categoryId,
                  });
                  setIsModalOpen(true);
                }}
              >
                <EditOutlined />
              </Button>
            </h3>
            <p className="text-base">{item.content}</p>
            {item.image && <Image src={item.image} height={100} />}
            <div className="mt-2 flex items-center">
              <Tag>{item.category}</Tag>
              <Divider type="vertical" />
              <p className="text-xs text-secondary-txt">
                {item.createdAt} дамжуулсан
              </p>
              <Divider type="vertical" />
              <a
                onClick={() => {
                  dispatch(setFeedback(item));
                  navigate(`/dashboard/feedback/${item.id}`);
                }}
                className="text-sm text-link"
              >
                {item.answers} хариулттай
              </a>
            </div>
          </List.Item>
        )}
      />
      <Modal
        title={editId ? "Засварлах" : "Шинэ"}
        open={isModalOpen}
        onCancel={() => {
          form.resetFields();
          setIsModalOpen(false);
        }}
        onOk={() => {
          onFinish(form.getFieldsValue());
        }}
        width={600}
      >
        <Form form={form} name="feedback" onFinish={onFinish}>
          <Form.Item
            {...formItemLayout}
            name="title"
            label="Гарчиг"
            rules={[{ required: true, message: "Гарчигаа бичнэ үү!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="Агуулга"
            rules={[{ required: true, message: "Агуулга бичнэ үү!" }]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name="categoryId"
            label="Төрөл"
            rules={[{ required: true, message: "Төрөлөө бичнэ үү!" }]}
          >
            <Select
              placeholder="Төрөл..."
              options={categories.map((c) => ({
                value: c.id,
                label: c.name,
              }))}
            />
          </Form.Item>
          <Form.Item {...formItemLayout} name="image" label="Зураг">
            <Upload beforeUpload={() => false} maxCount={1} accept="image/*">
              <Button icon={<UploadOutlined />}>Зураг</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
