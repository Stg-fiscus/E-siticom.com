import { useClient } from "@backend/client";
import { ProfileIcon } from "@icons/ProfileIcon";
import { useAppDispatch } from "@store/hooks";
import { setNavigationLesson } from "@store/navigation/navigationSlice";
import { ICourse } from "@types";
import { stripHtmlTags } from "@utils/functions/stripHtmlTags";
import { useSimpleMessage } from "@utils/hooks/message";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VideoList } from "./VideoList/VideoList";

export const CourseWatch = () => {
  const dispatch = useAppDispatch();
  const client = useClient();
  const [messageApi, contextHolder] = useSimpleMessage();

  const [videos, setVideos] = useState([] as ICourse[]);
  const [selectedVideo, setSelectedVideo] = useState({} as ICourse);
  // id-g ashiglan back-end ees post-g avah
  const { id } = useParams();
  const [currentId, setCurrentId] = useState(id as string);

  useEffect(() => {
    const getVideo = async () => {
      try {
        const response = await client.getCourseLessons(id!);

        if (response.success) {
          setVideos(response.data!);
          setSelectedVideo(response.data![0]);
          dispatch(setNavigationLesson(response.data![0].title));
        } else {
          messageApi.error(response.message);
        }
      } catch (error) {
        console.log("video error", error);
        // Handle the error
      }
    };

    getVideo(); // Invoke the getVideo function
  }, [id]); // Pass an empty dependency array to run the effect only once on mount

  useEffect(() => {
    client.incrementViews(id!.toString());
  }, []);

  return (
    <>
      {contextHolder}
      <div className="p-4">
        <div className="w-full">
          <div className="flex flex-col xl:flex-row">
            <div
              className={clsx(
                videos.length > 1 ? "xl:w-[75%]" : "w-full",
                "mr-2",
              )}
            >
              <video
                controls
                src={selectedVideo?.video}
                poster={selectedVideo?.thumbnail}
                className="aspect-video rounded-lg bg-black"
                controlsList="nodownload"
                width="100%"
              >
                Таны ашиглаж байгаа хөтөч энэ бичлэгийг дэмжихгүй байна. Өөр
                хөтөч ашиглана уу!.
              </video>
              <div className="mt-4 flex w-full items-center justify-between">
                <div className="ml-2 text-base">{selectedVideo?.title}</div>
                <div className="flex items-center">
                  <div className="mr-1 rounded-full bg-primary">
                    <ProfileIcon color={"#ffffff"} size={20} />
                  </div>
                  <div>{selectedVideo?.author}</div>
                </div>
              </div>
              <div className="mb-2 ml-2 flex items-center text-gray-400">
                {selectedVideo?.views} үзэлт
              </div>
              <div className="ml-2">
                {selectedVideo?.intro && (
                  <>
                    <h2 className="text-xl">Хураангуй</h2>
                    <div>{stripHtmlTags(selectedVideo?.intro)}</div>
                  </>
                )}
                {selectedVideo?.content && (
                  <>
                    <h2 className="mt-2 text-xl">Дэлгэрэнгүй</h2>
                    <div>{stripHtmlTags(selectedVideo?.content)}</div>
                  </>
                )}
              </div>
            </div>
            <div
              className={`${
                videos.length > 1 ? "min-h-[300px] w-full xl:w-[25%]" : "hidden"
              } relative mt-4 border-y-0 border-r-0 border-none border-l-border-secondary xl:mt-0 xl:border`}
            >
              <div className="absolute left-5 h-full w-full overflow-y-auto">
                <VideoList
                  id={currentId}
                  setId={setCurrentId}
                  videos={videos}
                  setSelectedVideo={setSelectedVideo}
                  selectedVideo={selectedVideo}
                />
              </div>
            </div>
          </div>

          {/*
        <Collapse
          items={[
            {
              key: "1",
              label: "Дэлгэрэнгүй",
              children: (
                <div>
                  {videos[0]?.intro && (
                    <>
                      <div className="">Хураангуй</div>
                      <div>{stripHtmlTags(videos[0]?.intro)}</div>
                    </>
                  )}
                  
                </div>
              ),
            },
          ]}
        />*/}
          {/* No description field in the course object */}
          {/* videos[0]?.description && (
                    <>
                      <div className=" ">Дэлгэрэнгүй</div>
                      <div>{stripHtmlTags(videos[0]?.description)}</div>
                    </>
                  )*/}
        </div>
      </div>
    </>
  );
};
