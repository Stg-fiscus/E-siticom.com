import { Client, useClient } from "@backend/client";
import { IconButton } from "@components/IconButton/IconButton";
import { SingleNotification } from "@components/SingleNotification/SingleNotification";
import { CancelIcon } from "@icons/CancelIcon";
import { ThreeDotIcon } from "@icons/ThreeDotIcon";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setNavigationDashboardSubpage } from "@store/navigation/navigationSlice";
import {
  readAllNotifications,
  readNotification,
  resetNotifications,
  setNotifications,
} from "@store/notifications/notificationsSlice";
import { INotification } from "@types";
import { paginationConfig } from "@utils/props/paginationConfig";
import { Dropdown, List, Menu, Tabs, TabsProps } from "antd";
import clsx from "clsx";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

async function getNotifications(client: Client): Promise<INotification[]> {
  // return NotificationData();
  const response = await client.getAllNotifications();
  return response?.data ?? [];
}

async function getNewNotifications(client: Client): Promise<INotification[]> {
  // return NotificationData().filter((v) => !v.seen);
  const response = await client.getAllNewNotifications();
  return response?.data ?? [];
}

interface INotificationAction {
  name: string;
  func: () => void;
}

interface INotificationListProps {
  renderList: INotification[];
  deleteNotification: (id: number) => void;
  markSeen: (id: number) => void;
  onClose?: (id: number) => void;
}

const NotificationList = ({
  renderList,
  deleteNotification,
  markSeen,
  onClose,
}: INotificationListProps) => {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
  });

  return (
    <List
      pagination={paginationConfig(
        renderList ? renderList.length : 0,
        pagination,
        setPagination,
      )}
      dataSource={renderList}
      renderItem={(prop) => {
        return (
          <NotificationListItem
            notification={prop}
            markSeen={markSeen}
            deleteNotification={deleteNotification}
            key={`${prop.id} ${prop.seen}`}
            onClose={() => {
              onClose && onClose(prop.id);
            }}
          />
        );
      }}
      locale={{ emptyText: "Мэдэгдэл байхгүй" }}
    />
  );
};

interface INotificationListItemProps {
  notification: INotification;
  markSeen: (id: number) => void;
  deleteNotification: (id: number) => void;
  onClose?: () => void;
}

const NotificationListItem = ({
  notification,
  markSeen,
  deleteNotification,
  onClose,
}: INotificationListItemProps) => {
  const [seen, setSeen] = useState(notification.seen);

  return (
    <List.Item className="mb-5 flex justify-between">
      <div className="w-[60%]">
        <SingleNotification
          onClose={onClose}
          notification={notification}
          markSeen={() => {
            if (!seen) {
              markSeen(notification.id);
              setSeen(true);
            }
          }}
        />
      </div>
      <div className="flex flex-row items-center">
        <div
          className={clsx(
            "mr-4 h-3 w-3 rounded-full bg-primary",
            seen && "hidden",
          )}
        ></div>
        <div>
          <IconButton onClick={() => deleteNotification(notification?.id)}>
            <CancelIcon />
          </IconButton>
        </div>
      </div>
    </List.Item>
  );
};

export const AllNotification = () => {
  const listenerCallNumber = useAppSelector(
    (state) => state.notifications.listenerCallNumber,
  );
  const dispatch = useAppDispatch();
  const client = useClient();

  dispatch(setNavigationDashboardSubpage("Мэдэгдэл"));

  const [list, setList] = useState([] as INotification[]);
  const [secondList, setSecondList] = useState([] as INotification[]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        setList(await getNotifications(client));
      } catch (error) {
        console.log("error from notification list:", error);
      }
    };
    getData();
  }, [refresh, listenerCallNumber]);

  useEffect(() => {
    const getData = async () => {
      try {
        setSecondList(await getNewNotifications(client));
      } catch (err) {
        console.log("error from unseen second list", err);
      }
    };
    getData();
  }, [listenerCallNumber]);

  const markSeen = async (id: number) => {
    try {
      const response = await client.markSeen(id);
      if (response.success) {
        // setRefresh(!refresh);
        dispatch(readNotification(id));
      }
    } catch (error) {
      console.log("error from notification element", error);
    }
  };

  const updateListAfterMarkedSeen = (id: number) =>
    setList(list.map((e) => (e.id === id ? { ...e, seen: true } : e)));
  const updateSecnodListAfterMarkSeen = (id: number) =>
    setSecondList(secondList.filter((e) => e.id !== id));

  const deleteNotification = async (id: number) => {
    try {
      const response = await client.deleteNotification(id);
      if (response.success) {
        const newList = list.filter((notif) => notif.id != id);
        setRefresh(!refresh);
        setList(newList);
        setSecondList(secondList.filter((notif) => notif.id != id));
        dispatch(
          setNotifications({
            count: newList.filter((notif) => !notif.seen).length,
            lastNotifications: newList.slice(0, 10),
          }),
        );
      }
    } catch (error) {
      console.log("error from notification element", error);
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Бүгд",
      children: (
        <NotificationList
          renderList={list}
          deleteNotification={deleteNotification}
          markSeen={(id) => {
            markSeen(id);
            updateSecnodListAfterMarkSeen(id);
          }}
          onClose={updateListAfterMarkedSeen}
        />
      ),
    },
    {
      key: "2",
      label: "Нээгээгүй",
      children: (
        <NotificationList
          renderList={secondList}
          deleteNotification={deleteNotification}
          markSeen={(id) => {
            markSeen(id);
            updateListAfterMarkedSeen(id);
          }}
          onClose={updateSecnodListAfterMarkSeen}
        />
      ),
    },
  ];

  return (
    <div className="text-xs">
      <div className="mb-4 flex justify-between">
        <Tabs
          items={items}
          defaultActiveKey="1"
          className="w-full"
          tabBarExtraContent={{
            right: (
              <Dropdown
                placement="bottomLeft"
                trigger={["click"]}
                dropdownRender={() => (
                  <NotificationDropdownActions
                    reRender={setRefresh}
                    readAll={() => {
                      dispatch(readAllNotifications());
                      setList(list.map((notif) => ({ ...notif, seen: true })));
                      setSecondList([]);
                    }}
                    removeAll={() => {
                      dispatch(resetNotifications());
                      setList([]);
                      setSecondList([]);
                    }}
                    client={client}
                  />
                )}
              >
                <div className="h-7 w-7 text-primary-txt">
                  <IconButton>
                    <ThreeDotIcon />
                  </IconButton>
                </div>
              </Dropdown>
            ),
          }}
        />
      </div>
    </div>
  );
};

export const NotificationDropdownActions = ({
  reRender,
  removeAll,
  readAll,
  client,
}: {
  reRender: Dispatch<SetStateAction<boolean>>;
  removeAll: () => void;
  readAll: () => void;
  client: Client;
}) => {
  const markSeenAll = async () => {
    try {
      const response = await client.markSeenAll();
      if (response.success) {
        reRender((previous) => !previous);
        readAll();
      }
    } catch (error) {
      console.log("error from mark seen all:", error);
    }
  };

  const deleteAll = async () => {
    try {
      const response = await client.deleteAllNotifications();
      if (response.success) {
        reRender((previous) => !previous);
        removeAll();
      }
    } catch (error) {
      console.log("error from delete all:", error);
    }
  };

  const list: INotificationAction[] = [
    {
      name: "Бүгдийг уншсан болгох",
      func: markSeenAll,
    },
    {
      name: "Бүгдийг устгах",
      func: deleteAll,
    },
  ];

  return (
    <div className="w-[170px] rounded-lg border bg-primary-bg p-1">
      <MenuList list={list} />
    </div>
  );
};

export const MenuList = ({ list }: { list: INotificationAction[] }) => {
  return (
    <Menu style={{ background: "none", boxShadow: "none", border: "none" }}>
      {list.map((prop) => {
        return (
          <Menu.Item
            key={prop.name}
            className="transform cursor-pointer p-2 duration-200"
            onClick={() => prop.func()}
          >
            {prop.name}
          </Menu.Item>
        );
      })}
    </Menu>
  );
};
