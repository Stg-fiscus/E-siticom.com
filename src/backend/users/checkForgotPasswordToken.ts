import { ClientBase } from "@backend/base/client";
import { BackendPromise } from "@types";

export class CheckForgotPasswordTokenMixin extends ClientBase {
  /**
   * Checks validity of the password reset token
   * @param email email to reset password for
   * @param token token for resetting the password
   * @returns response with no data, success field will determine whether the reset link is valid
   */
  public async checkForgotPasswordToken(
    email: string,
    token: string,
  ): BackendPromise<void> {
    return await this.site.post("/checkemailtoken", {
      email,
      token,
    });
  }
}
