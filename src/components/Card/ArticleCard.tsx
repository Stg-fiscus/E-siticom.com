import { IArticle } from "@types";
import { Card } from "antd";

interface ArticleCardProps {
  item: IArticle;
}

export function ArticleCard({ item }: ArticleCardProps) {
  return (
    <a href={`/article/${item.id}`}>
      <div className="mb-8 flex justify-center">
        <Card
          cover={
            <img
              alt={item.title}
              src={item.thumbnall}
              className="w-full object-cover"
              height={200}
            />
          }
          className="w-[400px] transform shadow-md duration-300 hover:shadow-2xl"
        >
          <div className="text-center text-lg">{item.title}</div>
        </Card>
      </div>
    </a>
  );
}
