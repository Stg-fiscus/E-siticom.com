import { ReactNode } from "react";

interface ICardProps {
  className: string;
  textClassName: string;
  location: string;
  text: string;
  children: ReactNode | ReactNode[];
}

export const Card = ({
  className,
  textClassName,
  location,
  text,
  children,
}: ICardProps) => {
  return (
    <div
      className={`flex ${
        location === "right" || location === "left" ? "flex-row" : "flex-col"
      }`}
    >
      {location === "top" || location === "left" ? (
        <div className={`flex items-center justify-center ${textClassName}`}>
          {text}
        </div>
      ) : null}
      <div className={className}>{children}</div>
      {location === "bottom" || location === "right" ? (
        <div className={`flex items-center justify-center ${textClassName}`}>
          {text}
        </div>
      ) : null}
    </div>
  );
};
