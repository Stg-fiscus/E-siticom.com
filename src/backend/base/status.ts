import { BackendStatus } from "@types";

export function getStatusFromCode(code: number): BackendStatus {
  if (code >= 200 && code < 300) {
    return BackendStatus.SUCCESS;
  }

  if (code == 400) {
    return BackendStatus.EBADREQUEST;
  }

  if (code == 401) {
    return BackendStatus.EUNAUTHORIZED;
  }

  if (code == 403) {
    return BackendStatus.EFORBIDDEN;
  }

  if (code == 404) {
    return BackendStatus.ENOTFOUND;
  }

  if (code >= 500) {
    return BackendStatus.ESERVERERROR;
  }

  return BackendStatus.EUNKNOWN;
}

const messages = {
  [BackendStatus.SUCCESS]: "Success!",
  [BackendStatus.EBADREQUEST]: "Мэдээллээ шалгана уу!",
  [BackendStatus.EUNAUTHORIZED]: "Unauthorized",
  [BackendStatus.EFORBIDDEN]: "Forbidden!",
  [BackendStatus.ENOTFOUND]: "Олдсонгүй!",
  [BackendStatus.ESERVERERROR]: "Сүлжээнд асуудал гарсан байна!",
  [BackendStatus.EUNKNOWN]: "Алдаа гарлаа. Дахин оролдоно уу!",
};

export function getDefaultMessage(status: BackendStatus): string {
  return messages[status];
}

export function getMessage(response: any, status: BackendStatus): string {
  if (status == BackendStatus.ESERVERERROR) {
    return messages[status];
  }

  return response?.data?.error ?? response?.data?.message ?? messages[status];
}
