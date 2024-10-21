import { ClientBase } from "@backend/base/client";
import { BackendPromise } from "@types";

export class MarkSeenAllMixin extends ClientBase {
  /**
   * Marks all notifications for the current user as seen
   * @returns response with no data
   */
  public async markSeenAll(): BackendPromise<void> {
    return await this.fiscus.getWithAuth("/allnotifymarkseen");
  }
}
