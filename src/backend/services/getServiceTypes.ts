import { ClientBase } from "@backend/base/client";
import { BackendPromise, IService } from "@types";

export class GetServiceTypesMixin extends ClientBase {
  /**
   * gets list of service types
   * @returns list of service types
   */
  public async getServiceTypes(): BackendPromise<IService[]> {
    return await this.fiscus.getWithAuth("/getservicetypes");
  }
}
