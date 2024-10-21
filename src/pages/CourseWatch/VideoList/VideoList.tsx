import { List } from "antd";
import { Dispatch, SetStateAction } from "react";
import { ICourse } from "@types";
import clsx from "clsx";
import { useClient } from "@backend/client";

interface IVideoListProps {
  id: string;
  setId: Dispatch<SetStateAction<string>>;
  videos: ICourse[];
  selectedVideo: ICourse;
  setSelectedVideo: Dispatch<SetStateAction<ICourse>>;
}

export const VideoList = ({
  id,
  setId,
  videos,
  setSelectedVideo,
}: IVideoListProps) => {
  const client = useClient();
  // console.log("selected", selectedVideo);
  // const isSmallDevice = useMediaQuery({
  //   query: "only screen and (max-width : 1280px)",
  // });
  const incrementViews = async (id: number) => {
    await client.incrementViews(id.toString());
  };
  return (
    <List
      itemLayout="vertical"
      dataSource={videos}
      className="overflow-x-auto md:overflow-y-auto"
      renderItem={(video) => {
        return (
          <List.Item
            className={clsx(
              "mb-2 cursor-pointer rounded-lg transition duration-200 hover:bg-secondary-bg",
              id === video.id.toString() ? "bg-secondary-bg" : "",
            )}
            style={{
              paddingLeft: 8,
              paddingRight: 8,
              borderStyle: "none",
            }}
            onClick={() => {
              setSelectedVideo(video);
              setId(video?.id.toString());
              incrementViews(video?.id);
            }}
          >
            <List.Item.Meta
              avatar={
                <img
                  src={video?.thumbnail}
                  className="aspect-video w-[100px]"
                />
              }
              title={<div className="text-primary-txt">{video?.title}</div>}
            />
          </List.Item>
        );
      }}
    />
  );
};
