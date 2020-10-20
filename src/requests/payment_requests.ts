import { isPayment, Payment } from "../model/payment_model";
import {
  GetPaymentResponse,
  isGetPaymentResponse,
} from "../response/payment_response";
import {
  BaseAPIConfig,
  ContentType,
  GenericHTTPRequest,
  HttpMethod,
} from "./http_request";

const paymentConfig: BaseAPIConfig = {
  method: undefined,
  contentType: ContentType.JSON,
  url: "/payment",
};

export class GetPaymentRequest extends GenericHTTPRequest<GetPaymentResponse> {
  constructor() {
    const config = { ...paymentConfig, method: HttpMethod.GET };
    super(config, isGetPaymentResponse);
  }
}

export class PostPaymentRequest extends GenericHTTPRequest<Payment> {
  constructor() {
    const config = { ...paymentConfig, method: HttpMethod.POST };
    super(config, isPayment);
  }
}
