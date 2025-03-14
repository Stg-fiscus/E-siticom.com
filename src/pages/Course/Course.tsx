import { useClient } from "@backend/client";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setNavigationDashboardSubpage } from "@store/navigation/navigationSlice";
import { ICourseCategory, IParentCourse } from "@types";
import { useSimpleMessage } from "@utils/hooks/message";
import { paginationConfig } from "@utils/props/paginationConfig";
import { Divider, Pagination, Select } from "antd";
import { useEffect, useState } from "react";
import { CourseElement } from "./CourseElement/CourseElement";

export const Course = () => {
  const [messageApi, contextHolder] = useSimpleMessage();
  const dispatch = useAppDispatch();
  const client = useClient();
  const [category, setCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<ICourseCategory[]>([]);
  const title = useAppSelector((state) => state.navigation.title);

  dispatch(setNavigationDashboardSubpage("Сургалт"));

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
          <div className="ml-auto mr-12 flex items-center">
            <Select
              className="w-full sm:w-64"
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
            />
          </div>
        </div>
      </div>

      <Divider />

      <div className="h-full w-full space-y-6">
        <div className="grid grid-cols-1 justify-items-center gap-x-5 gap-y-10 pt-4 sm:grid-cols-2 md:grid-cols-3 ">
          {videos.map((video) => (
            <div
              key={video.id}
              className="w-full max-w-[250px] sm:max-w-[280px] md:max-w-[300px] lg:max-w-[320px]"
            >
              <CourseElement video={video} />
            </div>
          ))}
        </div>

        <div className="flex w-full justify-center lg:justify-end">
          <Pagination
            className="mb-3 ml-0 lg:ml-5"
            size="small"
            {...paginationConfig(pagination.total, pagination, setPagination)}
          />
        </div>
      </div>
    </>
  );
};
