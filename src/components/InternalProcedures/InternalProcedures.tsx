import { useClient } from "@backend/client";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setNavigationDashboardSubpage } from "@store/navigation/navigationSlice";
import { ICourseCategory, IParentCourse } from "@types";
import { useSimpleMessage } from "@utils/hooks/message";
import { paginationConfig } from "@utils/props/paginationConfig";
import { Divider, Pagination, Select } from "antd";
import { useEffect, useState } from "react";
import { CourseElement } from "@pages/Course/CourseElement/CourseElement";

export const InternalProcedures = () => {
  const [messageApi, contextHolder] = useSimpleMessage();
  const dispatch = useAppDispatch();
  const client = useClient();
  const [category, setCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<ICourseCategory[]>([]);
  const title = useAppSelector((state) => state.navigation.title);

  dispatch(setNavigationDashboardSubpage("Дотоод сургалт"));

  const [videos, setVideos] = useState<IParentCourse[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await client.getParentLessons(
          pagination.page,
          pagination.pageSize,
          category ?? undefined,
        );

        if (response.success) {
          setVideos(response?.data ?? []);
          setPagination({
            ...pagination,
            total: response.meta?.total!,
          });
        } else {
          messageApi.error(response.message);
        }
      } catch (error) {
        console.log("video error", error);
      }
    };

    getVideos();
  }, [pagination.page, pagination.pageSize, category]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await client.getLessonCategories();

        if (response.success) {
          setCategories(response?.data ?? []);
        } else {
          messageApi.error(response.message);
        }
      } catch (error) {
        console.log("categories error", error);
      }
    };

    getCategories();
  }, []);

  return (
    <>
      {contextHolder}
      <div className="mb-1 flex flex-col gap-1 pb-1">
        <div className="flex items-center justify-between">
          <div className="mr-12 flex items-center ml-auto">
            <Select
              className="size-7 w-64"
              showSearch
              placeholder="Ангилал"
              optionFilterProp="label"
              onChange={(id) => setCategory(id)}
              onClear={() => setCategory(null)}
              allowClear
              options={categories.map((cat) => ({
                label: cat.name,
                value: cat.id,
              }))}
              style={{ minWidth: "120px", height: "26px" }}
            />
          </div>
        </div>
      </div>

      <Divider />

      <div className="h-full w-full">
        <div className="grid grid-cols-1 gap-5 gap-y-10 pt-4 lg:grid-cols-2 xl:grid-cols-3">
          {videos.map((video) => (
            <div className="flex justify-center" key={video.id}>
              <CourseElement video={video} />
            </div>
          ))}
        </div>

        <div className="w-64 ml-auto">
          <Pagination
            className="ml-5 mb-3"
            size="small"
            {...paginationConfig(pagination.total, pagination, setPagination)}
          />
        </div>
      </div>
    </>
  );
};

