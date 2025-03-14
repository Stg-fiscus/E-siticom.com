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





// import { FaFacebook, FaPinterest, FaInstagram } from "react-icons/fa";

// export const Footer = () => {
//   return (
//     <footer className="flex flex-col items-center text-center py-8 space-y-6 bg-gray-100">
     
//       <div className="flex items-center justify-between w-full px-10">
//         <div className="border-t w-2/5" style={{borderColor:"#555659"}}></div>
//         <div className="border-t w-2/5" style={{borderColor:"#555659"}}></div>
     
//       </div>


//       <div className="flex flex-col items-center space-y-4">
//         <h2 className="text-lg font-medium">Бидэнтэй холбогдох</h2>
//         <div className="flex space-x-3 gap-10">
    
//           <a href="https://e-siticom.com/" className="text-black hover:text-gray-600">
//             <FaFacebook size={30} />
//           </a>
//           <a href="#" className="text-black hover:text-gray-600">         
//             <FaPinterest size={30} />
//           </a>
//           <a href="#" className="text-black hover:text-gray-600">
//             <FaInstagram size={30} />
//           </a>
//         </div>
//         <p className="uppercase text-xs tracking-wider text-gray-700">
//           Weekly Newsletter
//         </p>
      
//         <div className="flex flex-col space-y-2 w-64">
//           <input
//             type="email"
//             placeholder="name@email.com"
//             className="border border-gray-400 py-1 px-3 text-sm text-center focus:outline-none"
//           />
//           <button className="bg-black text-white text-sm py-1 px-4 uppercase hover:bg-gray-800">
//             Subscribe
//           </button>
//         </div>
//       </div>

    
//       <p className="text-xs text-gray-500">© 2025 он</p>
//     </footer>
//   );
// };





