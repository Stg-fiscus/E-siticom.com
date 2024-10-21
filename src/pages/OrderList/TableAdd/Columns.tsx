import { FilterProps } from "@utils/props/FilterProps";
import { SearchProps } from "@utils/props/SearchProps";
import { getStateText } from "@utils/functions/getStateText";
import { IconButton } from "@components/IconButton/IconButton";
import { State } from "../State/State";
import { Tooltip } from "antd";
import { CancelIcon } from "@icons/CancelIcon";
import { Dispatch, SetStateAction } from "react";
import { ICompany, IDataType, IOrder } from "@types";
import { ColumnType } from "antd/es/table";
import { getCompanyById } from "@utils/functions/getCompanyById";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Client } from "@backend/client";
import {
  convertUTCDateToLocalDate,
  formatDateTime,
} from "@utils/functions/formatDate";

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
    // width: "15%",
    render: (text: string) => formatDateTime(convertUTCDateToLocalDate(text)),
    sorter: (record1: IOrder, record2: IOrder) => {
      return (
        new Date(record1.registrationTime).valueOf() -
        new Date(record2.registrationTime).valueOf()
      );
    },
  },
  {
    key: "2",
    title: "Тайлбар",
    dataIndex: "comment",
    // width: "40%",
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
  },
  {
    key: "3",
    title: "Төлөв",
    dataIndex: "state",
    // width: "15%",
    render: (state, record) => <State data={state} />,
    ...FilterProps({
      filterElements: uniqueStates,
      filter: "state",
      option: getStateText,
      getRecordValue: (r: IDataType) => (r as IOrder).state,
    }),
  },
  {
    key: "4",
    title: "Хариуцсан",
    dataIndex: "servedUser",
    // width: "15%",
    ...FilterProps({
      filterElements: uniqueUsers,
      filter: "servedUser",
      getRecordValue: (r: IDataType) => (r as IOrder).servedUser,
    }),
  },
  {
    key: "5",
    title: "Компани",
    dataIndex: "customerId",
    render: (customerId) => getCompanyById(customerId),
    ...FilterProps({
      filterElements: companies.map(({ name }) => name),
      filter: "customerId",
      getRecordValue: (r: IDataType) =>
        getCompanyById((r as IOrder).customerId),
    }),
  },
  {
    key: "6",
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
                    deleteOrder({
                      id: record.id,
                      setRefresh: setRefresh,
                      closeModal: () => setModal(false),
                      client,
                      messageSuccess,
                      messageError,
                    });
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
  },
  // {
  //   key: "5",
  //   title: "Цуцлах",
  //   dataIndex: "servedUser",
  //   // width: "10%",
  //   render: (user, record) =>
  //     !user && (
  //       <div className="w-full flex justify-center">
  //         <div className="w-5 h-5">
  //           <IconButton
  //              onClick={() => {
  //     deleteOrder({
  //       type:
  //         record.serviceType === "Санал хүсэлт"
  //           ? 0
  //           : record.serviceType,
  //       number: record.number,
  //       setRefresh: setRefresh,
  //       closeModal: () => setModal(false),
  //     });
  //   }}
  // >
  //   <CancelIcon/>
  // </IconButton>
  //         </div>
  //       </div>
  //     ),
  // },
];
