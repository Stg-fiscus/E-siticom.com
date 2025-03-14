// import { useClient } from "@backend/client";
// import { ArticleCard } from "@components/Card/ArticleCard";
// import { IArticle } from "@types";
// import { Typography } from "antd";
// import { useEffect, useState } from "react";




// const { Title } = Typography;
// interface FeatureNewsProps {
//   category: number; 
//   title: string; 
// } 
// export const FeatureNews = ({title , category}:FeatureNewsProps) => {
//   const client = useClient();
//   const [items, setItems] = useState([] as IArticle[]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await client.getFeaturedArticles();
//         const sortedItems = response?.data?.sort((a, b) => {
//           const dateA = new Date(a.createdAt).getTime();
//           const dateB = new Date(b.createdAt).getTime();
//           return dateB - dateA;
//         });

//         console.log("Sorted Items:", sortedItems);
//         setItems(sortedItems ?? []);
//       } catch (error) {
//         console.log("Failed to fetch articles");
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       <div className="flex w-full items-center justify-center py-8 text-center text-2xl font-medium text-black transition-colors duration-300 hover:text-[#424040] sm:text-sm md:text-lg lg:text-2xl">
//         Мэдээ, мэдээлэл
//       </div>

//       <div className="sm:grid:cols-2 grid grid-cols-1 justify-center gap-x-5 gap-y-10 pt-4 md:grid-cols-3 lg:grid-cols-4">
//         {items.map((item, index) => (
//           <ArticleCard item={item} key={index} />
//         ))}
//       </div>
      
//     </>
//   );
// };


import { useClient } from "@backend/client"; 
import { ArticleCard } from "@components/Card/ArticleCard"; 
import { IArticle } from "@types"; 
import { paginationConfig } from "@utils/props/paginationConfig"; 
import { Divider, Pagination, Typography } from "antd"; 
import { useEffect, useState } from "react"; 


const { Title } = Typography;
interface ArticleBrowseProps {
  category: number; 
  title: string; 
}


export const FeatureNews = ({ category, title }: ArticleBrowseProps) => {
  const client = useClient(); // API-тай харилцах client hook.
  
  // Нийтлэлүүдийг хадгалах `state`
  const [articles, setArticles] = useState<IArticle[]>([]);

  // Хуудаслалтын тохиргоо хадгалах `state`
  const [pagination, setPagination] = useState({
    page: 1, 
    pageSize: 10, 
    total: 0, 
  });

  // useEffect ашиглан нийтлэлүүдийг авах API дуудлагыг хийнэ.
  useEffect(() => {
    const getArticles = async () => {
      try {
        // API-аас өгөгдөл татаж байна.
        const response = await client.getArticles(
          pagination.page, 
          pagination.pageSize, 
          category, 
        );

        // Хэрэв амжилттай хариу ирсэн бол нийтлэлүүдийг хадгална.
        if (response.success) {
          const data = response.data!; 
          const paginationMeta = response.meta!; 
          
          setArticles(data); 
          
          setPagination((prev) => ({
            ...prev,
            total: paginationMeta.total,
          }));
        } else {
          // API хариу буцаасан ч амжилтгүй бол (жишээ нь: алдаа) доорх код ажиллана.
          // messageApi.error(response.message); // Энэ код комментлогдсон байна.
        }
      } catch (error) {
        console.log("article error", error); // Алдааг консол дээр хэвлэх
        // Энд алдааны менежмент хийх боломжтой.
      }
    };

    // API дуудлагыг хийх
    getArticles();
  }, [pagination.page, pagination.pageSize, category]); 
 

  return (
    <>
    
      <Title>{title}</Title>
      <Divider /> 

      <div className="h-full w-full">
       
        <div className="grid grid-cols-1 gap-x-5 gap-y-10 pt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {articles.map((article) => (
            <div className="flex justify-center text-sm" key={article.id}>
              <ArticleCard item={article} /> 
            </div>
          ))}
        </div>

        {/* Хуудаслалтын хэсэг */}
        <div className="mt-4 flex w-full justify-center lg:justify-end">
          <Pagination
            className="mb-3 lg:ml-5"
            size="small"
            {...paginationConfig(pagination.total, pagination, setPagination)}
            // paginationConfig функц нь `total`, `pagination` state болон `setPagination`-ийг аргумент болгон авна.
          />
        </div>
      </div>
    </>
  );
};

