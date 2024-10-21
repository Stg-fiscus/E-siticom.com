import { ClientBase } from "@backend/base/client";
import { BackendPromise, IFeedback } from "@types";

export class GetFeedbackByIdMixin extends ClientBase {
  /**
   * Gets the feedback by id
   * @param id id of the feedback
   * @returns feedback if exists one with id
   */
  public async getFeedbackById(id: number): BackendPromise<IFeedback> {
    return await this.fiscus.getWithAuth(`/feedback?id=${id}`);
  }
}
