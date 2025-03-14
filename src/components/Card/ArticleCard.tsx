import { IArticle } from "@types";
import { Card, Tooltip } from "antd"; 


interface ArticleCardProps {
  item: IArticle;
}

// `ArticleCard` компонентыг тодорхойлох
export function ArticleCard({ item }: ArticleCardProps) {
  return (
   
    <a href={`/article/${item.id}`}>
      <div className="flex justify-center p-4">
      
        <Card
     
          cover={
            <img
              alt={item.title}
              src={item.thumbnall} // Buruu bichsen anhnaasa thumbnail bish thumbnallaaraa yvj bga 
              className="w-full object-cover"
              style={{ height: "240px" }} 
            />
          }
          className="h-[320px] w-full max-w-[330px] cursor-pointer rounded-lg bg-white transition-all duration-300 hover:scale-105 sm:h-[300px] sm:w-full md:h-[320px] md:w-[300px]"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", 
            transition: "box-shadow 0.3s ease-in-out", 
          }}
        
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px";
          }}
       
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "rgba(0, 0, 0, 0.24) 0px 3px 8px";
          }}
        >
          <div className="flex flex-grow flex-col items-center justify-center">
       
            <Tooltip title={item.title} placement="top" mouseEnterDelay={0.3}>
              <div className="line-clamp-2 text-sm font-medium text-blue-900 sm:text-base">
                {item.title} 
              </div>
            </Tooltip>
          </div>
        </Card>
      </div>
    </a>
  );
}
