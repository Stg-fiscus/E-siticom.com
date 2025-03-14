// import Acolous from "@assets/images/AboutUs/Products/Acolous.png";
// import Fiscus from "@assets/images/AboutUs/Products/Fiscus.png";
// import Leader from "@assets/images/AboutUs/Products/Leader.png";
// import Payroll from "@assets/images/AboutUs/Products/Payroll.png";
// import Marquee from "react-fast-marquee";

// const imgs = {
//   Fiscus,
//   Acolous,
//   Payroll,
//   Leader,
// };

// function Product({ product }: { product: keyof typeof imgs }) {
//   return (
//     <div className="flex flex-col items-center gap-2">
//       <h3 className="text-3xl">{product}</h3>
//       <img src={imgs[product]} alt="Product" width={80} />
//     </div>
//   );
// }

// export function Products() {
//   return (
//     <section id="products" className="flex flex-col items-center gap-8">
//       <h2 className="text-4xl">Бүтээгдэхүүн</h2>
//       <Marquee speed={50} gradient={false}>
//         <div className="flex justify-between gap-32 pr-32">
//           <Product product="Leader" />
//           <Product product="Fiscus" />
//           <Product product="Acolous" />
//           <Product product="Payroll" />
//           <Product product="Leader" />
//           <Product product="Fiscus" />
//           <Product product="Acolous" />
//           <Product product="Payroll" />
//           <Product product="Leader" />
//           <Product product="Fiscus" />
//           <Product product="Acolous" />
//           <Product product="Payroll" />
//           <Product product="Leader" />
//           <Product product="Fiscus" />
//           <Product product="Acolous" />
//           <Product product="Payroll" />
//         </div>
//       </Marquee>
//     </section>
//   );
// }
