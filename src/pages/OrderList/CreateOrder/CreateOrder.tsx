import { useClient } from "@backend/client";
import { SelectCompany } from "@components/SelectCompany/SelectCompany";
import { useAppSelector } from "@store/hooks";
import { ICompany, IOrder, IService } from "@types";
import { useSimpleMessage } from "@utils/hooks/message";
import { Button, Card, Form, Input, Modal } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ServiceSelect } from "../ServiceSelect/ServiceSelect";
const { TextArea } = Input;

interface ICreateOrderProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  number: string;
  companies: ICompany[];
  isNewReq: boolean;
  setIsNewReq: Dispatch<SetStateAction<boolean>>;
  initialOrder: IOrder | null;
  serviceTypes: IService[];
}

export const CreateOrder = ({
  isModalOpen,
  handleCancel,
  setRefresh,
  number,
  companies,
  isNewReq,
  initialOrder,
  serviceTypes,
}: ICreateOrderProps) => {
  const user = useAppSelector((state) => state.user);
  const client = useClient();
  const [messageApi, contextHolder] = useSimpleMessage();
  const [form] = Form.useForm();

  const [selectedService, setSelectedService] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const [loading, setLoading] = useState(false);

  const [detail, setDetail] = useState({} as IOrder);

  const handleSubmit = async (e: IOrder) => {
    setLoading(true);
    try {
      e.customerId = selectedCompany;
      e.serviceType = selectedService;
      e.email = localStorage.getItem("email")!;

      if (initialOrder) {
        const response = await client.updateService(
          initialOrder.id,
          e.customerId,
          user.email!,
          e.phone,
          e.serviceType,
          e.comment,
          e.programCode!,
        );

        if (response.success) {
          messageApi.success(response.message);
          setRefresh((prev) => !prev);
          handleCancel();
        } else {
          messageApi.error(response.message);
        }
      } else {
        const response = await client.addService(
          e.customerId,
          user.email!,
          e.phone,
          e.serviceType,
          e.comment,
          e.programCode!,
        );

        if (response.success) {
          messageApi.success("Хүсэлт илгээгдлээ");
          setRefresh((prev) => !prev);
          handleCancel();
        } else {
          messageApi.error(response.message);
        }
      }

      // setIsNewReq(false);
    } catch (err: any) {
      console.log("err", err);
      messageApi.error(err.message);
    } finally {
      setLoading(false);
    }

    /*
      // delete e.servicetype;
      // delete e.programcode;
      try {
        const response = await PostDataWithAuthorization(
          "/services/feedbackrequest",
          e
        );
        if (response?.status === 201) {
          messageApi.success("Санал хүсэлт илгээгдлээ.");
          setRefresh((prev) => !prev);
        }
        handleCancel();
        // setIsNewReq(false);
      } catch (err: any) {
        messageApi.success(err.message);
      } finally {
        setLoading(false);
      }
    }
    */
  };

  // Form-н өмнө бөглөгдсөн мэдээллүүдийг авах
  useEffect(() => {
    // unuudriin date iin medeelliig avah
    // const year = new Date().getFullYear();
    // const month = new Date().getMonth() + 1;
    // const day = new Date().getDate() + 1;

    const FetchData = async () => {
      setLoading(true);
      try {
        const response = await client.getServiceList(
          user.companies?.map(({ id }) => id)!,
        );

        if (response.success) {
          const result = response.data!.find(
            (order: IOrder) => order.number === number,
          );

          if (result) {
            setDetail(result);
            setSelectedService(result?.serviceType);
            setSelectedCompany(result?.customerId);
          }
        }
      } catch (err: any) {
        messageApi.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    FetchData();
  }, [number]);

  useEffect(() => {
    form.resetFields(); // Reset the form fields when props.initialValues changes
  }, [detail]);

  return (
    <>
      {contextHolder}
      <Modal
        // title="Шинэ захиалга үүсгэх"
        open={isModalOpen}
        onCancel={handleCancel}
        closable={false}
        footer={false}
        style={{ padding: 0 }}
      >
        <Card
          title={isNewReq ? "Шинэ захиалга үүсгэх" : "Захиалгын дэлгэрэнгүй"}
          // title={"Шинэ захиалга үүсгэх"}
          className="h-full w-full"
        >
          <Form
            layout="vertical"
            form={form}
            onFinish={handleSubmit}
            initialValues={{
              programcode: detail ? detail.programCode : "",
              ...detail, // Merge with props.initialValues
            }}
          >
            <Form.Item label="Компани" name="customerId">
              <SelectCompany
                // width={"initial"}
                companies={companies}
                selectedCompany={initialOrder?.customerId ?? selectedCompany}
                setSelectedCompany={setSelectedCompany}
              />
            </Form.Item>
            <Form.Item label="Цахим шуудан">
              <Input disabled value={user.email!} />
            </Form.Item>
            <Form.Item label="Үйлчилгээ сонгоно уу!" name="serviceType">
              <ServiceSelect
                selectedService={
                  (initialOrder
                    ? serviceTypes.find(
                        ({ id }) => id == initialOrder.serviceType,
                      )?.name
                    : selectedService)!
                }
                setSelectedService={setSelectedService}
              />
            </Form.Item>
            <Form.Item
              label="Утас"
              name="phone"
              initialValue={initialOrder?.phone ?? ""}
              rules={[{ required: true, message: "Утас оруулна уу!" }]}
            >
              <Input />
            </Form.Item>
            {selectedService !== "Санал хүсэлт" && (
              <Form.Item
                label="TEAMVIEWER , ANYDESK"
                name="programCode"
                initialValue={initialOrder?.programCode ?? ""}
                rules={[
                  { required: true, message: "Программын код оруулна уу!" },
                ]}
              >
                <Input />
              </Form.Item>
            )}
            <Form.Item
              label="Дэлгэрэнгүй тайлбар"
              name="comment"
              initialValue={initialOrder?.comment ?? ""}
              rules={[
                { required: true, message: "Дэлгэрэнгүй тайлбраа оруулна уу!" },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
            {/* <Form.Item> */}
            <Button
              htmlType="submit"
              loading={loading}
              className="float-right"
              type="primary"
            >
              Илгээх
            </Button>
            {/* </Form.Item> */}
          </Form>
        </Card>
      </Modal>
    </>
  );
};
