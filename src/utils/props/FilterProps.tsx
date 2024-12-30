import { FilterOutlined } from "@ant-design/icons";
import { IDataType } from "@types";
import { Button, Checkbox } from "antd";
import { FilterDropdownProps } from "antd/es/table/interface";
import { Key } from "react";

interface IFilterPropsFactoryProps {
  filterElements: any[];
  filter: string;
  option?: (s: string) => string;
  getRecordValue: (r: IDataType) => any;
}

export const FilterProps = ({
  filterElements,
  option,
  filter,  // Ensure that filter is passed to the function
  getRecordValue,
}: IFilterPropsFactoryProps) => {
  // Dynamically set the dropdown width based on the filter value
  const customDropdownStyle = filter === "customerId" ? { width: "290px" } : { width: "200px" };

  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps) => {
      const isAnyCheckboxSelected = selectedKeys.length > 0;
      return (
        <div style={{ padding: 16, ...customDropdownStyle }}>
          <Checkbox.Group
            options={filterElements
              .filter((stateValue) => stateValue !== "")
              .map((stateValue) => ({
                label: option ? option(stateValue) : stateValue,
                value: stateValue,
              }))}
            value={selectedKeys as string[]}
            onChange={(values) => setSelectedKeys(values)}
            className="flex-col"
          />
          <div style={{ borderTop: "1px solid #ccc", marginTop: 16 }}></div>
          <div style={{ marginTop: 16, textAlign: "right" }}>
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              className="mr-2"
            >
              OK
            </Button>
            <Button
              onClick={() => clearFilters!()}
              size="small"
              className="w-[70px]"
              disabled={!isAnyCheckboxSelected}
            >
              Арилгах
            </Button>
          </div>
        </div>
      );
    },
    filterIcon: () => <FilterOutlined />,
    filters: filterElements.map((stateValue) => ({
      text: stateValue,
      value: stateValue,
    })),
    onFilter: (value: boolean | Key, record: IDataType) =>
      getRecordValue(record) === value,
    filterSearch: true,
  };
};

