import { Select } from "antd";
import { ICompany } from "@types";
import { Dispatch, SetStateAction } from "react";
const { Option } = Select;

interface ISelectCompanyProps {
  companies: ICompany[];
  selectedCompany: string;
  setSelectedCompany: Dispatch<SetStateAction<string>>;
  // width: string
}

export const SelectCompany = ({
  companies,
  selectedCompany,
  setSelectedCompany,
}: ISelectCompanyProps) => {
  return (
    <Select
      value={selectedCompany} // Use value prop instead of defaultValue
      onChange={(e) => setSelectedCompany(e)}
    >
      {companies &&
        companies.length > 0 &&
        companies.map((item) => (
          <Option key={item.id} value={item.id}>
            {item.name}
          </Option>
        ))}
    </Select>
  );
};
