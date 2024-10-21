import { Paginated, PaginationConfig } from "@types";

export function splitPaginated<T>(
  paginatedData: Paginated<T>,
): [T[], PaginationConfig] {
  return [
    paginatedData.data,
    {
      page: paginatedData.current_page,
      pageSize: paginatedData.per_page,
      total: paginatedData.total,
    },
  ];
}
