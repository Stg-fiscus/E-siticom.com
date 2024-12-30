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
      <img src={article.thumbnall} width={300} className="rounded-lg" />
      <span className="mt-2 text-center text-sm font-medium">{article.title}</span>
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
    <div className="flex flex-col md:flex-row md:gap-6">
      {/* Main article section */}
      <div className="flex-1 px-4">
        {contextHolder}
        <Title className="text-start">{article?.title}</Title>
        <Text>
          <div dangerouslySetInnerHTML={{ __html: article?.intro ?? "" }} />
        </Text>
        <Divider />
        <Paragraph>
          <div dangerouslySetInnerHTML={{ __html: article?.content ?? "" }} />
        </Paragraph>
      </div>

    
      {relatedArticles.length > 0 && (
        <div className="mt-6 md:mt-0 md:w-[300px] shrink-0 flex flex-col">
          <Title level={3} className="text-center md:text-start">
            Related Articles
          </Title>
          <div className="grid grid-cols-1 gap-6">
            {relatedArticles.map((article) => (
              <ArticleThumbnail key={article.id} article={article} />
            ))}
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="text-center py-6">Loading...</div>
  );
};
