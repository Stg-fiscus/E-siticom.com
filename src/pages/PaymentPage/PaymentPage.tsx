import { useClient } from "@backend/client";
import { SelectCompany } from "@components/SelectCompany/SelectCompany";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setNavigationDashboardSubpage } from "@store/navigation/navigationSlice";
import { IPayment } from "@types";
import { useSimpleMessage } from "@utils/hooks/message";
import { useEffect, useState } from "react";
import { PaymentList } from "./PaymentList/PaymentList";

export const PaymentPage = () => {
  const user = useAppSelector((state) => state.user);
  const [messageApi, contextHolder] = useSimpleMessage();
  const dispatch = useAppDispatch();
  const client = useClient();

  dispatch(setNavigationDashboardSubpage("Төлбөр тооцоо"));

  // const currentYear = new Date().getFullYear();

  // const [dates, setDates] = useState({
  //   start: `${currentYear}-01-01`,
  //   end: `${currentYear}-12-31`,
  // });

  const companies = user.companies!.filter((c) => c.position > 0);

  const [selectedCompany, setSelectedCompany] = useState(companies[0].id);

  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState([] as IPayment[]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
  });

  const [curEndingBalance, setCurEndingBalance] = useState("0");

  useEffect(() => {
    (async () => {
      try {
        const response = await client.getBilling(
          selectedCompany,
          pagination.page,
          pagination.pageSize,
        );

        if (response.success) {
          const { transactions, totalPages, endingBalance } = response.data!;
          setOrderData(transactions);
          setPagination({
            ...pagination,
            total: totalPages,
          });
          setCurEndingBalance(endingBalance);
        } else {
          messageApi.error(response.message);
        }

        setLoading(false);
      } catch (e) {
        console.log(e);
        messageApi.error("Алдаа гараа!");
      }
    })();
  }, [selectedCompany, pagination.page, pagination.pageSize]);

  // const [beginBalance, setBeginBalance] = useState("0");

  // Niit tuluh dun
  // const totalPay =
  //   orderData && orderData.length > 0
  //     ? orderData.reduce((total, props) => {
  //         if (props.dtAmount) {
  //           return total + props.dtAmount;
  //         }
  //         return total;
  //       }, 0)
  //     : 0;

  // // Niit tulsun dun
  // const totalPayed =
  //   orderData && orderData.length > 0
  //     ? orderData.reduce((total, props) => {
  //         if (props.ktAmount) {
  //           return total + props.ktAmount;
  //         }
  //         return total;
  //       }, 0)
  //     : 0;

  // useEffect(() => {
  //   const FetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await GetDataWithAuthorization(
  //         `/services/getbillinginfo?customerId=${selectedCompany}&startDate=${dates.start}&endDate=${dates.end}`,
  //       );
  //       setOrderData(response?.data?.transactions);
  //       setBeginBalance(response?.data?.beginbalance || "0");
  //     } catch (err: any) {
  //       messageApi.error(err.message);
  //       console.log(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   FetchData();
  // }, [selectedCompany, dates]);

  return (
    <>
      {contextHolder}
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-col gap-y-2">
          <SelectCompany
            companies={companies}
            selectedCompany={selectedCompany}
            setSelectedCompany={(selectedCompany) => {
              setSelectedCompany(selectedCompany);
              setPagination({
                page: 1,
                pageSize: 10,
                total: 0,
              });
            }}
          />
          {/* <div className="my-4 flex flex-col items-start justify-between gap-y-2">
            <DateRangePicker
              dates={dates}
              setDates={setDates}
              className="gap-x-4"
            />
            <div className="flex flex-col items-start">
              <Card
                className="h-[40px] bg-white"
                textClassName=""
                location=""
                text=""
              >
                <div className="flex h-full items-center justify-center">
                  <div>Эхний үлдэгдэл:</div>
                  <div className="ml-1  text-primary">
                    {orderData
                      ? parseFloat(beginBalance).toLocaleString("en-US")
                      : "0"}
                    ₮
                  </div>
                </div>
              </Card>
              <Card
                className="h-[40px] bg-white"
                textClassName=""
                location=""
                text=""
              >
                <div className="flex h-full items-center justify-center">
                  <div>Эцсийн үлдэгдэл:</div>
                  <div className="ml-1  text-primary">
                    {orderData
                      ? (
                          parseFloat(beginBalance) +
                          totalPay -
                          totalPayed
                        ).toLocaleString("en-US")
                      : "0"}
                    ₮
                  </div>
                </div>
              </Card>
            </div>
          </div> */}
          <div className="flex h-full">
            <h3>Эцсийн үлдэгдэл:</h3>
            <div className="ml-1 text-primary">
              {orderData ? curEndingBalance.toLocaleString() : "0"}₮
            </div>
          </div>
        </div>

        <PaymentList
          {...{
            orderData,
            loading,
            pagination,
            setPagination,
          }}
        />
      </div>
    </>
  );
};
