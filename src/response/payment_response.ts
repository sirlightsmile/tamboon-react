import { Payment } from "../model/payment_model";

export type GetPaymentResponse = Payment[];

export function isGetPaymentResponse(obj: any): obj is GetPaymentResponse {
  const result = obj as GetPaymentResponse;
  return Array.isArray(result);
}
