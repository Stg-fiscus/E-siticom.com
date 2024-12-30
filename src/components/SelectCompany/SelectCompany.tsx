// import { Select } from "antd";
// import { ICompany } from "@types";
// import { Dispatch, SetStateAction } from "react";
// const { Option } = Select;

// interface ISelectCompanyProps {
//   companies: ICompany[];
//   selectedCompany: string;
//   setSelectedCompany: Dispatch<SetStateAction<string>>;
//   // width: string
// }

// export const SelectCompany = ({
//   companies,
//   selectedCompany,
//   setSelectedCompany,
// }: ISelectCompanyProps) => {
//   return (
//     <Select
//       value={selectedCompany}
//       onChange={(e) => setSelectedCompany(e)}
//     >
//       {companies &&
//         companies.length > 0 &&
//         companies.map((item) => (
//           <Option key={item.id} value={item.id}>
//             {item.name}
//           </Option>
//         ))}
//     </Select>
//   );
// };

// SelectCompany.tsx
import { ICompany } from "@types";
import { Input, Select } from "antd";
import { Dispatch, SetStateAction, useEffect } from "react";

const { Option } = Select;

interface ISelectCompanyProps {
  companies: ICompany[];
  selectedCompany: string;
  setSelectedCompany: Dispatch<SetStateAction<string>>;
}

export const SelectCompany = ({
  companies,
  selectedCompany,
  setSelectedCompany,
}: ISelectCompanyProps) => {
  // Хэрэв ганцхан байгууллага байвал автоматаар сонгоно
  useEffect(() => {
    if (companies.length === 1) {
      setSelectedCompany(companies[0].id);
    }
  }, [companies, setSelectedCompany]);

  // Хэрэв ганцхан байгууллага байвал зөвхөн байгууллагын нэрийг харуулна
  if (companies.length === 1) {
    return (
      <div>
        <Input
          disabled
          value={companies[0].name}
          style={{ width: "100%", marginBottom: "8px" }}
        />
      </div>
    );
  }

  // Олон байгууллага байвал сонгох цэсийг харуулна
  return (
    <div>
      <Select
        value={selectedCompany}
        onChange={(value) => setSelectedCompany(value)}
        style={{ width: "100%", marginBottom: "8px" }}
      >
        {companies.map((company) => (
          <Option key={company.id} value={company.id}>
            {company.name}
          </Option>
        ))}
      </Select>
      <Input
        value={
          companies.find((company) => company.id === selectedCompany)?.name ||
          ""
        }
        disabled
        placeholder="Сонгосон байгууллагын нэр"
      />
    </div>
  );
};
