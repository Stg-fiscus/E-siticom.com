import axios, {
  Axios,
  AxiosDefaults,
  AxiosHeaderValue,
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  HeadersDefaults,
  InternalAxiosRequestConfig,
} from "axios";

/**
 * This manager is supposed to be a temporary solution to CORS errors
 * It must not be used on production server
 */
export class CORSApiManager implements Axios {
  private api: AxiosInstance;
  defaults: Omit<AxiosDefaults<any>, "headers"> & {
    headers: HeadersDefaults & { [key: string]: AxiosHeaderValue };
  };
  interceptors: {
    request: AxiosInterceptorManager<InternalAxiosRequestConfig<any>>;
    response: AxiosInterceptorManager<AxiosResponse<any, any>>;
  };

  constructor(config?: CreateAxiosDefaults) {
    this.api = axios.create(config);
    this.defaults = this.api.defaults;
    this.interceptors = this.api.interceptors;
  }
  request<T = any, R = AxiosResponse<T, any>, D = any>(
    config: AxiosRequestConfig<D>,
  ): Promise<R> {
    throw new Error("Method not implemented.");
  }
  delete<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    throw new Error("Method not implemented.");
  }
  head<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    throw new Error("Method not implemented.");
  }
  options<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    throw new Error("Method not implemented.");
  }
  put<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    throw new Error("Method not implemented.");
  }
  patch<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    throw new Error("Method not implemented.");
  }
  postForm<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    throw new Error("Method not implemented.");
  }
  putForm<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    throw new Error("Method not implemented.");
  }
  patchForm<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    throw new Error("Method not implemented.");
  }

  private convertUrl(url: string) {
    return "https://corsproxy.io/?" + encodeURIComponent(url);
  }

  public getUri(config: AxiosRequestConfig): string {
    return this.convertUrl(this.api.getUri(config));
  }

  public async get(
    endpoint: string,
    additionalData?: AxiosRequestConfig<any>,
  ): Promise<any> {
    return await axios.get(this.getUri({ url: endpoint }), additionalData);
  }

  public async post(
    endpoint: string,
    postData: any,
    additionalData?: any,
  ): Promise<any> {
    return await axios.post(
      this.getUri({ url: endpoint }),
      postData,
      additionalData,
    );
  }
}
