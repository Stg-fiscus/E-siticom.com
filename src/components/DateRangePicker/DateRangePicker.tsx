import { Dispatch, SetStateAction } from "react";
import { DateIcon } from "@icons/DateIcon";
import { DatePicker } from "antd";
import { IDateRange } from "@types";

interface IDateRangePickerProps {
  dates: IDateRange;
  setDates: Dispatch<SetStateAction<IDateRange>>;
  className: string;
}

export const DateRangePicker = ({
  setDates,
  dates,
  className,
}: IDateRangePickerProps) => {
  // Hugatsaan shuultiin ehnii date
  const onChangeStart = (date: any, dateString: string) => {
    setDates({ ...dates, start: dateString });
  };
  // Hugatsaan shuultiin tugsguliin date
  const onChangeEnd = (date: any, dateString: string) => {
    setDates({ ...dates, end: dateString });
  };
  return (
    <div className={`flex items-center ${className}`}>
      <DatePicker
        picker="date"
        showToday={false}
        placeholder="Эхлэх"
        onChange={onChangeStart}
        suffixIcon={<DateIcon />}
      />
      <DatePicker
        picker="date"
        placeholder="Дуусах"
        onChange={onChangeEnd}
        suffixIcon={<DateIcon />}
      />
    </div>
  );
};
