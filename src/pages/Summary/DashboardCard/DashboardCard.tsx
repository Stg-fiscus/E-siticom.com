import { ReactNode } from "react";
import { Card } from "@components/Card/Card";

interface IDashboardCardProps {
  children: ReactNode | ReactNode[];
  text: string;
  borderColor: string;
  className: string;
}

export const DashboardCard = ({
  children,
  text,
  borderColor,
  className,
}: IDashboardCardProps) => {
  return (
    <Card
      text={text}
      location={"top"}
      className={`mt-4 rounded-lg border p-6 shadow-thin border-t-[${borderColor}] ${className}`}
      textClassName=""
    >
      {children}
    </Card>
  );
};
