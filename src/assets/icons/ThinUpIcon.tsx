import { IIconProps } from "./IIconProps";

export const ThinUpIcon = ({ color }: IIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      transform="rotate(180)"
    >
      <path
        d="M5.86872 6.63471C5.52701 6.32229 4.97299 6.32229 4.63128 6.63471C4.28957 6.94712 4.28957 7.45366 4.63128 7.76608L9.88128 12.5661C10.223 12.8785 10.777 12.8785 11.1187 12.5661L16.3687 7.76608C16.7104 7.45366 16.7104 6.94712 16.3687 6.63471C16.027 6.32229 15.473 6.32229 15.1313 6.63471L10.5 10.869L5.86872 6.63471Z"
        fill={color}
      />
    </svg>
  );
};
