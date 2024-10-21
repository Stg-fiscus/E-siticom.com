import { Card } from "@components/Card/Card";
import { Outlet } from "react-router-dom";

interface ISiteTemplateProps {
  location?: string;
  text?: string;
}

export const LoginTemplate = ({ location, text }: ISiteTemplateProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className="my-5">
        <Card
          location={location ?? ""}
          text={text ?? ""}
          className={
            "mt-4 w-full rounded-lg border border-slate-200 bg-primary-bg p-10 shadow-md lg:w-[400px]"
          }
          textClassName="w-full  text-[18px]"
        >
          <Outlet />
        </Card>
      </div>
    </div>
  );
};
