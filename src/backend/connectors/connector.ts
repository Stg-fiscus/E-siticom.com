import { AppDispatch } from "@store/store";
import { BackendPromise, IUser } from "@types";
import axios, { Axios } from "axios";

export class ConnectorBase {
  protected user: IUser;
  protected api: Axios = axios.create();
  protected dispatch: AppDispatch;

  public constructor(user: IUser, dispatch: AppDispatch) {
    this.user = user;
    this.dispatch = dispatch;
  }

  /**
   * Generic GET request
   * @param endpoint Endpoint to make GET request
   * @param headers Additional headers
   * @returns JSON response
   */
  public async get(endpoint: string, headers?: object): BackendPromise<any> {
    throw new Error("Not implemented");
  }

  /**
   * Generic POST request
   * @param endpoint Endpoint to make POST request
   * @param postData Data for the POST body
   * @param headers Additional headers
   * @returns JSON response
   */
  public async post(
    endpoint: string,
    postData: any,
    headers?: any,
  ): Promise<any> {
    throw new Error("Not implemented");
  }

  /**
   * GET request with authentication
   * @param endpoint Endpoint to make GET request to
   * @param headers Additional headers
   * @returns JSON response
   */
  public async getWithAuth(
    endpoint: string,
    headers?: object,
  ): BackendPromise<any> {
    throw new Error("Not implemented");
  }

  /**
   * POST request with authentication
   * @param endpoint Endpoint to make POST request to
   * @param postData Data for the POST body
   * @param headers Additional headers
   * @returns JSON response
   */
  public async postWithAuth(
    endpoint: string,
    postData: any,
    headers?: any,
  ): BackendPromise<any> {
    throw new Error("Not implemented");
  }

  /**
   * DELETE request with authentication
   * @param endpoint Endpoint to make DELETE request to
   * @param headers Additional headers
   * @returns JSON response
   */
  public async deleteWithAuth(
    endpoint: string,
    headers?: any,
  ): BackendPromise<any> {
    throw new Error("Not implemented");
  }
}
