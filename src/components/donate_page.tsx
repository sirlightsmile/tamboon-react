import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Currency } from '../model/enum';
import PopupMessage from './popup_message';
import DonateTotal, { donateTotalState } from './donate_total';
import DonateContent, { paymentsState } from './donate_content';
import { summaryDonationsByCurrency } from '../helper';

//style
const PageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.secondaryColor};
  min-height: 100vh;

  h1 {
    font-size: 3em;
  }

  h2 {
    font-size: 2em;
  }

  header {
    width: 100%;
    background-color: ${(props) => props.theme.primaryColor};
  }
`;

const defaultCurrency = Currency.THB;

export function DonatePage() {
  const payments = useRecoilValue(paymentsState);
  const addTotal = useSetRecoilState(donateTotalState);

  useEffect(() => {
    const total = summaryDonationsByCurrency(payments, defaultCurrency);
    addTotal(total);
  }, []);

  return (
    <PageDiv>
      <header>
        <h1>Tamboon React</h1>
        <DonateTotal currency={defaultCurrency} />
      </header>
      <PopupMessage />
      <DonateContent />
    </PageDiv>
  );
}
