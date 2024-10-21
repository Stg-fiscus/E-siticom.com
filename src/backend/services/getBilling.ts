import { ClientBase } from "@backend/base/client";
import { BackendPromise, IPayment } from "@types";

export class GetBillingMixin extends ClientBase {
  /**
   * Gets paginated list of payments given the company
   * @param companyId Id of the company
   * @param start start date
   * @param end end date
   * @returns list of payments
   */
  public async getBilling(
    companyId: string,
    page: number,
    perPage: number,
  ): BackendPromise<{
    transactions: IPayment[];
    totalPages: number;
    endingBalance: string;
  }> {
    const response = await this.fiscus.getWithAuth(
      `/getallbillinginfo?customer_id=${companyId}&page=${page}&perpage=${perPage}`,
    );

    return {
      ...response,
      data: {
        transactions: response?.data?.transactions?.data,
        totalPages: response?.data?.meta?.total,
        endingBalance: response?.data?.endingbalance[0]?.endingbalance,
      },
    };
  }
}
