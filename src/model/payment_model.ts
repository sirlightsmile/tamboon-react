import { Currency } from "./enum";

export interface Payment{
    id: number;
    charitiesId:number;
    amount:number;
    currency: Currency;
}

export function isPayment(obj :any) : obj is Payment{
    const asPayment = obj as Payment;
    return asPayment?.id !== undefined && asPayment.charitiesId !== undefined && asPayment.amount !== undefined && asPayment.currency !== undefined;
}