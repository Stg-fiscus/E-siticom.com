import { useClient } from "@backend/client";
import { DateRangePicker } from "@components/DateRangePicker/DateRangePicker";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setNavigationDashboardSubpage } from "@store/navigation/navigationSlice";
import { IOrder, IService } from "@types";
import {
  convertUTCDateToLocalDate,
  formatDateTime,
} from "@utils/functions/formatDate";

import { getCompanyById } from "@utils/functions/getCompanyById";
import { useSimpleMessage } from "@utils/hooks/message";
import { paginationConfig } from "@utils/props/paginationConfig";
import { Button, Descriptions, Modal, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import { CreateOrder } from "./CreateOrder/CreateOrder";
import { Columns } from "./TableAdd/Columns";

export const OrderList = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const client = useClient();

  dispatch(setNavigationDashboardSubpage("Захиалга"));

  // API gaas irj bga niit data
  const [orderData, setOrderData] = useState([] as IOrder[]);
  const [serviceTypes, setServiceTypes] = useState([] as IService[]);

  const [isViewOrderModalOpen, setIsViewOrderModalOpen] = useState(false);
  const [viewedOrder, setViewedOrder] = useState(null as IOrder | null);

  // Loading хийх
  const [loading, setLoading] = useState(false);

  // Shine zahialga burtguuleh bolon ustgahad ashiglagdah state
  const [refresh, setRefresh] = useState(false);

  const [modal, setModal] = useState(false);
  const [storedNumber, setStoredNumber] = useState("");

  const [isNewReq, setIsNewReq] = useState(false);
  const [initialOrder, setInitialOrder] = useState(null as IOrder | null);
  const [messageApi, contextHolder] = useSimpleMessage();
  const [newOrderNumber, setNewOrderNumber] = useState(0);

  // datepickerd ashigalagdah date
  const currentYear = new Date().getFullYear();
  const [dates, setDates] = useState({
    start: `${currentYear}-01-01`,
    end: `${currentYear}-12-31`,
  });

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
  });

  // hailt hiiih logic
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (
    selectedKeys: string[],
    confirm: () => void,
    dataIndex: string,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  // Өгөгдлүүдийг авах. Энэ дээр хийгдэж байгаа үйлдэл нь эхлээд компани аа сонгоод id-г нь
  // api рүү явуулна
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const responseServices = await client.getServiceList(
          user.companies!.map(({ id: customerId }) => customerId),
          dates.start,
          dates.end,
        );

        const responseServiceTypes = await client.getServiceTypes();

        if (responseServices.success) {
          setOrderData(responseServices.data!);
        } else {
          messageApi.error(responseServices.message);
        }

        if (responseServices.success) {
          setServiceTypes(responseServiceTypes.data!);
        } else {
          messageApi.error(responseServiceTypes.message);
        }
      } catch (err: any) {
        messageApi.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dates, refresh]);

  const serviceTypeById = (id: string) => {
    return serviceTypes.find((v) => v.id == id)?.name ?? "Нэргүй";
  };

  // filter hiih tulvuudiig shuuj avah
  const uniqueStates = Array.from(
    new Set(orderData && orderData.map((item: IOrder) => item.state)),
  ).filter((value) => value !== undefined);

  // filter hiih guitsetgegch ajilchidiin neriig shuuj avah
  const uniqueUsers = Array.from(
    new Set(orderData && orderData.map((item: IOrder) => item.servedUser)),
  ).filter((value) => value !== null && value !== undefined);

  return (
    <>
      {contextHolder}
      <div>
        <div className="flex flex-col justify-between">
          {/*<SelectCompany
          companies={user.companies!}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
        />*/}
          <div className="my-4 flex flex-col items-start justify-between gap-x-2 gap-y-2 md:flex-row md:items-center">
            <DateRangePicker
              dates={dates}
              setDates={setDates}
              className="gap-x-4"
            />
            <Button
              onClick={() => {
                setInitialOrder(null);
                setNewOrderNumber(newOrderNumber + 1);
                setModal(true);
                setIsNewReq(true);
              }}
              type="primary"
            >
              Шинэ захиалга үүсгэх
            </Button>
          </div>
        </div>

        <div className="shadow-boxThin w-full rounded-lg">
          <div>
            <div className="z-100 mt-4 w-full overflow-auto lg:overflow-visible">
              <Table
                columns={Columns({
                  setModal,
                  setStoredNumber,
                  setType: () => {},
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
                  companies: user.companies!,
                  client,
                  setInitialOrder,
                  viewOrder: (order: IOrder) => {
                    setViewedOrder(order);
                    setIsViewOrderModalOpen(true);
                  },
                  messageSuccess: (message) => messageApi.success(message),
                  messageError: (message) => messageApi.error(message),
                })}
                size="small"
                dataSource={orderData}
                pagination={paginationConfig(
                  orderData ? orderData.length : 0,
                  pagination,
                  setPagination,
                )}
                loading={loading}
              />
            </div>
          </div>
        </div>
        <CreateOrder
          isModalOpen={modal}
          // setIsModalOpen={setModal}
          handleCancel={() => setModal(false)}
          refresh={refresh}
          setRefresh={setRefresh}
          number={storedNumber}
          companies={user.companies!}
          isNewReq={isNewReq}
          setIsNewReq={setIsNewReq}
          initialOrder={initialOrder}
          serviceTypes={serviceTypes}
          key={initialOrder?.id?.toString() ?? `newOrder-${newOrderNumber}`}
        />
        <Modal
          open={isViewOrderModalOpen}
          footer={null}
          onCancel={() => setIsViewOrderModalOpen(false)}
          title={
            <span className="font-semibold text-gray-800">
              Захиалгын дэлгэрэнгүй мэдээлэл 
            </span>
          }
        >
          <Descriptions
            items={
              viewedOrder
                ? [
                    {
                      key: "number",
                      label: "Дугаар",
                      children: (
                        <span className="whitespace-normal break-words">
                          {viewedOrder.number}
                        </span>
                      ),
                    },
                    {
                      key: "registrationTime",
                      label: "Хэзээ",
                      children: (
                        <span className="whitespace-normal break-words">
                          {formatDateTime(
                            convertUTCDateToLocalDate(
                              viewedOrder.registrationTime,
                            ),
                          )}
                        </span>
                      ),
                    },
                    {
                      key: "company",
                      label: "Компани",
                      children: (
                        <span className="whitespace-normal break-words">
                          {getCompanyById(viewedOrder.customerId)}
                        </span>
                      ),
                    },
                    {
                      key: "email",
                      label: "Цахим шуудан",
                      children: (
                        <span className="whitespace-normal break-words">
                          {viewedOrder.email}
                        </span>
                      ),
                    },
                    {
                      key: "phone",
                      label: "Утас",
                      children: (
                        <span className="whitespace-normal break-words">
                          {viewedOrder.phone}
                        </span>
                      ),
                    },
                    {
                      key: "service",
                      label: "Үйлчилгээ",
                      children: (
                        <span className="whitespace-normal break-words">
                          {serviceTypeById(viewedOrder.serviceType)}
                        </span>
                      ),
                    },
                    {
                      key: "programCode",
                      label:
                        "Программын код",
                      children: (
                        <span className="whitespace-normal break-words">
                          {viewedOrder.programCode}
                        </span>
                      ),
                    },
                    {
                      key: "workNotes",
                      label: "Хариуцагч тайлбар",
                      children: (
                        <span className="whitespace-normal break-words">
                          {viewedOrder.comment}
                        </span>
                      ),
                    },
                    {
                      key: "comment",
                      label: "Захиалагч тайлбар",
                      children: (
                        <span className="whitespace-normal break-words">
                          {viewedOrder.workNotes}
                        </span>
                      ),
                    },
                  ]
                : []
            }
            column={1}
          />
        </Modal>
      </div>
    </>
  );
};
