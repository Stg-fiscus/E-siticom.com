import { ClientBase } from "@backend/base/client";
import { BackendPromise } from "@types";

export class DeleteAllNotificationsMixin extends ClientBase {
  /**
   * Deletes all notifications
   * @returns response with no data
   */
  public async deleteAllNotifications(): BackendPromise<void> {
    return await this.fiscus.getWithAuth("/deleteallnotify");
  }
}
