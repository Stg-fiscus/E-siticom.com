import { ClientBase } from "@backend/base/client";
import { BackendPromise, BackendStatus } from "@types";

export class ResendEmailVerificationMixin extends ClientBase {
  /**
   * Sends new verification email
   * @param email email to send verification email to
   * @returns response with no data
   */
  public async resendEmailVerification(email: string): BackendPromise<void> {
    const response = await this.site.post("/resendemailverification", {
      email,
    });

    if (response.success) {
      return {
        success: true,
        status: BackendStatus.SUCCESS,
        message: "Амжилттай бүртгэгдлээ! Та цахим шуудангаа шалгана уу!",
      };
    }

    return {
      ...response,
      message: response?.data?.email ?? response?.message,
    };
  }
}
