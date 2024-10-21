import { useState } from "react";
import { Hour24Icon } from "@icons/Hour24Icon";
import { SingleNotification } from "@components/SingleNotification/SingleNotification";
import clsx from "clsx";
import { INotification } from "@types";
import { useClient } from "@backend/client";

interface INotificationElementProps {
  notification: INotification;
  onOpen: () => void;
  onClose: () => void;
  reRender: () => void;
  removeOne: (id: number) => void;
}

export const NotificationElement = ({
  notification,
  onOpen,
  onClose,
  reRender,
  removeOne,
}: INotificationElementProps) => {
  const [seen, setSeen] = useState(notification.seen);
  const client = useClient();

  const markSeen = async () => {
    setSeen(true);
    try {
      const response = await client.markSeen(notification.id);
      if (response.success) {
        reRender();
        removeOne(notification.id);
      }
    } catch (error) {
      console.log("error from notification element", error);
    }
  };

  return (
    <div
      className={clsx(
        "flex gap-x-2 text-xs",
        seen ? "text-secondary-txt" : "text-primary-txt",
      )}
    >
      <div className="mr-[10px] flex w-[10%] flex-col items-center justify-center">
        <div
          className={clsx(
            "flex h-[30px] w-[30px] items-center justify-center rounded-full",
            seen ? "bg-secondary-bg" : "bg-primary-bg",
          )}
        >
          <Hour24Icon />
        </div>
        <div className="flex-shrink text-[8px]">Үйлчилгээ</div>
      </div>
      <div>
        <SingleNotification
          notification={notification}
          markSeen={markSeen}
          onOpen={onOpen}
          onClose={onClose}
        />
      </div>
    </div>
  );
};
