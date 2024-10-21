import {
  getDefaultMessage,
  getMessage,
  getStatusFromCode,
} from "@backend/base/status";
import { resetNotifications } from "@store/notifications/notificationsSlice";
import { resetUser } from "@store/user/userSlice";
import { BackendPromise, BackendStatus } from "@types";
import axios from "axios";
import { ConnectorBase } from "./connector";

const token =
  "fpKQ11ewAlWD7MDKg1RLlQzR22SwEJTBJl9pGRSsm4M0Lfd1YXCbJILqesFAVfpE";

export class SiteConnector extends ConnectorBase {
  api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_HOST}/api`,
    validateStatus: () => true,
  });

  public async get(endpoint: string, headers?: any): BackendPromise<any> {
    const response = await this.api.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...(headers ?? {}),
      },
    });
    const status = getStatusFromCode(response?.status);
    return {
      data: response?.data?.data ?? response?.data,
      success: status == BackendStatus.SUCCESS,
      status,
      message: getMessage(response, status),
      meta: response?.data?.meta,
    };
  }

  public async post(
    endpoint: string,
    postData: any,
    headers?: any,
  ): BackendPromise<any> {
    const response = await this.api.post(endpoint, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(headers ?? {}),
      },
    });
    const status = getStatusFromCode(response?.status);
    return {
      data: response?.data?.data ?? response?.data,
      success: status == BackendStatus.SUCCESS,
      status,
      message: getMessage(response, status),
    };
  }

  public async getWithAuth(
    endpoint: string,
    headers?: object,
  ): BackendPromise<any> {
    if (this.user.isAnonymous) {
      return {
        status: BackendStatus.EUNAUTHORIZED,
        message: getDefaultMessage(BackendStatus.EUNAUTHORIZED),
        success: false,
      };
    }

    const response = await this.get(endpoint, {
      Authorization: `Bearer ${this.user.token}`,
      ...(headers ?? {}),
    });

    if (response.status == BackendStatus.EUNAUTHORIZED) {
      this.dispatch(resetNotifications());
      this.dispatch(resetUser());
    }

    return response;
  }

  public async postWithAuth(
    endpoint: string,
    postData: any,
    headers?: any,
  ): BackendPromise<any> {
    if (this.user.isAnonymous) {
      return {
        status: BackendStatus.EUNAUTHORIZED,
        message: getDefaultMessage(BackendStatus.EUNAUTHORIZED),
        success: false,
      };
    }

    const response = await this.post(endpoint, postData, {
      Authorization: `Bearer ${this.user.token}`,
      ...(headers ?? {}),
    });

    if (response.status == BackendStatus.EUNAUTHORIZED) {
      this.dispatch(resetNotifications());
      this.dispatch(resetUser());
    }

    return response;
  }
}
