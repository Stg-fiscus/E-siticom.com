import { store } from "@store/store";

export const getCompanyById = (id: string) => {
  const state = store.getState();
  const companies = state.user.companies!;
  const company = companies.find((c) => c.id == id)?.name ?? "Нэргүй";
  return company;
};
