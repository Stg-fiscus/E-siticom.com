import { ICompany } from "@types";

export function getIsAccountant(companies: ICompany[]) {
  return typeof companies.find((c) => c.position > 0) !== "undefined";
}
