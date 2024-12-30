import { ProfileIcon } from "@icons/ProfileIcon";
import { IParentCourse } from "@types";
import { DateResult } from "@utils/functions/dateResult";
import { Button, Card, Divider } from "antd";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CourseDrawer } from "../CourseDrawer/CourseDrawer";
import "./index.css";





interface ICourseElementProps {
  video: IParentCourse;
}

export const CourseElement = ({ video }: ICourseElementProps) => {
  const image = video?.thumbnail;
  const author = video?.author;
  const title = video?.title;
  const intro = video?.intro;
  const content = video?.content!;
  const id = video?.id;
  const date = video?.created_at || "";
  const lessons = video.childs! + 1;

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  return (
    <div>
      {" "}
   
      <Card
        className="min-h-[350px] min-w-[280px] max-w-[360px] cursor-pointer rounded-lg bg-white pb-4 shadow-[rgba(0,0,0,0.24)_0px_3px_8px] transition duration-200 hover:shadow-[rgba(0,0,0,0.25)_0px_54px_55px,rgba(0,0,0,0.12)_0px_-12px_30px,rgba(0,0,0,0.12)_0px_4px_6px,rgba(0,0,0,0.17)_0px_12px_13px,rgba(0,0,0,0.09)_0px_-3px_5px]"
        cover={
          <img src={image} alt={title} className="aspect-video rounded-t-lg" />
        }
        onClick={() => navigate(`/dashboard/courseWatch/${id}`)}
      >
        <div className="flex h-[180px] flex-col items-start justify-between p-2">
          <div className="mb-2 mt-[-10px] flex w-full flex-col">
            {" "}
       
            <div className="text-md mb-6 font-semibold text-primary-txt">
              {title}
            </div>
            <div className="flex items-center">
              <span className="text-sm text-secondary-txt">
              {lessons}   
              </span>
              <div className="ml-28 flex items-center">
                {/* <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary">
                  <ProfileIcon color="#ffffff" size={20} />
                </div> */}
                {/* <span className="ml-2 text-sm text-gray-600">{author}</span> */}
              </div>
            </div>
          </div>

          <Divider className="my-2" />

          <div className="mb-2 flex items-center text-sm text-gray-500">
            {video.views} 
            {/* {date ? DateResult({ date }) : "Огноо байхгүй байна"} */}
          </div>

          <div className="mt-4 flex w-full items-center justify-between">
            <a
              className="cursor-pointer rounded-md text-link transition duration-200"
              onClick={(e: SyntheticEvent) => {
                e.stopPropagation();
                showDrawer();
              }}
            >
              Дэлгэрэнгүй
            </a>
            <Button
              className="mt-2 w-[110px] transition duration-200"
              onClick={() => navigate(`/dashboard/courseWatch/${id}`)}
              type="primary"
            >
              Сургалт үзэх
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






// function Palindrome(too){
//   const string = too.string();

//   const urvuutoo = string.split("").reverse().join();
//   return string = urvuutoo;
// };

// console.log(Palindrome(12321)); 

// const massive = [ 2, 3 ,7 , "hehhe" ,100 , "haliu",];
// massive.unshift(999 , 57533 , "neg" , "hyr");
// console.log(massive);  