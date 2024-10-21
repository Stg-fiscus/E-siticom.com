import { FiscusConnector } from "@backend/connectors/fiscus";
import { SiteConnector } from "@backend/connectors/site";
import { AppDispatch } from "@store/store";
import { IUser } from "@types";

export class ClientBase {
  protected user: IUser;
  protected dispatch: AppDispatch;
  protected site;
  protected fiscus;

  constructor(user: IUser, dispatch: AppDispatch) {
    this.user = user;
    this.dispatch = dispatch;
    this.site = new SiteConnector(user, dispatch);
    this.fiscus = new FiscusConnector(user, dispatch);
  }
}
