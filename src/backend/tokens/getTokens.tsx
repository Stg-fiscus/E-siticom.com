import { ClientBase } from "@backend/base/client";
import { BackendResponse, IPageToken } from "@types";
import { Cache } from "cache-ts";

const cache = new Cache<string, BackendResponse<IPageToken[]>>(100);

export class GetTokensMixin extends ClientBase {
  /**
   * Gets page tokens
   * @param category Category of the tokens
   * @returns Tokens
   */
  public async getTokens(
    category: string,
  ): Promise<BackendResponse<IPageToken[]>> {
    const cached = cache.get(category);
    if (cached) {
      return cached;
    }

    const res = await this._getTokens(category);
    cache.set(category, res);

    return res;
  }

  private async _getTokens(category: string) {
    return await this.site.get(`/pageTokens?category=${category}`);
  }
}
