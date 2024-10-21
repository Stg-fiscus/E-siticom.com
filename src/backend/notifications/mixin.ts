import { DeleteNotificationMixin } from "./deleteNotification";
import { GetAllNewNotificationsMixin } from "./getAllNewNotifications";
import { GetAllNotificationsMixin } from "./getAllNotifications";
import { MarkSeenAllMixin } from "./markSeenAll";
import { MarkSeenMixin } from "./markSeen";
import { NotificationListenerMixin } from "./notificationListener";
import { GetNotificationMixin } from "./getNotification";
import { DeleteAllNotificationsMixin } from "./deleteAllNotifications";
import { applyMixins } from "@utils/functions/applyMixins";

interface NotificationsMixin
  extends DeleteNotificationMixin,
    GetAllNewNotificationsMixin,
    GetAllNotificationsMixin,
    MarkSeenAllMixin,
    MarkSeenMixin,
    NotificationListenerMixin,
    GetNotificationMixin,
    DeleteAllNotificationsMixin {}

class NotificationsMixin {}

applyMixins(NotificationsMixin, [
  DeleteNotificationMixin,
  GetAllNewNotificationsMixin,
  GetAllNotificationsMixin,
  MarkSeenAllMixin,
  MarkSeenMixin,
  NotificationListenerMixin,
  GetNotificationMixin,
  DeleteAllNotificationsMixin,
]);

export { NotificationsMixin };
