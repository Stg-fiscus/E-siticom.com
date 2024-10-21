// Back-end-ээс ирж байгаа захиалгын төлвийн id-г үг болгох function

import { getStateText } from "@utils/functions/getStateText";
import clsx from "clsx";

interface IStateProps {
  data: string;
}

export const State = ({ data }: IStateProps) => {
  const text = getStateText(data);
  const colorClasses = [
    "bg-[#BDBDBD] text-black", // Awaiting
    "bg-[#0496D4] text-black", // In progress
    "bg-[#70e489] text-black", // Done
    "bg-[#fa1a1a] text-white", // Cancelled
  ];

  return (
    <div
      className={clsx(
        colorClasses[parseInt(data)] ?? "",
        "w-fit rounded-[4px] px-2 py-1",
      )}
    >
      {text}
    </div>
  );
};
