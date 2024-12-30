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

export const ArticleBrowse = ({ category, title }: ArticleBrowseProps) => {
  const client = useClient();
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await client.getArticles(
          pagination.page,
          pagination.pageSize,
          category,
        );

        if (response.success) {
          const data = response.data!;
          const paginationMeta = response.meta!;
          setArticles(data);
          setPagination({
            ...pagination,
            total: paginationMeta.total,
          });
        } else {
          // messageApi.error(response.message);
        }
      } catch (error) {
        console.log("article error", error);
        // Handle the error
      }
    };

    getArticles();
  }, [pagination.page, pagination.pageSize]);

  return (
    <>
      <Title className="text-sm">{title}</Title>
      <Divider />
      <div className="h-full w-full">
        <div className="grid grid-cols-1 gap-5 gap-y-10 pt-4 lg:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <div className="flex justify-center text-sm" key={article.id}>
              <ArticleCard item={article} /> 
            </div>
          ))}
        </div>

        <div className="ml-auto w-64">
          <Pagination
            className="mb-3 ml-5"
            size="small"
            {...paginationConfig(pagination.total, pagination, setPagination)}
          />
        </div>
      </div>
    </>
  );
};
