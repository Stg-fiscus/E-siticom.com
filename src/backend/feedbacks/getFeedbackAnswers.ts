import { ClientBase } from "@backend/base/client";
import { BackendPromise, IFeedbackAnswer } from "@types";

export class GetFeedbackAnswersMixin extends ClientBase {
  /**
   * Gets the list of feedback categories
   * @returns a list of active categories
   */
  public async getFeedbackAnswers(
    id: number,
  ): BackendPromise<IFeedbackAnswer[]> {
    return await this.fiscus.getWithAuth(`/feedback-answers?id=${id}`);
  }
}
