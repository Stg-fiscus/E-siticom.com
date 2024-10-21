import { ClientBase } from "@backend/base/client";
import { BackendPromise, BackendStatus } from "@types";

export class ResetPasswordMixin extends ClientBase {
  /**
   * Sends password reset verification to the given email address
   * @param email email to reset password for
   * @returns response with no data
   */
  public async resetPassword(email: string): BackendPromise<void> {
    const response = await this.site.post("/resetpassword", { email });

    if (response.success) {
      return {
        success: true,
        status: BackendStatus.SUCCESS,
        message:
          "Нууц үгийн сэргээлтийн бичлэг үүсгэлээ. Та цахим шуудангаа  шалгана уу!",
      };
    }

    return {
      ...response,
      message: response?.data?.email ?? response?.message,
    };
  }
}
