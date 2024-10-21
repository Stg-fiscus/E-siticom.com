import { ClientBase } from "@backend/base/client";
import { BackendResponse, INotification } from "@types";

export class GetAllNewNotificationsMixin extends ClientBase {
  /**
   * Gets all notifications with seen == false
   * @returns Notifications unread by the user
   */
  public async getAllNewNotifications(): Promise<
    BackendResponse<INotification[]>
  > {
    return await this.fiscus.getWithAuth("/getnewnotifylist");
  }
}
