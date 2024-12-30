import { useAppDispatch, useAppSelector } from "@store/hooks";
import { applyMixins } from "@utils/functions/applyMixins";
import { ArticlesMixin } from "./articles/mixin";
import { ClientBase } from "./base/client";
import { CoursesMixin } from "./courses/mixin";
import { FeedbackMixin } from "./feedbacks/mixin";
import { NotificationsMixin } from "./notifications/mixin";
import { ServicesMixin } from "./services/mixin";
import { SettingsMixin } from "./settings/settings";
import { SlidesMixin } from "./slides/mixin";
import { PageTokensMixin } from "./tokens/mixin";
import { UsersMixin } from "./users/mixin";

interface Client
  extends ArticlesMixin,
    CoursesMixin,
    NotificationsMixin,
    ServicesMixin,
    SlidesMixin,
    UsersMixin,
    SettingsMixin,
    FeedbackMixin,
    PageTokensMixin {}

class Client extends ClientBase {
  getCompany() {
    throw new Error("Method not implemented.");
  }
}

applyMixins(Client, [
  ArticlesMixin,
  CoursesMixin,
  NotificationsMixin,
  ServicesMixin,
  SlidesMixin,
  UsersMixin,
  SettingsMixin,
  FeedbackMixin,
  PageTokensMixin,
]);

export const useClient = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  return new Client(user, dispatch);
};

export { Client };
