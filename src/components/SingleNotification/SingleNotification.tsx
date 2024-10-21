import { INotification } from "@types";
import { DateResult } from "@utils/functions/dateResult";
import { Button, Descriptions, Modal } from "antd";
import { SyntheticEvent, useState } from "react";
import { getCompanyById } from "@utils/functions/getCompanyById";

interface ISingleNotificationProps {
  notification: INotification;
  markSeen: () => void;
  onClose?: () => void;
  onOpen?: () => void;
}

export const SingleNotification = ({
  notification,
  markSeen,
  onOpen,
  onClose,
}: ISingleNotificationProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const date = DateResult({ date: notification.createDate });
  const [seen, setSeen] = useState(notification.seen);

  const handleClose = (e: SyntheticEvent) => {
    e.stopPropagation();
    onClose && onClose();
    setIsModalOpen(false);
  };

  return (
    <div>
      <a
        className="block"
        onClick={(e) => {
          e.stopPropagation();
          onOpen && onOpen();
          setIsModalOpen(true);
          markSeen();
          setSeen(true);
        }}
      >
        <p>{notification.message}</p>
        <div className={`${!seen && "text-primary"}`}>{date}</div>
      </a>
      <Modal
        title="Мэдэгдэл мэдээлэл"
        open={isModalOpen}
        onOk={handleClose}
        onCancel={handleClose}
        footer={
          <Button type="primary" onClick={handleClose}>
            OK
          </Button>
        }
        zIndex={2000}
      >
        <Descriptions
          column={1}
          items={[
            {
              key: "1",
              label: "Компани",
              children: getCompanyById(notification.customerId),
            },
            {
              key: "2",
              label: "Дугаар",
              children: notification.number,
            },
            {
              key: "3",
              label: "Мэдэгдэл",
              children: notification.message,
            },
            {
              key: "4",
              label: "Хэзээ",
              children: date,
            },
          ]}
        />
      </Modal>
    </div>
  );
};
