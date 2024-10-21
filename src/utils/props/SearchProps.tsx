import { Input, Space, Button } from "antd";
import { TextHighlighter } from "../../components/TextHighlighter/TextHighlighter";
import { SearchOutlined } from "@ant-design/icons";
import { Dispatch, Key, SetStateAction } from "react";
import { FilterDropdownProps } from "antd/es/table/interface";
import { IDataType } from "../../types";

interface ISearchPropsFactoryProps {
  dataIndex: string;
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
  getRecordValue: (r: IDataType) => string;
}

// Search-н render-лэх component
export const SearchProps = ({
  dataIndex,
  searchInput,
  handleSearch,
  handleReset,
  setSearchText,
  setSearchedColumn,
  searchedColumn,
  searchText,
  getRecordValue,
}: ISearchPropsFactoryProps) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
    close,
  }: FilterDropdownProps) => (
    <div
      style={{
        padding: 8,
      }}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <Input
        ref={searchInput}
        placeholder={`Хайх утгаа оруулна уу`}
        value={selectedKeys[0]}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() =>
          handleSearch(selectedKeys as string[], confirm, dataIndex)
        }
        style={{
          marginBottom: 8,
          display: "block",
        }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          icon={<SearchOutlined />}
          size="small"
          className="w-[90px]"
        >
          Хайх
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters)}
          size="small"
          className="w-[90px]"
        >
          Арилгах
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            confirm({
              closeDropdown: false,
            });
            setSearchText(selectedKeys[0] as string);
            setSearchedColumn(dataIndex);
          }}
        >
          Шүүх
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            close();
          }}
        >
          Хаах
        </Button>
      </Space>
    </div>
  ),
  filterIcon: <SearchOutlined />,
  onFilter: (value: boolean | Key, record: IDataType) =>
    getRecordValue(record)
      .toString()
      .toLowerCase()
      .includes((value as string).toLowerCase()),
  onFilterDropdownOpenChange: (visible: boolean) => {
    if (visible) {
      setTimeout(() => searchInput.current?.select(), 100);
    }
  },
  render: (text: string) =>
    searchedColumn === dataIndex ? (
      <TextHighlighter text={text} search={searchText} />
    ) : (
      text
    ),
});
