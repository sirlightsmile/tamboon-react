import { AxiosError } from "axios";
import { BaseAPIConfig, BaseHttpRequest } from "./base_http_request";

//TODO: move to config
const GENERIC_BASE_URL = "http://localhost:3001/";

export type ConvertFunction<T> = (jsonObj: any) => jsonObj is T;

export class GenericHTTPRequest<T> extends BaseHttpRequest<T> {
  convertFunc: ConvertFunction<T>;

  constructor(config: BaseAPIConfig, convertFunc: ConvertFunction<T>) {
    config.baseURL = GENERIC_BASE_URL;
    super(config);
    this.convertFunc = convertFunc;
  }

  protected convert(data: string): T {
    if (this.convertFunc(data)) {
      return data as T;
    } else {
      throw "DATA_CONVERT_FAILED";
    }
  }

  protected errorHandle(err: AxiosError<any>): void {
    throw err;
  }
}
