import { ClientBase } from "@backend/base/client";
import { BackendPromise, IArticle } from "@types";

export class GetFeaturedArticlesMixin extends ClientBase {
  /**
   * Get a list of featured articles
   * @returns List of featured articles
   */
  public async getFeaturedArticles(): BackendPromise<IArticle[]> {
    return await this.site.get("/feateredArticles");    
  }
}
