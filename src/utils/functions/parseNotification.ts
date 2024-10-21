import { INotification } from "@types";

export const parseNotification = (e: any): INotification => {
  /*return {
    createDate: e.CreateDate,
    customerId: e.CustomerId,
    email: e.Email,
    id: e.Id,
    message: e.Message,
    number: e.Number,
    seen: e.Seen,
    seenDate: e.SeenDate,
  };*/
  return e;
};
