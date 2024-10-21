import { ClientBase } from "@backend/base/client";
import { BackendPromise, ICourseCategory } from "@types";

export class getLessonCategoriesMixin extends ClientBase {
  /**
   * Gets list of the lesson categories
   * @returns list of the lesson categories
   */
  public async getLessonCategories(): BackendPromise<ICourseCategory[]> {
    return await this.site.getWithAuth("/getLessonCategories");
  }
}
