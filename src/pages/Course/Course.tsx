import { useClient } from "@backend/client";
import { useAppDispatch } from "@store/hooks";
import { setNavigationDashboardSubpage } from "@store/navigation/navigationSlice";
import { ICourseCategory, IParentCourse } from "@types";
import { useSimpleMessage } from "@utils/hooks/message";
import { paginationConfig } from "@utils/props/paginationConfig";
import { Pagination, Select } from "antd";
import { useEffect, useState } from "react";
import { CourseElement } from "./CourseElement/CourseElement";

export const Course = () => {
  const [messageApi, contextHolder] = useSimpleMessage();
  const dispatch = useAppDispatch();
  const client = useClient();
  const [category, setCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<ICourseCategory[]>([]);

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
        // Handle the error
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
        // Handle the error
      }
    };

    getCategories();
  }, []);

  return (
    <>
      {contextHolder}
      <div className="h-full w-full">
        <Select
          className="absolute right-5 top-5"
          showSearch
          placeholder="Зэрэглэл"
          optionFilterProp="label"
          onChange={(id) => setCategory(id)}
          onClear={() => setCategory(null)}
          allowClear
          options={categories.map((cat) => ({
            label: cat.name,
            value: cat.id,
          }))}
        />
        <div className="grid grid-cols-1 gap-5 pt-8 lg:grid-cols-2 xl:grid-cols-3">
          {videos.map((video) => (
            <div className="flex justify-center" key={video.id}>
              <CourseElement video={video} />
            </div>
          ))}
        </div>

        <div className="mb-5 mt-5 w-full">
          <Pagination
            {...paginationConfig(pagination.total, pagination, setPagination)}
          />
        </div>
      </div>
    </>
  );
};
