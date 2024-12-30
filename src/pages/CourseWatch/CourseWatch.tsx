import { useClient } from "@backend/client";
import { ProfileIcon } from "@icons/ProfileIcon";
import { useAppDispatch } from "@store/hooks";
import { setNavigationLesson } from "@store/navigation/navigationSlice";
import { ICourse } from "@types";
import { stripHtmlTags } from "@utils/functions/stripHtmlTags";
import { useSimpleMessage } from "@utils/hooks/message";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { FaBackward, FaForward } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { VideoList } from "./VideoList/VideoList";



export const CourseWatch = () => {
  const dispatch = useAppDispatch();
  const client = useClient();
  const [messageApi, contextHolder] = useSimpleMessage();
  const [videos, setVideos] = useState([] as ICourse[]);
  const [selectedVideo, setSelectedVideo] = useState({} as ICourse);
  const { id } = useParams();
  const [currentId, setCurrentId] = useState(id as string);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isControlVisible, setIsControlVisible] = useState(true);

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
        console.log("видео алдаа", error);
      }
    };

    getVideo();
  }, [id]);

  useEffect(() => {
    client.incrementViews(id!.toString());
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleControlVisibility = () => {
      setIsControlVisible(true);
    };

    const handleFullscreenChange = () => {
      const isFullscreen =
        document.fullscreenElement === videoElement ||
        document.fullscreenElement === videoElement;
      setIsControlVisible(isFullscreen);
    };

    if (videoElement) {
      videoElement.addEventListener("mousemove", handleControlVisibility);
      videoElement.addEventListener("play", handleControlVisibility);
      videoElement.addEventListener("pause", handleControlVisibility);
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("mousemove", handleControlVisibility);
        videoElement.removeEventListener("play", handleControlVisibility);
        videoElement.removeEventListener("pause", handleControlVisibility);
      }
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  const handleNextVideo = () => {
    const currentIndex = videos.findIndex(
      (video) => video.id === selectedVideo.id
    );
    const nextVideo = videos[currentIndex + 1];
    if (nextVideo) {
      setSelectedVideo(nextVideo);
      dispatch(setNavigationLesson(nextVideo.title));
    } else {
      messageApi.warning("Энэ видео хамгийн сүүлийнх байна.");
    }
  };

  const handlePreviousVideo = () => {
    const currentIndex = videos.findIndex(
      (video) => video.id === selectedVideo.id
    );
    const previousVideo = videos[currentIndex - 1];
    if (previousVideo) {
      setSelectedVideo(previousVideo);
      dispatch(setNavigationLesson(previousVideo.title));
    } else {
      messageApi.warning("Энэ видео хамгийн эхнийх байна.");
    }
  };

  return (
    <>
      {contextHolder}
      <div className="p-4">
        <div className="w-full">
          <div className="flex flex-col xl:flex-row">
            <div
              className={clsx(
                videos.length > 1 ? "xl:w-[75%]" : "w-full",
                "mr-2"
              )}
            >
              <div className="relative">
                <video
                  ref={videoRef}
                  controls
                  src={selectedVideo?.video}
                  poster={selectedVideo?.thumbnail}
                  className="aspect-video rounded-lg bg-black"
                  controlsList="nodownload"
                  width="100%"
                >
                  Таны ашиглаж байгаа хөтөч энэ бичлэгийг дэмжихгүй байна. Өөр хөтөч ашиглана уу!
                </video>
{/* 
                {/* {isControlVisible && (
                  <div
                    className={clsx(
                      "absolute bottom-8 left-8 ml-24 flex items-center",
                      document.fullscreenElement && "fullscreen-controls"
                    )}
                  >
                    <button
                      onClick={handlePreviousVideo}
                      className="rounded-full bg-transparent p-3 text-white transition duration-200 hover:bg-[rgba(0,0,0,0.8)]"
                    >
                      <FaBackward size={14} />
                    </button>
                    <button
                      onClick={handleNextVideo}
                      className="rounded-full bg-transparent p-3 text-white transition duration-200 hover:bg-[rgba(0,0,0,0.8)]"
                    >
                      <FaForward size={14} />
                    </button>
                  </div>
                )} */} 

                {/* <div className=""> 


                  <button>Өмнөх</button>
                  <button>Дараах</button>
                  

                </div> */}


              </div>

              <div className="mt-4 flex w-full items-center justify-between">
                <div className="ml-2 text-base">{selectedVideo?.title}</div>
                <div className="flex items-center">
                  <div className="mr-1 rounded-full">
                    <ProfileIcon color={"#ffffff"} size={20} />
                  </div>
                  <div>{selectedVideo?.author}</div>
                </div>
              </div>
              <div className="mb-2 ml-2 flex items-center">
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
              } relative mt-4 xl:mt-0 xl:border`}
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
        </div>
      </div>
    </>
  );
};
