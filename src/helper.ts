import { Currency } from './model/enum';
import { Payment } from './model/payment_model';

/**
 * Summary total donations from specific currency
 * @param payments payments arrays
 * @param Currency currency to summary
 */
export const summaryDonationsByCurrency = (payments: Payment[], Currency: Currency) => {
  return payments
    .filter((o) => o.currency === Currency && o.amount)
    .map((o) => o.amount)
    .reduce((prev, current) => prev + current);
};
