import { ClientBase } from "@backend/base/client";
import { BackendPromise, IOrder } from "@types";
export class GetServiceListMixin extends ClientBase {
  /**
   * Gets list of services given company ids & date range
   * @param companyIds list of company ids
   * @param start start date
   * @param end end date
   * @returns list of services
   */
  public async getServiceList(
    companyIds: string[],
    start?: string,
    end?: string,
  ): BackendPromise<IOrder[]> {
    const form = new FormData();
    form.append("customer_ids", companyIds.join(","));
    start && form.append("start_date", start);
    end && form.append("end_date", end);

    const response = await this.fiscus.postWithAuth("/getservicelist", form, {
      "Content-Type": "multipart/form-data",
    });

    return {
      ...response,
      data: response?.data?.map((entry: any) => ({
        ...entry,
        servedUser: entry.served_user
          ? `${entry.served_user.firstName} ${entry.served_user.lastName}`
          : null,
      })),
    };
  }
}
