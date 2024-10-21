import { ClientBase } from "@backend/base/client";
import { BackendPromise, IOrder } from "@types";

export class GetServiceMixin extends ClientBase {
  /**
   * Gets service by id
   * @param id id of the service
   * @returns service object
   */
  public async getService(id: number): BackendPromise<IOrder> {
    const response = await this.fiscus.getWithAuth(`/getservicetypes/${id}`);
    return {
      ...response,
      data: response.success
        ? {
            ...response?.data[0],
            servedUser: `${response?.data[0].served_user.firstName} ${response?.data[0].servedUser.lastName}`,
          }
        : undefined,
    };
  }
}
