import { ClientBase } from "@backend/base/client";
import { setUser } from "@store/user/userSlice";
import { BackendPromise, IUser, UserRole } from "@types";
import { getIsAccountant } from "@utils/functions/getIsAccountant";
import { getRolesFromResponse, hasRole } from "@utils/functions/roles";

export class LoginMixin extends ClientBase {
  /**
   * Signs in the user
   * @param email login email
   * @param password login password
   * @returns user object
   */
  public async login(email: string, password: string): BackendPromise<IUser> {
    const response = await this.site.post("/login", {
      email,
      password,
    });

    if (response.success) {
      const data: any = response?.data;
      const roles = getRolesFromResponse(data?.role);
      const result = {
        ...response,
        data: {
          id: data?.id,
          email: data?.email,
          name: data?.name,
          roles,
          token: data?.token,
          isAnonymous: false,
          isClient: hasRole(roles, UserRole.client),
          isSite: hasRole(roles, UserRole.site),
          companies: hasRole(roles, UserRole.client) ? data.orgs : [],
          isAccountant:
            hasRole(roles, UserRole.client) && getIsAccountant(data.orgs),
        } as IUser,
      };

      this.dispatch(setUser(result.data));

      return result;
    }

    return {
      ...response,
      message: response?.data?.error ?? response?.message,
    };
  }
}
