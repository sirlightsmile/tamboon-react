import React, { useEffect, useState } from "react";
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import styled from "styled-components";
import DonateCard from "./components/donote_card";
import { Charities } from "./model/charities_model";
import { Payment } from "./model/payment_model";
import { GetCharitiesRequest } from "./requests/charities_requests";
import {
  GetPaymentRequest,
  PostPaymentRequest,
} from "./requests/payment_requests";
import { debounce } from "lodash";
import { Currency } from "./model/enum";
import Loading from "./gadgets/loading";

//recoil
const donateTotalAtom = atom<number>({
  key: "donateTotal",
  default: 0,
});

export const donateTotalState = selector<number>({
  key: "donateTotalState",
  get: ({ get }) => {
    return get(donateTotalAtom);
  },
  set: ({ get, set }, newValue) => {
    const currentValue = get(donateTotalAtom);
    const addedValue = newValue as number;
    set(donateTotalAtom, currentValue + addedValue);
  },
});

const donateMessageAtom = atom<string>({
  key: "donateMessage",
  default: null,
});

const charitiesState = selector<Charities[]>({
  key: "charitiesState",
  get: async () => {
    try {
      return new GetCharitiesRequest().start();
    } catch (e) {
      throw e;
    }
  },
});

const paymentsState = selector<Payment[]>({
  key: "paymentsState",
  get: async () => {
    try {
      return new GetPaymentRequest().start();
    } catch (e) {
      throw e;
    }
  },
});

//style
const DonatePageDiv = styled.div`
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

const DonateMessage = styled.p`
  color: ${(props) => props.theme.popupFontColor};
  margin: 1em;
  font-size: 3em;
  font-weight: bold;
  text-align: center;
`;

const DonateCardDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  height: 100%;
`;

export function DonatePage() {
  const payments = useRecoilValue(paymentsState);
  const addTotal = useSetRecoilState(donateTotalState);

  useEffect(() => {
    const total = payments
      .map((o) => o.amount)
      .reduce((prev, current) => prev + current);
    addTotal(total);
  }, []);

  return (
    <DonatePageDiv>
      <header>
        <h1>Tamboon React</h1>
        <DonateTotal currency={Currency.THB} />
        <DonateMessageHeader />
      </header>
      <DonateContent />
    </DonatePageDiv>
  );
}

function DonateContent() {
  const charities = useRecoilValue(charitiesState);
  const setDonateMessage = useSetRecoilState(donateMessageAtom);
  const addTotal = useSetRecoilState(donateTotalState);
  const [isRequesting, setIsRequesting] = useState(false);

  const donateHandler = async (payment: Payment) => {
    const confirmMessage = `Are you sure you want to donate ${payment.amount.toLocaleString()} ${
      payment.currency
    }`;
    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      setIsRequesting(true);
      const res = await new PostPaymentRequest(payment).start();
      const amount = res.amount;
      setDonateMessage(
        `Thank you for your donation ${amount.toLocaleString()} ${
          payment.currency
        }!`
      );
      addTotal(amount);
      setIsRequesting(false);
    } catch (e) {
      throw e;
    }
  };

  return (
    <DonateCardDiv>
      {charities?.map((data, i) => {
        return (
          <DonateCard key={i} charities={data} donateHandler={donateHandler} />
        );
      })}
      {isRequesting ? <Loading /> : ""}
    </DonateCardDiv>
  );
}

function DonateMessageHeader() {
  const [donateMessage, setDonateMessage] = useRecoilState(donateMessageAtom);

  const setupTimer = () => {
    const timer = debounce(() => {
      setDonateMessage("");
    }, 2000);
    timer();
    return () => {
      timer.cancel();
    };
  };
  useEffect(donateMessage ? setupTimer : () => {}, [donateMessage]);

  return <DonateMessage>{donateMessage}</DonateMessage>;
}

function DonateTotal(props: { currency: Currency }) {
  const total = useRecoilValue(donateTotalAtom);
  return (
    <h2>
      All donations: {total.toLocaleString()} {props.currency}
    </h2>
  );
}
