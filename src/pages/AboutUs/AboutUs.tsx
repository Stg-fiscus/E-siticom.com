// import { useClient } from "@backend/client";
// import { IPageToken } from "@types";
// import { stripHtmlTags } from "@utils/functions/stripHtmlTags";
// import { Spin } from "antd";
// import { useEffect, useState } from "react";
// import { Banner } from "./Banner/Banner";
// import { MainPurpose } from "./MainPurpose/MainPurpose";
// import { Numbers } from "./Numbers/Numbers";
// import { Products } from "./Products/Products";
// import { Timeline } from "./Timeline/Timeline";
// import { Values } from "./Values/Values";
// import { Vision } from "./Vision/Vision";

// const TOKENS = {
//   BANNER: 0,
//   NUMBERS: [
//     {
//       NUMBER: 1,
//       DESCRIPTION: 2,
//     },
//     {
//       NUMBER: 3,
//       DESCRIPTION: 4,
//     },
//     {
//       NUMBER: 5,
//       DESCRIPTION: 6,
//     },
//     {
//       NUMBER: 7,
//       DESCRIPTION: 8,
//     },
//   ],
//   YEARS: [
//     {
//       YEAR: 1998,
//       TOKEN: 9,
//     },
//     {
//       YEAR: 1999,
//       TOKEN: 10,
//     },
//     {
//       YEAR: 2002,
//       TOKEN: 11,
//     },
//     {
//       YEAR: 2003,
//       TOKEN: 12,
//     },
//     {
//       YEAR: 2004,
//       TOKEN: 13,
//     },
//     {
//       YEAR: 2005,
//       TOKEN: 14,
//     },
//     {
//       YEAR: 2006,
//       TOKEN: 15,
//     },
//     {
//       YEAR: 2007,
//       TOKEN: 16,
//     },
//     {
//       YEAR: 2009,
//       TOKEN: 17,
//     },
//     {
//       YEAR: 2010,
//       TOKEN: 18,
//     },
//     {
//       YEAR: 2013,
//       TOKEN: 19,
//     },
//     {
//       YEAR: 2015,
//       TOKEN: 20,
//     },
//     {
//       YEAR: 2017,
//       TOKEN: 21,
//     },
//     {
//       YEAR: 2018,
//       TOKEN: 22,
//     },
//     {
//       YEAR: 2020,
//       TOKEN: 23,
//     },
//   ],
//   MAIN_PURPOSE: 24,
//   VISION: 25,
//   VALUES: 26,
// };

// export function AboutUs() {
//   const client = useClient();
//   const [tokens, setTokens] = useState<IPageToken[]>([]);

//   useEffect(() => {
//     const fetchTokens = async () => {
//       const res = await client.getTokens("about_us");

//       if (res.success) {
//         setTokens(res.data!);
//       }
//     };
//     fetchTokens();
//   }, []);

//   return (
//     <div className="flex flex-col gap-4 [&_li]:ml-4 [&_ol]:list-decimal [&_p]:mt-4 [&_ul]:list-disc">
//       {tokens.length > 0 ? (
//         <>
//           <Banner token={tokens[TOKENS.BANNER]} />
//           <Numbers
//             numbers={TOKENS.NUMBERS.map(({ NUMBER, DESCRIPTION }) => ({
//               title: stripHtmlTags(tokens[NUMBER].content),
//               value: stripHtmlTags(tokens[DESCRIPTION].content),
//             }))}
//           />
//           <Timeline
//             timeline={TOKENS.YEARS.map(({ YEAR, TOKEN }) => ({
//               year: YEAR,
//               image: tokens[TOKEN].image,
//               description: tokens[TOKEN].content,
//             }))}
//           />
//           <MainPurpose token={tokens[TOKENS.MAIN_PURPOSE]} />
//           <Vision token={tokens[TOKENS.VISION]} />
//           <Values token={tokens[TOKENS.VALUES]} />
//           <Products />
//         </>
//       ) : (
//         <Spin size="large" />
//       )}
//     </div>
//   );
// }
