import { ClientBase } from "@backend/base/client";
import { useEcho } from "@backend/echo/echo";
import { BackendPromise, BackendStatus, INotification } from "@types";

export class NotificationListenerMixin extends ClientBase {
  /**
   * Creates connection to websocket that executes specified callback on new notification
   * @param callback function that executes when new notification arrives
   * @returns response with no data
   */
  public async notificationListener(
    callback: (notification: INotification) => void,
  ): BackendPromise<void> {
    try {
      const echo = useEcho(this.user, this.fiscus.wsHost);

      if (!this.user.isClient) {
        return {
          success: false,
          status: BackendStatus.EFORBIDDEN,
        };
      }

      echo
        .private(`userNotifications.${this.user.id}`)
        .listen("NotificationUpdate", (e: any) => {
          callback(e.notification);
        });

      return {
        success: false,
        status: BackendStatus.SUCCESS,
      };
    } catch (error) {
      return {
        success: false,
        status: BackendStatus.EUNKNOWN,
      };
    }
  }
}
