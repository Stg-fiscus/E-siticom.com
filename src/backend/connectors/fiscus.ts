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

/**
 * Fiscus backend connector
 */
export class FiscusConnector extends ConnectorBase {
  api = axios.create({
    baseURL: `${(import.meta as any).env.VITE_BACKEND_HOST}/api`,
    validateStatus: () => true,
  });
  private _wsHost = `https://${(import.meta as any).env.VITE_PUSHER_HOST}`;
  get wsHost(): string {
    return this._wsHost;
  }

  public async get(endpoint: string, headers?: any): BackendPromise<any> {
    const response = await this.api.get(endpoint, { headers: headers ?? {} });
    const status = getStatusFromCode(response?.status);
    return {
      data: response?.data?.data ?? response?.data,
      success: status == BackendStatus.SUCCESS,
      status,
      message: getMessage(response, status),
    };
  }

  public async post(
    endpoint: string,
    postData: any,
    headers?: any,
  ): BackendPromise<any> {
    // generic POST request
    const response = await this.api.post(endpoint, postData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
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
    headers?: any,
  ): BackendPromise<any> {
    // authenticated GET request
    if (this.user.isClient) {
      const response = await this.get(endpoint, {
        Authorization: `Bearer ${this.user.token}`,
        "Content-Type": "application/json",
        ...(headers ?? {}),
      });

      if (response.status == BackendStatus.EUNAUTHORIZED) {
        this.dispatch(resetNotifications());
        this.dispatch(resetUser());
      }

      return response;
    } else if (this.user.isAnonymous) {
      return {
        status: BackendStatus.EUNAUTHORIZED,
        message: getDefaultMessage(BackendStatus.EUNAUTHORIZED),
        success: false,
      };
    } else {
      return {
        status: BackendStatus.EFORBIDDEN,
        message: getDefaultMessage(BackendStatus.EFORBIDDEN),
        success: false,
      };
    }
  }

  public async postWithAuth(
    endpoint: string,
    postData: any,
    headers?: any,
  ): BackendPromise<any> {
    // authenticated POST request
    if (this.user.isClient) {
      const response = await this.post(endpoint, postData, {
        Authorization: `Bearer ${this.user.token}`,
        "Content-Type": "multipart/form-data",
        ...(headers ?? {}),
      });

      if (response.status == BackendStatus.EUNAUTHORIZED) {
        this.dispatch(resetNotifications());
        this.dispatch(resetUser());
      }

      return response;
    } else if (this.user.isAnonymous) {
      return {
        status: BackendStatus.EUNAUTHORIZED,
        message: getDefaultMessage(BackendStatus.EUNAUTHORIZED),
        success: false,
      };
    } else {
      return {
        status: BackendStatus.EFORBIDDEN,
        message: getDefaultMessage(BackendStatus.EFORBIDDEN),
        success: false,
      };
    }
  }

  public async deleteWithAuth(
    endpoint: string,
    headers?: any,
  ): BackendPromise<any> {
    // authenticated GET request
    if (this.user.isClient) {
      const response = await this.api.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${this.user.token}`,
          "Content-Type": "application/json",
          ...(headers ?? {}),
        },
      });

      const status = getStatusFromCode(response?.status);

      if (status == BackendStatus.EUNAUTHORIZED) {
        this.dispatch(resetNotifications());
        this.dispatch(resetUser());
      }

      return {
        data: response?.data?.data ?? response?.data,
        success: status == BackendStatus.SUCCESS,
        status,
        message: getMessage(response, status),
      };
    } else if (this.user.isAnonymous) {
      return {
        status: BackendStatus.EUNAUTHORIZED,
        message: getDefaultMessage(BackendStatus.EUNAUTHORIZED),
        success: false,
      };
    } else {
      return {
        status: BackendStatus.EFORBIDDEN,
        message: getDefaultMessage(BackendStatus.EFORBIDDEN),
        success: false,
      };
    }
  }
}
