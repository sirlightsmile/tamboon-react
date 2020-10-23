import React, { useState } from 'react';
import { selector, useRecoilValue, useSetRecoilState } from 'recoil';
import Loading from '../gadgets/loading';
import { Charities } from '../model/charities_model';
import { Payment } from '../model/payment_model';
import { GetCharitiesRequest } from '../requests/charities_requests';
import { GetPaymentRequest, PostPaymentRequest } from '../requests/payment_requests';
import { donateTotalState } from './donate_total';
import DonateCard from './donote_card';
import { popupMessageAtom } from './popup_message';
import styled from 'styled-components';

export const charitiesState = selector<Charities[]>({
  key: 'charitiesState',
  get: async () => {
    try {
      return new GetCharitiesRequest().start();
    } catch (e) {
      throw e;
    }
  },
});

export const paymentsState = selector<Payment[]>({
  key: 'paymentsState',
  get: async () => {
    try {
      return new GetPaymentRequest().start();
    } catch (e) {
      throw e;
    }
  },
});

const ContentDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  height: 100%;
`;

function DonateContent() {
  const charities = useRecoilValue(charitiesState);
  const setPopupMessage = useSetRecoilState(popupMessageAtom);
  const addTotal = useSetRecoilState(donateTotalState);
  const [isRequesting, setIsRequesting] = useState(false);

  const donateHandler = async (payment: Payment) => {
    const charitiesName = charities.find((o) => o.id === payment.charitiesId)?.name;
    const amountStr = `${payment.amount.toLocaleString()} ${payment.currency}`;
    const confirmMessage = `Are you sure you want to donate ${amountStr} to ${charitiesName}`;
    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      setIsRequesting(true);
      const res = await new PostPaymentRequest(payment).start();
      const amount = res.amount;
      setPopupMessage(`Thank you for your donation ${amountStr}! to\n${charitiesName}`);
      addTotal(amount);
      setIsRequesting(false);
    } catch (e) {
      throw e;
    }
  };

  return (
    <ContentDiv>
      {charities?.map((data, i) => {
        return <DonateCard key={i} charities={data} donateHandler={donateHandler} />;
      })}
      {isRequesting ? <Loading /> : ''}
    </ContentDiv>
  );
}

export default DonateContent;
