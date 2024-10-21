import { ClientBase } from "@backend/base/client";
import { BackendPromise, ICourse } from "@types";

export class GetCourseLessonsMixin extends ClientBase {
  /**
   * Gets list of courses, given the id of the parent course
   * @param id Id of the parent
   * @returns a list of courses with the specified parent
   */
  public async getCourseLessons(id: string): BackendPromise<ICourse[]> {
    return await this.site.getWithAuth(`/getParentAndChilds/${id}`);
  }
}
