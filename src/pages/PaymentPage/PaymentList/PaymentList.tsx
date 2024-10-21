import { IPaginationData, IPayment } from "@types";
import { Table } from "antd";
import { Dispatch, SetStateAction } from "react";

interface IPaymentListProps {
  orderData: IPayment[];
  loading: boolean;
  pagination: IPaginationData;
  setPagination: Dispatch<SetStateAction<IPaginationData>>;
}

export const PaymentList = ({
  orderData,
  loading,
  pagination,
  setPagination,
}: IPaymentListProps) => {
  // const [searchText, setSearchText] = useState("");
  // const [searchedColumn, setSearchedColumn] = useState("");
  // const searchInput = useRef(null);
  // const handleSearch = (
  //   selectedKeys: string[],
  //   confirm: () => void,
  //   dataIndex: string,
  // ) => {
  //   confirm();
  //   setSearchText(selectedKeys[0]);
  //   setSearchedColumn(dataIndex);
  // };
  // const handleReset = (clearFilters: () => void) => {
  //   clearFilters();
  //   setSearchText("");
  // };

  const columns = [
    {
      key: "1",
      title: "Огноо",
      dataIndex: "date",
      width: "12%",
      render: (text: string) => (
        <div>
          <div>{text.split("T")[0]}</div>
        </div>
      ),
      // sorter: (record1: IPayment, record2: IPayment) => {
      //   return (
      //     new Date(record1.date).valueOf() - new Date(record2.date).valueOf()
      //   );
      // },
    },
    {
      key: "2",
      title: "Баримтын дугаар",
      dataIndex: "number",
      width: "15%",
      // ...SearchProps({
      //   dataIndex: "number",
      //   searchInput: searchInput,
      //   handleSearch: handleSearch,
      //   handleReset: handleReset,
      //   setSearchText: setSearchText,
      //   setSearchedColumn: setSearchedColumn,
      //   searchedColumn: searchedColumn,
      //   searchText: searchText,
      //   getRecordValue: (record: IDataType) => record.number,
      // }),
    },
    {
      key: "3",
      title: "Ажил үйлчилгээ",
      dataIndex: "transactionReference",
      // ...SearchProps({
      //   dataIndex: "transactionReference",
      //   searchInput: searchInput,
      //   handleSearch: handleSearch,
      //   handleReset: handleReset,
      //   setSearchText: setSearchText,
      //   setSearchedColumn: setSearchedColumn,
      //   searchedColumn: searchedColumn,
      //   searchText: searchText,
      //   getRecordValue: (record: IDataType) =>
      //     (record as IPayment).transactionReference,
      // }),
    },
    {
      key: "4",
      title: "Төлөх дүн",
      dataIndex: "dtAmount",
      width: "10%",
      render: (text: string) => (
        <div className="text-right">
          {parseFloat(text).toLocaleString("en-US")}₮
        </div>
      ),
    },
    {
      key: "5",
      title: "Төлсөн",
      dataIndex: "ktAmount",
      width: "10%",
      render: (text: string) => (
        <div className="text-right">
          {parseFloat(text).toLocaleString("en-US")}₮
        </div>
      ),
    },
    // {
    //   key: "6",
    //   title: "Үлдэгдэл",
    //   dataIndex: "dtAmount",
    //   width: "10%",
    //   render: (text: string, record: IPayment) => (
    //     <div className="text-right">
    //       {record.dtAmount - record.ktAmount > 0
    //         ? (record.dtAmount - record.ktAmount).toLocaleString("en-US")
    //         : 0}
    //       ₮
    //     </div>
    //   ),
    // },
    // {
    //   key: "7",
    //   title: "Илүү төлөлт",
    //   dataIndex: "ktAmount",
    //   width: "10%",
    //   render: (text: string, record: IPayment) => (
    //     <div className="text-right">
    //       {record.dtAmount - record.ktAmount > 0
    //         ? 0
    //         : (record.ktAmount - record.dtAmount).toLocaleString("en-US")}
    //       ₮
    //     </div>
    //   ),
    // },
  ];
  return (
    <div className="shadow-boxThin w-full overflow-x-auto rounded-lg">
      <div className="w-full">
        {/* <div
          className="float-right cursor-pointer hover:scale-110 transition duration-200"
          onClick={() => generatePDF()}
        >
          <PrintIcon />
        </div> */}
      </div>
      {/* <div ref={componentPDF}> */}
      <Table
        columns={columns}
        dataSource={orderData ?? []}
        loading={loading}
        size="small"
        pagination={{
          total: pagination.total, // Total number of items
          showSizeChanger: true, // Show the "items per page" dropdown
          current: pagination.page,
          pageSize: pagination.pageSize,
          onChange: (pa, paSi) => {
            setPagination((prev) => ({ ...prev, page: pa }));
            setPagination((prev) => ({ ...prev, pageSize: paSi }));
          },
          showTotal: (total) => `Нийт: ${total}`, // Custom total text
          locale: {
            items_per_page: "", // Customize the text for size changer
          },
        }}
      />
      {/* </div> */}
    </div>
  );
};
