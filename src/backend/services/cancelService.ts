import { ClientBase } from "@backend/base/client";
import { BackendPromise } from "@types";

export class CancelServiceMixin extends ClientBase {
  /**
   * Cancels the service
   * @param id id of the service
   * @returns response with no data
   */
  public async cancelService(id: number): BackendPromise<void> {
    return await this.fiscus.deleteWithAuth(`/cancelservice/${id}`);
  }
}
