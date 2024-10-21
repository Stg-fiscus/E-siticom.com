import { ClientBase } from "@backend/base/client";
import { IOrder, BackendPromise } from "@types";

export class AddFeedbackMixin extends ClientBase {
  /**
   * Adds feedback
   * @param order data for creating new feedback
   * @returns response with no data
   */
  public async addFeedback(order: IOrder): BackendPromise<void> {
    return await this.fiscus.postWithAuth("/services/feedbackrequest", order);
  }
}
