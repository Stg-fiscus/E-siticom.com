import { ProfileIcon } from "@icons/ProfileIcon";


import { DateResult } from "@utils/functions/dateResult";


import { Button, Card, Divider } from "antd";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CourseDrawer } from "../CourseDrawer/CourseDrawer";

import { IParentCourse } from "@types";
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
  const date = video?.created_at || ""; // Хэрэв огноо байхгүй бол хоосон утга
  const lessons = video.childs! + 1;
  
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const Intro = () => {
    return (
      <div>
        <a
          className="cursor-pointer rounded-md text-link transition duration-200"
          onClick={(e: SyntheticEvent) => {
            e.stopPropagation();
            showDrawer();
          }}
        >
          Дэлгэрэнгүй
        </a>
      </div>
    );
  };

  const navigate = useNavigate();

  return (
    <>
      <Card
        className="min-w-[280px] max-w-[400px] cursor-pointer pb-4 shadow-md transition duration-200 hover:shadow-3xl"
        cover={<img src={image} className="aspect-video" />}
        onClick={() => navigate(`/dashboard/courseWatch/${id}`)}
      >
        <div className="flex h-[200px] flex-col items-start justify-between">
          <div className="flex w-full items-start justify-between">
            <div className="flex items-center">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary">
                <ProfileIcon color="#ffffff" size={20} />
              </div>
              <div className="ml-1">{author}</div>
            </div>
            <div className="text-left text-secondary-txt">{lessons} хичээл</div>
          </div>
          <div className="mt-4 text-base text-primary-txt">{title}</div>
          <div className="mb-2 flex items-center text-gray-400">
            {video.views} үзэлт
            <Divider type="vertical" />
            {date ? DateResult({ date }) : "Огноо байхгүй байна"}
          </div>
          <Intro />
          <div>
            <div className="float-right mt-auto">
              <Button
                className="my-4"
                onClick={() => navigate(`/dashboard/courseWatch/${id}`)}
                type="primary"
              >
                Одоо үзье
              </Button>
            </div>
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
    </>
  );
};
