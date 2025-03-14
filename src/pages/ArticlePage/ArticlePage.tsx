import { useClient } from "@backend/client";
import { IArticle } from "@types";
import { useSimpleMessage } from "@utils/hooks/message";
import { Divider, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

const ArticleThumbnail = ({ article }: { article: IArticle }) => {
  return (
    <Link to={`/article/${article.id}`} className="flex flex-col items-center">
      <img
        src={article.thumbnall}
        className="h-[140px] w-full max-w-[290px] rounded-lg object-cover"
        alt={article.title}
      />
      <span className=" text-center text-xs font-medium">
        {article.title}
      </span>
    </Link>
  );
};

export const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<IArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<IArticle[]>([]);
  const client = useClient();
  const [messageApi, contextHolder] = useSimpleMessage();

  useEffect(() => {
    const retrieveArticle = async () => {
      try {
        const response = await client.getArticle(parseInt(id!));
        if (response.success) {
          setArticle(response.data!);
        } else {
          messageApi.error(response.message);
        }
      } catch (error) {
        console.log("article error", error);
      }
    };

    retrieveArticle();
  }, [id]);

  useEffect(() => {
    const retrieveArticles = async () => {
      if (!article) return;

      try {
        const response = await client.getArticles(1, 20, article.category.id);
        if (response.success) {
          setRelatedArticles(response.data!.filter((a) => a.id !== article.id));
        } else {
          messageApi.error(response.message);
        }
      } catch (error) {
        console.log("articles error", error);
      }
    };

    retrieveArticles();
  }, [article]);

  return article ? (
    <div className="flex flex-col gap-8 md:flex-row md:gap-6">
      {/* Main article section */}
      <div className="mx-auto w-full max-w-screen-lg flex-1 px-4">
        {contextHolder}
        <Title className="text-start text-lg sm:text-xl md:text-2xl lg:text-3xl">
          {article?.title}
        </Title>
        <Text>
          <div
            dangerouslySetInnerHTML={{
              __html: article?.intro ?? "",
            }}
            className="text-sm leading-relaxed sm:text-base md:text-lg"
          />
        </Text>
        <Divider />
        <Paragraph>
          <div
            dangerouslySetInnerHTML={{
              __html: article?.content ?? "",
            }}
            className="text-sm leading-relaxed sm:text-base md:text-lg"
          />
        </Paragraph>
      </div>

      {/* Divider for larger screens */}
      <Divider
        type="vertical"
        className="hidden md:block"
        style={{ height: "auto" }}
      />

      {/* Related articles section */}
      {relatedArticles.length > 0 && (
        <div className="mt-7 flex shrink-0 flex-col px-4 md:mt-0 md:w-[250px]">
          <Title
            level={3}
            className="mb-6 text-center font-semibold text-gray-800 md:text-start"
          >
            Related Articles
          </Title>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-1">
            {relatedArticles.map((article) => (
              <div
                key={article.id}
                className="h-[160px] w-full max-w-[300px] rounded-xl bg-gray-100 p-3 shadow-md transition duration-300 ease-in-out hover:bg-gray-200 sm:h-[180px] md:h-[200px]"
              >
                <ArticleThumbnail article={article} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="py-6 text-center">Loading...</div>
  );
};
