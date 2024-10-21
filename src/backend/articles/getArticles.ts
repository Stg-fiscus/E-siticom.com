import { ClientBase } from "@backend/base/client";
import { BackendPromise, IArticle } from "@types";

export class GetArticlesMixin extends ClientBase {
  /**
   * Get a list of articles
   * @param page page number
   * @param perPage number of entries per page
   * @param category article category
   * @returns List of articles
   */
  public async getArticles(
    page?: number,
    perPage?: number,
    category?: number,
  ): BackendPromise<IArticle[]> {
    return await this.site.get(
      `/articles?page=${page ?? ""}&perPage=${perPage ?? ""}&category=${category ?? ""}`,
    );
  }
}
