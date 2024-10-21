import { ClientBase } from "@backend/base/client";
import { BackendPromise } from "@types";
import { changeName } from "@store/user/userSlice";

export class ChangeNameMixin extends ClientBase {
  /**
   * Changes the name of the user and sets new name in the global state
   * @param email email of the user
   * @param name new name of the user
   * @returns response with no data
   */
  public async changeName(email: string, name: string): BackendPromise<void> {
    const form = new FormData();
    form.append("email", email);
    form.append("name", name);

    const response = await this.site.postWithAuth("/changeusername", form);

    if (response.success) {
      this.dispatch(changeName(name));
    }

    return response;
  }
}
