import { useClient } from "@backend/client";
import { ArticleCard } from "@components/Card/ArticleCard";
import { IArticle } from "@types";
import { useEffect, useState } from "react";

export const FeatureNews = () => {
  const client = useClient();

  const [items, setItems] = useState([] as IArticle[]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.getFeaturedArticles();
        setItems(response?.data ?? []);
      } catch (error) {
        // setError(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="my-6 w-full text-center text-2xl">Мэдээ, мэдээлэл</div>
      <div className="grid grid-cols-1 justify-center gap-x-2 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <ArticleCard item={item} key={index} />
        ))}
      </div>
    </>
  );
};

// interface ArticleCardProps {
//   item: IArticle;
// }

// function ArticleCard({ item }: ArticleCardProps) {
//   return (
//     <div className="mb-8 flex justify-center">
//       <Card
//         cover={
//           <img
//             alt={item.title}
//             src={item.thumbnall}
//             className="w-full object-cover"
//             height={200}
//           />
//         }
//         className="w-[400px] transform shadow-md duration-300 hover:shadow-2xl"
//       >
//         <div className="text-center text-lg ">{item.title}</div>
//       </Card>
//     </div>
//   );
// }
