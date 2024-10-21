import { ClientBase } from "@backend/base/client";
import type { BackendPromise, IFeedback } from "@types";

export class CreateFeedbackMixin extends ClientBase {
  /**
   * Adds new feedback
   * @param title title of the feedback
   * @param content content of the feedback
   * @param categoryId id of the category for the feedback
   * @returns new feedback
   */
  public async createFeedback(
    title: string,
    content: string,
    categoryId: number,
    image?: { file: File },
  ): BackendPromise<IFeedback> {
    const form = new FormData();

    form.append("title", title);
    form.append("content", content);
    form.append("category_id", categoryId.toString());

    if (image) {
      form.append("image", image.file);
    }

    return await this.fiscus.postWithAuth("/feedback-new", form);
  }
}
