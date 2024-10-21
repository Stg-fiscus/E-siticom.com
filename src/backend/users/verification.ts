import { ClientBase } from "@backend/base/client";
import { BackendPromise } from "@types";

export class VerificationMixin extends ClientBase {
  /**
   * Verifies email with a given token
   * @param token email verification token
   * @returns response with no data
   */
  public async verification(token: string): BackendPromise<void> {
    return await this.site.get(`/verification?token=${token}`);
  }
}
