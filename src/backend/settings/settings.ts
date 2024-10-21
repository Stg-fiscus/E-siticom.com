import { ClientBase } from "@backend/base/client";
import { BackendResponse } from "@types";

export class SettingsMixin extends ClientBase {
  /**
   * Gets server-side app settings
   * @returns current settings
   */
  public async settings(): Promise<
    BackendResponse<{ key: string; value: string }[]>
  > {
    return await this.site.get("/settings");
  }
}
