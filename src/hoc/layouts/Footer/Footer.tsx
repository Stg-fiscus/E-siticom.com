import { Layout } from "antd";
import { FacebookIcon } from "@icons/FacebookIcon";
import { CallIcon } from "@icons/CallIcon";
import { Link } from "react-router-dom";
const { Footer: AntdFooter } = Layout;

const contactInfo = {
  address:
    "Сүхбаатар дүүрэг 8-р хороо, Б.Алтангэрэлийн гудамж-5, Сити-Центр төв, 201 тоот",
  phone: "7777-5560",
  email: "test@test.com",
};

export const ContactInfo = () => {
  return (
    <div className="my-2 text-center md:m-0">
      <p>{contactInfo.address}</p>
      <Link to="/location" className="text-sm text-link">
        Газрын зураг харуулах
      </Link>
    </div>
  );
};

export const Footer = () => {
  return (
    <AntdFooter className="flex h-[150px] flex-col gap-y-4 bg-primary-bg px-2 text-xl text-primary-txt shadow-footer md:h-[100px] md:pe-[10%] md:ps-[10%]">
      <div className="flex items-center justify-evenly">
        <a
          href="https://www.facebook.com/SiticomLLC"
          target="_blank"
          className="my-2 md:m-0"
        >
          <FacebookIcon />
        </a>
        <div className="hidden text-center xl:block">
          <ContactInfo />
        </div>
        <div className="my-2 flex items-center gap-x-1 md:m-0">
          <CallIcon />
          <a href="tel:7777-5560">{contactInfo.phone}</a>
        </div>
      </div>
      <div className="w-full pb-2 text-center xl:hidden">
        <ContactInfo />
      </div>
    </AntdFooter>
  );
};
