import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link className="flex items-center space-x-3 sm:space-x-2 max-w-[599px]" to={""}>
      <img
        src={`${import.meta.env.VITE_BACKEND_HOST}/storage/logo.jpeg`}
        alt="STG Logo"
        className="h-[40px] w-[40px] cursor-pointer rounded-full sm:h-[30px] sm:w-[30px] md:h-[40px] md:w-[40px] lg:h-[45px] lg:w-[45px]"
      />
      {/* <div className="flex flex-col">
        <p className="text-xl font-bold text-black transition-colors duration-300 hover:text-[#424040] sm:text-sm md:text-sm lg:text-base">
          Санхүүгийн
        </p>
        <span className="ml-6 block text-base font-bold text-[#EF5454] sm:text-xs md:text-sm lg:text-base">
          тооцоолох грүпп
        </span>
      </div> */}
    </Link>
  );
};
