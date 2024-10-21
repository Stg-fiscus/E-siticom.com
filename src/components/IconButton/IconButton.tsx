import { Button } from "antd";
import { ReactNode } from "react";

interface IIconButtonProps {
  bgColor?: string;
  onClick?: () => void;
  children: ReactNode | ReactNode[];
  hoverBgColor?: string;
}

export const IconButton = ({
  bgColor,
  onClick,
  children,
}: IIconButtonProps) => {
  return (
    <Button
      type="text"
      shape="circle"
      size="small"
      className="flex items-center justify-center"
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {children}
    </Button>
  );
};
