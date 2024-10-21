import { notification } from "antd";
import { ArgsProps } from "antd/es/notification";
import { NotificationInstance } from "antd/es/notification/interface";
import { Key } from "react";

const defaultConfig: ArgsProps = {
  message: "EMPTY MESSAGE",
  placement: "top",
};

export const useMessage = (): readonly [
  NotificationInstance,
  React.ReactElement<any, string | React.JSXElementConstructor<any>>,
] => {
  const [notificationApi, contextHolder] = notification.useNotification();

  return [
    {
      success(args) {
        notificationApi.success({ ...defaultConfig, ...args });
      },
      warning(args) {
        notificationApi.warning({ ...defaultConfig, ...args });
      },
      info(args) {
        notificationApi.info({ ...defaultConfig, ...args });
      },
      error(args) {
        notificationApi.error({ ...defaultConfig, ...args });
      },
      open(args) {
        notificationApi.open({ ...defaultConfig, ...args });
      },
      destroy: notificationApi.destroy,
    },
    contextHolder,
  ];
};

interface SimpleNotificationInstance {
  success(message: string | undefined): void;
  warning(message: string | undefined): void;
  info(message: string | undefined): void;
  error(message: string | undefined): void;
  open(message: string | undefined): void;
  destroy: (key?: Key) => void;
}

export const useSimpleMessage = (): readonly [
  SimpleNotificationInstance,
  React.ReactElement<any, string | React.JSXElementConstructor<any>>,
] => {
  const [notificationApi, contextHolder] = useMessage();

  return [
    {
      success(message) {
        notificationApi.success({ message });
      },
      warning(message) {
        notificationApi.warning({ message });
      },
      info(message) {
        notificationApi.info({ message });
      },
      error(message) {
        notificationApi.error({ message });
      },
      open(message) {
        notificationApi.open({ message });
      },
      destroy: notificationApi.destroy,
    },
    contextHolder,
  ];
};

export const message: SimpleNotificationInstance = {
  success(message) {
    notification.success({ ...defaultConfig, message });
  },
  warning(message) {
    notification.warning({ ...defaultConfig, message });
  },
  info(message) {
    notification.info({ ...defaultConfig, message });
  },
  error(message) {
    notification.error({ ...defaultConfig, message });
  },
  open(message) {
    notification.open({ ...defaultConfig, message });
  },
  destroy: notification.destroy,
};
