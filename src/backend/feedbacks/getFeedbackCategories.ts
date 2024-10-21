import { ClientBase } from "@backend/base/client";
import { BackendPromise, IFeedbackCategory } from "@types";

export class GetFeedbackCategoriesMixin extends ClientBase {
  /**
   * Gets the list of feedback categories
   * @returns list of categories
   */
  public async getFeedbackCategories(): BackendPromise<IFeedbackCategory[]> {
    return await this.fiscus.getWithAuth("/feedback-categories");
  }
}
