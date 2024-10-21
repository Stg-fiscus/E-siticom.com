import { ClientBase } from "@backend/base/client";
import { BackendPromise } from "@types";

export class UpdateServiceMixin extends ClientBase {
  /**
   * Updates the service using id and new data
   * @param id id of the service
   * @param customerId company id
   * @param email user's email
   * @param phone phone number
   * @param serviceType id of the type of service
   * @param comment comment
   * @param programCode code of the program (e.g., Anydesk, Ultraview)
   * @returns response with no data
   */
  public async updateService(
    id: number,
    customerId: string,
    email: string,
    phone: string,
    serviceType: string,
    comment: string,
    programCode: string,
  ): BackendPromise<{ id?: number; number?: string }> {
    const form = new FormData();

    form.append("id", id.toString());
    form.append("customerId", customerId);
    form.append("email", email);
    form.append("phone", phone);
    form.append("serviceType", serviceType);
    form.append("comment", comment);
    form.append("programCode", programCode);

    return await this.fiscus.postWithAuth("/updateservice", form);
  }
}
