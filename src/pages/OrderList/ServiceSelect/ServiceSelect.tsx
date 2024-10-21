import { Select } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IService } from "@types";
import { useClient } from "@backend/client";

interface IServiceSelectProps {
  selectedService: string;
  setSelectedService: Dispatch<SetStateAction<string>>;
}

export const ServiceSelect = ({
  selectedService,
  setSelectedService,
}: IServiceSelectProps) => {
  const client = useClient();
  const [services, setServices] = useState([] as IService[]);
  useEffect(() => {
    const getServices = async () => {
      const response = await client.getServiceTypes();

      if (response.success) {
        setServices(response?.data!);
        setSelectedService(response?.data![0]?.id);
      }
    };
    getServices();
  }, []);

  const options = [
    {
      label: <span>Үйлчилгээ</span>,
      title: "Үйлчилгээ",
      options: services.map((option, index) => ({
        label: <span key={index}>{option.name}</span>,
        value: option.id,
      })),
    },
    /*{
      label: <span>Санал хүсэлт</span>,
      title: "Санал хүсэлт",
      options: [
        {
          label: <span>Санал хүсэлт</span>,
          value: "Санал хүсэлт",
        },
      ],
    },*/
  ];

  return (
    <Select
      value={selectedService}
      options={options}
      onChange={(e) => setSelectedService(e)}
    />
  );
};
