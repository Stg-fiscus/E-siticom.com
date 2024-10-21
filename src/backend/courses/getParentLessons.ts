import { ClientBase } from "@backend/base/client";
import { BackendPromise, IParentCourse } from "@types";

export class GetParentLessonsMixin extends ClientBase {
  /**
   * Gets list of the parent courses
   * @param page page number
   * @param perPage number of entries per page
   * @param category lesson category
   * @returns list of the parent courses
   */
  public async getParentLessons(
    page?: number,
    perPage?: number,
    category?: number,
  ): BackendPromise<IParentCourse[]> {
    if (!category) {
      return await this.site.getWithAuth(
        `/getParentLessons?page=${page ?? ""}&perPage=${perPage ?? ""}`,
      );
    }
    return await this.site.getWithAuth(
      `/getParentLessonsByCategory?page=${page ?? ""}&perPage=${perPage ?? ""}&cat_ids=${category ?? ""}`,
    );
  }
}
