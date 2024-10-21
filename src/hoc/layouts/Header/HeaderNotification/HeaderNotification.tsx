import { useClient } from "@backend/client";
import { NotificationIcon } from "@icons/NotificationIcon";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  addNotification,
  listenerCall,
  readAllNotifications,
  readNotification,
  setNotifications,
} from "@store/notifications/notificationsSlice";
import { Badge, Button, Card, Dropdown, Empty, notification } from "antd";
import React, { useEffect, useState } from "react";
import { MarkAll } from "./MarkAll";
import { NotificationElement } from "./NotificationElement";
import { ViewAll } from "./ViewAll";

export const HeaderNotification = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const notificationState = useAppSelector((state) => state.notifications);
  const list = notificationState.lastNotifications;
  const client = useClient();
  const token = user.token;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownLocked, setIsDropdownLocked] = useState(false);
  const [notificationApi, contextHolder] = notification.useNotification();

  useEffect(() => {
    const getList = async () => {
      try {
        const response = await client.getAllNotifications();
        const list = response?.data ?? [];
        dispatch(
          setNotifications({
            count: list.filter((notif) => !notif.seen).length,
            lastNotifications: list.slice(0, 10),
          }),
        );
      } catch (error) {
        console.log("error from notification list:", error);
      }
    };
    getList();
  }, []);

  useEffect(() => {
    const createConnection = async () => {
      if (!token || !user.isClient) {
        return;
      }

      try {
        client.notificationListener((notification) => {
          notificationApi.info({
            message: `Шинэ мэдэгдэл`,
            description: notification.message,
            placement: "topRight",
          });
          dispatch(addNotification(notification));
          dispatch(listenerCall());
        });
      } catch (error) {
        console.error("Error establishing websocket connection:", error);
      }
    };

    if (token) {
      createConnection();
    }
  }, [token]);

  const onClick = async () => {
    // NotificationAudio();
    // try {
    //   const response = await client.getAllNotifications();
    //   setList(response?.data ?? []);
    // } catch (error) {
    //   console.log("error from notification list:", error);
    // }
  };

  return (
    <>
      {contextHolder}
      <Dropdown
        open={isDropdownOpen || isDropdownLocked}
        onOpenChange={setIsDropdownOpen}
        trigger={["click"]}
        menu={{
          items:
            list.length != 0
              ? list.map((prop, index) => {
                  return {
                    key: prop.id.toString(),
                    label: (
                      <NotificationElement
                        onOpen={() => setIsDropdownLocked(true)}
                        onClose={() => {
                          setIsDropdownOpen(true);
                          setIsDropdownLocked(false);
                        }}
                        notification={prop}
                        reRender={onClick}
                        removeOne={(id: number) =>
                          dispatch(readNotification(id))
                        }
                      />
                    ),
                  };
                })
              : [],
        }}
        dropdownRender={(menu) => {
          return (
            <Card
              /* style={{
              backgroundColor: "#1D3049",
              borderWidth: 0,
              width: "400px",
            }} */
              className="w-[400px]"
              bodyStyle={{
                padding: 16,
              }}
            >
              {(list ?? []).length != 0 ? (
                React.cloneElement(menu as React.ReactElement, {
                  style: {
                    boxShadow: "none",
                    border: "none",
                    background: "none",
                  },
                  className: "flex gap-y-2 flex-col",
                })
              ) : (
                <Empty description="Мэдэгдэл байхгүй" />
              )}
              <div className="mt-4 flex justify-between text-white">
                <ViewAll closeDropdown={() => setIsDropdownOpen(false)} />
                <MarkAll
                  RemoveAll={() => dispatch(readAllNotifications())}
                  reRender={onClick}
                />
              </div>
            </Card>
          );
        }}
      >
        <Button
          type="text"
          shape="circle"
          size="large"
          className="flex items-center justify-center"
        >
          <Badge count={notificationState.count}>
            <NotificationIcon />
          </Badge>
        </Button>
      </Dropdown>
    </>
  );
};
