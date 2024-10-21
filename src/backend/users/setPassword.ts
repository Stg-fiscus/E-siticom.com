import { ClientBase } from "@backend/base/client";
import { BackendPromise } from "@types";

export class SetPasswordMixin extends ClientBase {
  /**
   * Resets password for the user with a given reset token
   * @param email email address to reset password for
   * @param password new password
   * @param token reset password token
   * @returns response with no data
   */
  public async setPassword(
    email: string,
    password: string,
    token: string,
  ): BackendPromise<void> {
    const response = await this.site.post("/setpassword", {
      email,
      password,
      token,
    });

    return {
      ...response,
      message: response?.data?.password ?? response?.message,
    };
  }
}
