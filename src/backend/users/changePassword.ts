import { ClientBase } from "@backend/base/client";
import { changeToken } from "@store/user/userSlice";
import { BackendPromise } from "@types";

export class ChangePasswordMixin extends ClientBase {
  /**
   * Changes password of the user and sets new token
   * @param email email of the user
   * @param password new password
   * @returns response with no data
   */
  public async changePassword(
    email: string,
    password: string,
  ): BackendPromise<void> {
    const form = new FormData();
    form.append("email", email);
    form.append("newpass", password);

    const response = await this.site.postWithAuth("/changepassword", form, {
      "Content-Type": "multipart/form-data",
    });

    if (response.success) {
      this.dispatch(changeToken(response?.data?.token));
      return response;
    }

    return {
      ...response,
      message:
        response?.data?.email ?? response?.data?.newpass ?? response?.message,
    };
  }
}
