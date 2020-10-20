import { Payment } from "../model/payment_model";

export function isGetPaymentResponse(obj: any): obj is Payment[] {
  const result = obj as Payment[];
  return Array.isArray(result);
}
