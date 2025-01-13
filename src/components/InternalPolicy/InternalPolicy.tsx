import { Button, Descriptions, Divider } from "antd";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setNavigationDashboardSubpage } from "@store/navigation/navigationSlice";
import { Link } from "react-router-dom";

const InternalPolicyPage = () => {
  const dispatch = useAppDispatch();
  dispatch(setNavigationDashboardSubpage("Дотоод журам"));

  return (
    <div className="p-7">
      <Divider/>
    

      {/* Content area */}
        <Descriptions.Item label="Боловсруулалт">
          Боловсруулалт хийгдэж байна.
        </Descriptions.Item>
    </div> 
  );
};

export default InternalPolicyPage;
