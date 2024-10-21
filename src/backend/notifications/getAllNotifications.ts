import { ClientBase } from "@backend/base/client";
import { BackendPromise, INotification } from "@types";
import { parseNotification } from "@utils/functions/parseNotification";

export class GetAllNotificationsMixin extends ClientBase {
  /**
   * Get list of all notifications
   * @returns List of all notifications for the current user
   */
  public async getAllNotifications(): BackendPromise<INotification[]> {
    const response = await this.fiscus.getWithAuth("/getnotifylist");

    return {
      ...response,
      data: response?.data.map(parseNotification),
    };
  }
}
