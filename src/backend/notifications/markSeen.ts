import { ClientBase } from "@backend/base/client";
import { BackendPromise } from "@types";

export class MarkSeenMixin extends ClientBase {
  /**
   * Marks the selected notification as seen
   * @param id Id of the notification
   * @returns response with no data
   */
  public async markSeen(id: number): BackendPromise<void> {
    return await this.fiscus.getWithAuth(`/notifymarkseen/${id}`);
  }
}
