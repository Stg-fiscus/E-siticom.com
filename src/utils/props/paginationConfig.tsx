import { Dispatch, SetStateAction } from "react";

interface IPaginationData {
  page: number;
  pageSize: number;
  total: number;
}

export const paginationConfig = (
  total: number,
  pagination: IPaginationData,
  setPagination: Dispatch<SetStateAction<IPaginationData>>,
) => ({
  // Customize pagination here
  total: total, // Total number of items
  showSizeChanger: true, // Show the "items per page" dropdown
  current: pagination.page,
  pageSize: pagination.pageSize,
  onChange: (pa: number, paSi: number) => {
    setPagination((prev) => ({ ...prev, page: pa }));
    setPagination((prev) => ({ ...prev, pageSize: paSi }));
  },
  showTotal: (total: number) => `Нийт: ${total}`, // Custom total text
  locale: {
    items_per_page: "", // Customize the text for size changer
  },
  // Add more customization options as needed
});
