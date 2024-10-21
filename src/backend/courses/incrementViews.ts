import { ClientBase } from "@backend/base/client";
import { BackendPromise } from "@types";

export class IncrementViewsMixin extends ClientBase {
  /**
   * Adds view to the selected course
   * @param id id of the course to add view to
   * @returns response with no data
   */
  public async incrementViews(id: string): BackendPromise<void> {
    return await this.site.getWithAuth(`/incrementViews/${id}`);
  }
}
