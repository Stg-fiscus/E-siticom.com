import { ClientBase } from "@backend/base/client";
import { BackendPromise, IArticle } from "@types";

export class GetArticleMixin extends ClientBase {
  /**
   * Get a specific article
   * @param id id of the article
   * @returns Article data
   */
  public async getArticle(id: number): BackendPromise<IArticle> {
    return await this.site.get(`/article/${id}`);
  }
}
