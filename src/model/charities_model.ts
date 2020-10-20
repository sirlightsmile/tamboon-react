import { Currency } from "./enum";

export interface Charities{
    id: number
    name: string
    image : string
    currency: Currency
}

export function isCharities(obj :any) : obj is Charities{
    const asCharities = obj as Charities;
    return asCharities?.id !== undefined && asCharities.name !== undefined && asCharities.image !== undefined && asCharities.currency !== undefined;
}
