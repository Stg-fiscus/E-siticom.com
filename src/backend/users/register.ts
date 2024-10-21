import { ClientBase } from "@backend/base/client";
import { BackendPromise, BackendStatus } from "@types";

export class RegisterMixin extends ClientBase {
  /**
   * Registers the new user and sends verification email using token from the response
   * @param name name of the new user
   * @param email email of the new user
   * @param password password of the new user
   * @returns response with no data
   */
  public async register(
    name: string,
    email: string,
    password: string,
  ): BackendPromise<void> {
    const response = await this.site.post("/register", {
      name,
      email,
      password,
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
      message:
        response?.data?.email ??
        response?.data?.name ??
        response?.data?.password ??
        response.message,
    };
  }
}
