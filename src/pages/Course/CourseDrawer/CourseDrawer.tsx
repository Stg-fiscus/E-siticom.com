import { stripHtmlTags } from "@utils/functions/stripHtmlTags";
import { Button, Drawer } from "antd";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

interface ICourseDrawerProps {
  title: string;
  onClose: () => void;
  open: boolean;
  image: string;
  content: string;
  intro: string;
  id: number;
}

export const CourseDrawer = ({
  title,
  onClose,
  open,
  image,
  content,
  intro,
  id,
}: ICourseDrawerProps) => {
  const isSmallDevice = useMediaQuery({
    query: "only screen and (max-width : 768px)",
  });
  const navigate = useNavigate();
  return (
    <Drawer
      placement={isSmallDevice ? "bottom" : "right"}
      title={title}
      onClose={onClose}
      open={open}
    >
      {isSmallDevice ? (
        <></>
      ) : (
        <img src={image} className="mb-4 aspect-video rounded-lg" />
      )}
      {intro && (
        <>
          <div className="text-base">Хураангуй</div>
          <div>{stripHtmlTags(intro)}</div>
        </>
      )}
      {content && (
        <>
          <div className="mt-4 text-base">Олж авах чадвар</div>
          <div>{content && stripHtmlTags(content)}</div>
        </>
      )}
      <div className="mt-4 flex items-center justify-between">
        <Button
          type="primary"
          onClick={() => {
            navigate(`/dashboard/courseWatch/${id}`);
            onClose();
          }}
        >
          Одоо үзье
        </Button>
        <Button onClick={onClose}>Дараа үзье</Button>
      </div>
    </Drawer>
  );
};
