import { summaryDonationsByCurrency } from '../helper';
import { Currency } from '../model/enum';
import { Payment } from '../model/payment_model';
import * as mockDB from './mockDB.json';

describe('helpers', () => {
  const data = JSON.stringify(mockDB?.payments);
  const payments: Payment[] = JSON.parse(data);

  test('mock data should exist', function () {
    expect(payments.length > 0).toBeTruthy();
  });

  test('should get correct summary', function () {
    expect(summaryDonationsByCurrency(payments, Currency.THB)).toEqual(60);
  });
});
