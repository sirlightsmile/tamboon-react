import React, { useState, useEffect } from "react";
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

const DonateMessage = styled.p`
  color: red;
  margin: 1em;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

export function DonatePage() {
  const [charities, setCharities] = useState<Charities[]>([]);
  const addTotal = useSetRecoilState(donateTotalState);
  const setDonateMessage = useSetRecoilState(donateMessageAtom);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [charities, payments] = await Promise.all([
          new GetCharitiesRequest().start(),
          new GetPaymentRequest().start(),
        ]);
        setCharities(charities);
        let total = 0;
        payments.forEach((element) => {
          if (element.amount) {
            total += element.amount;
          }
        });
        addTotal(total);
      } catch (e) {
        //TODO: error handler
        throw e;
      }
    };
    fetch();
  }, []);

  const donateHandler = async (payment: Payment) => {
    try {
      const res = await new PostPaymentRequest(payment).start();
      const amount = res.amount;
      setDonateMessage(`Thanks for donate ${amount}!`);
      addTotal(amount);
    } catch (e) {
      //TODO: error handler
      throw e;
    }
  };

  return (
    <div>
      <h1>Tamboon React</h1>
      <DonateTotal />
      <DonateMessageHeader />
      {charities?.map((data, i) => {
        return (
          <DonateCard key={i} charities={data} donateHandler={donateHandler} />
        );
      })}
    </div>
  );
}

function DonateMessageHeader() {
  const [donateMessage, setDonateMessage] = useRecoilState(donateMessageAtom);

  //TODO: make it disappear in 2 second

  return <DonateMessage>{donateMessage}</DonateMessage>;
}

function DonateTotal() {
  const total = useRecoilValue(donateTotalAtom);
  return <p>All donations: {total}</p>;
}
