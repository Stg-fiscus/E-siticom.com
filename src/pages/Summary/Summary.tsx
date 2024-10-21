import { useAppDispatch } from "@store/hooks";
import { setNavigationDashboard } from "@store/navigation/navigationSlice";
import { Empty, Select } from "antd";
import { DashboardCard } from "./DashboardCard/DashboardCard";

export const Summary = () => {
  const dispatch = useAppDispatch();

  dispatch(setNavigationDashboard());

  return (
    <>
      {true ? (
        <div className="flex h-full w-full items-center justify-center">
          <Empty description="Боловсруулалт хийгдэж байна."></Empty>
        </div>
      ) : (
        <div className="my-[5vh] grid grid-cols-2 px-[5%]">
          <DashboardCard className="w-[400px]" text="" borderColor="">
            <div className="p-4">
              {/* Header Section */}
              <div className="mb-4 flex items-center justify-between">
                <div className="text-lg text-stg-color">Төлбөр</div>
                <Select className="w-[150px]">
                  <Select.Option>Өнөөдөр</Select.Option>
                  <Select.Option>Энэ долоо хоног</Select.Option>
                  <Select.Option>Энэ сар</Select.Option>
                  <Select.Option>Энэ жил</Select.Option>
                </Select>
              </div>

              {/* Content Section */}
              <div className="grid grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="flex flex-col items-center justify-center border-r pr-4">
                  <div className="mb-1 text-xs text-slate-400">
                    Эхний үлдэгдэл
                  </div>
                  <div className="text-lg text-stg-color">100'000₮</div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col items-center justify-center pl-4 text-center">
                  <div className="mb-1 text-xs text-slate-400">
                    Эцсийн үлдэгдэл
                  </div>
                  <div className="text-lg text-stg-color">400'000₮</div>
                </div>
              </div>
            </div>
          </DashboardCard>
          <DashboardCard className="w-[400px]" text="" borderColor="">
            <div className="px-4">
              {/* Header Section */}
              <div className="mb-4 flex items-center justify-between">
                <div className="text-lg text-stg-color">Захиалга</div>
                <Select className="w-[150px]">
                  <Select.Option>Өнөөдөр</Select.Option>
                  <Select.Option>Энэ долоо хоног</Select.Option>
                  <Select.Option>Энэ сар</Select.Option>
                  <Select.Option>Энэ жил</Select.Option>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-slate-400">
                Хүлээгдэж байгаа: <span className="text-stg-color">40</span>
              </div>
              <div className="text-slate-400">
                Хийгдэж байгаа: <span className="text-stg-color">40</span>
              </div>
              <div className="text-slate-400">
                Хийгдсэн: <span className="text-stg-color">40</span>
              </div>
              <div className="text-slate-400">
                Хийгдээгүй: <span className="text-stg-color">40</span>
              </div>
            </div>
          </DashboardCard>
        </div>
      )}
    </>
  );
};

{
  /* <div className="flex flex-col gap-2">
  <div className="flex items-center text-slate-400">
    <span className="mr-2">Хүлээгдэж байгаа:</span>{" "}
    <span className="text-stg-color">4</span>
  </div>
  <div className="flex items-center text-slate-400">
    <span className="mr-2">Хийгдэж байгаа:</span>{" "}
    <span className="text-stg-color">4</span>
  </div>
  <div className="flex items-center text-slate-400">
    <span className="mr-2">Хийгдсэн:</span>{" "}
    <span className="text-stg-color">4</span>
  </div>
  <div className="flex items-center text-slate-400">
    <span className="mr-2">Хийгдээгүй:</span>{" "}
    <span className="text-stg-color">4</span>
  </div>
</div>; */
}
