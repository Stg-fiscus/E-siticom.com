import { IArticle } from "@types";
import { Card } from "antd";

interface ArticleCardProps {
  item: IArticle;
}

export function ArticleCard({ item }: ArticleCardProps) {
  return (
    <a href={`/article/${item.id}`}>
      <div className="mb-5 flex justify-center">
        <Card
          cover={
            <img
              alt={item.title}
              src={item.thumbnall} 
              className="w-full object-cover rounded-t-lg"
              style={{ height: "350px" }} 
            />
          }
          className="h-[450px] w-[360px] cursor-pointer rounded-lg bg-white pb-4 shadow-[rgba(0,0,0,0.24)_0px_3px_8px] transition duration-200 hover:shadow-[rgba(0,0,0,0.25)_0px_54px_55px,rgba(0,0,0,0.12)_0px_-12px_30px,rgba(0,0,0,0.12)_0px_4px_6px,rgba(0,0,0,0.17)_0px_12px_13px,rgba(0,0,0,0.09)_0px_-3px_5px]"
        >
          
          <div className="text-center text-md font-medium h-[50px] flex items-center justify-center overflow-hidden">
            {item.title}
          </div>
        </Card>
      </div>
    </a>
  );
}
