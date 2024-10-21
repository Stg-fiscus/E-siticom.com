import clsx from "clsx";
import { NavLink } from "react-router-dom";

interface IHeaderLinkProps {
  to: string;
  name: string;
}

export const HeaderLink = ({ to, name }: IHeaderLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          "border-b-2 pb-1 transition-all duration-100",
          isActive ? "border-black" : "border-transparent hover:border-black",
          "text-lg",
        )
      }
    >
      {name}
    </NavLink>
  );
};
