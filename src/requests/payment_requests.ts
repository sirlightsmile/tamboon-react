import { isPayment, Payment } from "../model/payment_model";
import { isGetPaymentResponse } from "../response/payment_response";
import { BaseAPIConfig, ContentType, HttpMethod } from "./base_http_request";
import { GenericHTTPRequest } from "./generic_http_request";

const paymentConfig: BaseAPIConfig = {
  method: undefined,
  contentType: ContentType.JSON,
  url: "/payments",
};

export class GetPaymentRequest extends GenericHTTPRequest<Payment[]> {
  constructor() {
    const config = { ...paymentConfig, method: HttpMethod.GET };
    super(config, isGetPaymentResponse);
  }
}

export class PostPaymentRequest extends GenericHTTPRequest<Payment> {
  constructor(payment: Payment) {
    const config = { ...paymentConfig, method: HttpMethod.POST, data: payment };
    super(config, isPayment);
  }
}
