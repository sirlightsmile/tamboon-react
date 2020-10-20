import axios, { AxiosError } from "axios";

export enum HttpMethod {
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
}

export enum ContentType {
  JSON = "application/json",
  URLEncoded = "application/x-www-form-urlencoded",
  CSJ = "application/csj",
}

export interface BaseAPIConfig {
  method: HttpMethod;
  contentType: ContentType;
  url: string;

  baseURL?: string;
  headers?: { [key: string]: string };
  data?: object | string;
  params?: { [key: string]: string };
}

export abstract class BaseHttpRequest<T> {
  config: BaseAPIConfig;

  constructor(config: BaseAPIConfig) {
    this.config = config;
    this.prepareConfig();
  }

  public async start(): Promise<T> {
    try {
      const response = await axios(this.config);
      console.log("HTTP request", [this.config, response]);
      return this.convert(response.data as string);
    } catch (err) {
      this.errorHandle(err);
    }
  }

  protected prepareConfig(): void {
    if (!this.config.headers) {
      this.config.headers = {};
    }
    this.config.headers["Content-Type"] = this.config.contentType;

    // Prevent axios to always convert json string to json object
    (this.config as any).transformResponse = [];
  }

  protected abstract convert(data: string): T;
  protected abstract errorHandle(err: AxiosError): void;
}
