import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Client } from "@backend/client";
import { IconButton } from "@components/IconButton/IconButton";
import { CancelIcon } from "@icons/CancelIcon";
import { ICompany, IDataType, IOrder } from "@types";
import {
  convertUTCDateToLocalDate,
  formatDateTime,
} from "@utils/functions/formatDate";

import { getCompanyById } from "@utils/functions/getCompanyById";
import { getStateText } from "@utils/functions/getStateText";
import { FilterProps } from "@utils/props/FilterProps";
import { SearchProps } from "@utils/props/SearchProps";
import { Modal, Tooltip } from "antd";
import { ColumnType } from "antd/es/table";
import { Dispatch, SetStateAction } from "react";
import { State } from "../State/State";

interface IDeleteOrderParams {
  id: number;
  closeModal: () => void;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  client: Client;
  messageSuccess: (m: string) => void;
  messageError: (m: string) => void;
}

const deleteOrder = async ({
  id,
  closeModal,
  setRefresh,
  client,
  messageSuccess,
  messageError,
}: IDeleteOrderParams) => {
  try {
    const response = await client.cancelService(id);

    if (response.success) {
      messageSuccess("Устгагдлаа");
      closeModal();
      setRefresh((prev) => !prev);
    } else {
      messageError(response.message!);
    }
  } catch (err: any) {
    messageError(err.message);
  }
};

const confirmDeleteOrder = (
  record: IOrder,
  setRefresh: Dispatch<SetStateAction<boolean>>,
  closeModal: () => void,
  client: Client,
  messageSuccess: (m: string) => void,
  messageError: (m: string) => void,
) => {
  Modal.confirm({
    title: "Та захиалгаа цуцлахдаа итгэлтэй байна уу?",
    okText: "Цуцлах",
    cancelText: "Болих",
    onOk: () => {
      deleteOrder({
        id: record.id,
        setRefresh,
        closeModal,
        client,
        messageSuccess,
        messageError,
      });
    },
  });
};

interface IOrderColumnProps {
  setModal: Dispatch<SetStateAction<boolean>>;
  setStoredNumber: Dispatch<SetStateAction<string>>;
  setType: Dispatch<SetStateAction<string>>;
  searchInput: React.MutableRefObject<any>;
  handleSearch: (
    selectedKeys: string[],
    confirm: () => void,
    dataIndex: string,
  ) => void;
  handleReset: (clearFilters: () => void) => void;
  setSearchText: Dispatch<SetStateAction<string>>;
  setSearchedColumn: Dispatch<SetStateAction<string>>;
  searchedColumn: string;
  searchText: string;
  uniqueStates: number[];
  uniqueUsers: string[];
  setRefresh: Dispatch<SetStateAction<boolean>>;
  companies: ICompany[];
  client: Client;
  setInitialOrder: Dispatch<SetStateAction<IOrder | null>>;
  viewOrder: (order: IOrder) => void;
  messageSuccess: (m: string) => void;
  messageError: (m: string) => void;
}

export const Columns = ({
  setModal,
  setStoredNumber,
  setType,
  searchInput,
  handleSearch,
  handleReset,
  setSearchText,
  setSearchedColumn,
  searchedColumn,
  searchText,
  uniqueStates,
  uniqueUsers, 
  setRefresh,
  companies,
  client,
  setInitialOrder,
  viewOrder,
  messageSuccess,
  messageError,
}: IOrderColumnProps): ColumnType<IOrder>[] => [
  {
    key: "1",
    title: "Огноо",
    dataIndex: "registrationTime",
    render: (text: string) => formatDateTime(convertUTCDateToLocalDate(text)),
    sorter: (record1: IOrder, record2: IOrder) => {
      return (
        new Date(record1.registrationTime).valueOf() -
        new Date(record2.registrationTime).valueOf()
      );
    },
    width: 180,
  },
  {
    key: "2",
    title: "Компани",
    dataIndex: "customerId",
    render: (customerId) => getCompanyById(customerId),

    ...FilterProps({
      filterElements: companies.map(({ name }) => name),
      filter: "customerId",
      getRecordValue: (r: IDataType) =>
        getCompanyById((r as IOrder).customerId),
    }),
    width: 320,
  },

  {
    key: "3",
    title: "Захиалга",
    dataIndex: "workNotes",

    ...SearchProps({
      dataIndex: "workNotes",
      searchInput: searchInput,
      handleSearch: handleSearch,
      handleReset: handleReset,
      setSearchText: setSearchText,
      setSearchedColumn: setSearchedColumn,
      searchedColumn: searchedColumn,
      searchText: searchText,
      getRecordValue: (record: IDataType) => (record as IOrder).workNotes,
    }),
    width: 200,
  },

  {
    key: "4",
    title: "Төлөв",
    dataIndex: "state",
    render: (state, record) => <State data={state} />,

    ...FilterProps({
      filterElements: uniqueStates,
      filter: "state",
      option: getStateText,
      getRecordValue: (r: IDataType) => (r as IOrder).state,
    }),
    width: 200,
  },
  {
    key: "5",
    title: "Хариуцсан",
    dataIndex: "servedUser",

    ...FilterProps({
      filterElements: uniqueUsers,
      filter: "servedUser",
      getRecordValue: (r: IDataType) => (r as IOrder).servedUser,
    }),
    width: 200,
  },

  
  {
    key: "6",
    title: "Тайлбар",
    dataIndex: "comment",

    ...SearchProps({
      dataIndex: "comment",
      searchInput: searchInput,
      handleSearch: handleSearch,
      handleReset: handleReset,
      setSearchText: setSearchText,
      setSearchedColumn: setSearchedColumn,
      searchedColumn: searchedColumn,
      searchText: searchText,
      getRecordValue: (record: IDataType) => (record as IOrder).comment,
    }),
    width: 320,
  },
  {
    key: "7",
    title: "Action",
    render: (_, record) => {
      return (
        <div className="flex gap-x-2">
          <Tooltip title="Захиалга харах">
            <div className="h-5 w-5">
              <IconButton
                onClick={() => {
                  viewOrder(record);
                }}
              >
                <EyeOutlined />
              </IconButton>
            </div>
          </Tooltip>
          {record.state === 0 ? (
            <Tooltip title="Захиалга цуцлах">
              <div className="h-5 w-5">
                <IconButton
                  onClick={() => {
                    confirmDeleteOrder(
                      record,
                      setRefresh,
                      () => setModal(false),
                      client,
                      messageSuccess,
                      messageError,
                    );
                  }}
                >
                  <CancelIcon />
                </IconButton>
              </div>
            </Tooltip>
          ) : null}
          {record.state === 0 ? (
            <Tooltip title="Захиалга засах">
              <div className="h-5 w-5">
                <IconButton
                  onClick={() => {
                    setInitialOrder(record);
                    setModal(true);
                    setStoredNumber(record.number);
                    setType(record.serviceType);
                  }}
                >
                  <EditOutlined /> 
                </IconButton>
              </div>
            </Tooltip>
          ) : null}
        </div>
      );
    },
    width: 120,
  },
];
