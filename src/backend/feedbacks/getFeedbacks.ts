import { ClientBase } from "@backend/base/client";
import { BackendPromise, IFeedback } from "@types";

export class GetFeedbacksMixin extends ClientBase {
  /**
   * Gets the list of feedbacks
   * @returns list of user's feedbacks
   */
  public async getFeedbacks(): BackendPromise<IFeedback[]> {
    return await this.fiscus.getWithAuth("/feedbacks");
  }
}
