import { BookOutlined } from "@ant-design/icons";
import { IParentCourse } from "@types";
import { Button, Card, Divider, Tooltip } from "antd";
import { SyntheticEvent, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CourseDrawer } from "../CourseDrawer/CourseDrawer";
import "./index.css";

interface ICourseElementProps {
  video: IParentCourse;
}



export const CourseElement = ({ video }: ICourseElementProps) => {    
  const image = video?.thumbnail;
  const title = video?.title || "";
  const intro = video?.intro;
  const content = video?.content || "";
  const id = video?.id;
  const lessons = (video?.childs || 0) + 1;

  const [open, setOpen] = useState(false);
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const navigate = useNavigate();
  

  return (
    <div className="p-2">
      <Card
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

        
        cover={
          <img
            src={image}
            alt={title}
            className="w-full rounded-t-lg object-cover sm:h-[160px] md:h-[180px]"
          />
        }
        onClick={() => navigate(`/dashboard/courseWatch/${id}`)}
      >
        <div className="flex h-full flex-col justify-between overflow-hidden">
          <div>
            <Tooltip title={title} placement="top" mouseEnterDelay={0.3}>
              <div className="line-clamp-1 text-sm font-medium text-blue-900 sm:text-base">
                {title}
              </div>
            </Tooltip>

            <div className="mt-2 flex items-center justify-between text-xs text-gray-500 sm:text-sm">
              <span className="flex items-center">
                <BookOutlined className="mr-1 text-blue-700" />
                {lessons} Хичээл
              </span>
              <span className="flex items-center">
                <FaEye className="mr-1 text-blue-700" />
                {video.views}
              </span>
            </div>
          </div>

          <Divider className="my-2" />

          <div className="flex items-center justify-between">
            <a
              className="sm:text-md text-xs text-blue-700 hover:text-blue-900"
              onClick={(e: SyntheticEvent) => {
                e.stopPropagation();
                showDrawer();
              }}
            >
              Дэлгэрэнгүй
            </a>

            <Button
              className="relative inline-flex transform items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-1 text-xs font-medium text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl"
              onClick={(e: SyntheticEvent) => {
                e.stopPropagation();
                navigate(`/dashboard/courseWatch/${id}`);
              }}
              type="primary"
              size="small"
            >
              <span className="relative z-10">Сургалт үзэх</span>
            </Button>
          </div>
        </div>
      </Card>

      <CourseDrawer
        title={title}
        onClose={onClose}
        open={open}
        image={image}
        content={content}
        intro={intro}
        id={id}
      />
    </div>
  );
};







