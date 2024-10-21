import { ClientBase } from "@backend/base/client";
import { BackendPromise, INotification } from "@types";

export class GetNotificationMixin extends ClientBase {
  /**
   * Gets notification by id
   * @param id id of the notification
   * @returns notification
   */
  public async getNotification(id: number): BackendPromise<INotification> {
    return await this.fiscus.getWithAuth(`/getnotify/${id}`);
  }
}
