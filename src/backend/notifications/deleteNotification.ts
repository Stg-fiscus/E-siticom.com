import { ClientBase } from "@backend/base/client";
import { BackendPromise } from "@types";

export class DeleteNotificationMixin extends ClientBase {
  /**
   * Deletes notification by id
   * @param id id of the notification
   * @returns response with no data
   */
  public async deleteNotification(id: number): BackendPromise<void> {
    return await this.fiscus.getWithAuth(`/deletenotify/${id}`);
  }
}
