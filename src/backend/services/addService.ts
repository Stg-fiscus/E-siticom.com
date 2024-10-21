import { ClientBase } from "@backend/base/client";
import { BackendPromise } from "@types";

export class AddServiceMixin extends ClientBase {
  /**
   * Creates new order
   * @param customerId Id of the company
   * @param email user's email
   * @param phone phone number
   * @param serviceType id of the service type
   * @param comment additional comment
   * @param programCode code for using the program (Anydesk, Ultraview, etc)
   * @returns response with the id and number of new order
   */
  public async addService(
    customerId: string,
    email: string,
    phone: string,
    serviceType: string,
    comment: string,
    programCode: string,
  ): BackendPromise<{ id?: number; number?: string }> {
    const form = new FormData();

    form.append("customerId", customerId);
    form.append("email", email);
    form.append("phone", phone);
    form.append("serviceType", serviceType);
    form.append("comment", comment);
    form.append("programCode", programCode);

    return await this.fiscus.postWithAuth("/createservice", form);
  }
}
