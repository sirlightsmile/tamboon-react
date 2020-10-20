import React from "react";
import styled from "styled-components";
import { Charities } from "../model/charities_model";
import { Currency } from "../model/enum";
import { Payment } from "../model/payment_model";

export interface Props {
  charities: Charities;
  donateHandler: (payment: Payment) => void;
}

const CardDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  border: 1px solid #ccc;
`;

const DonateButton = styled.button`
  font-size: 1em;
  margin: 1em;
  border-radius: 3px;
  color: blue;
  border: 2px solid blue;
  background-color: white;
  width: 100px;
`;

const InputDiv = styled.div`
  display: flex;
`;

const payments = [10, 20, 50, 100, 500];

const IMAGE_URL_BASE = "images/";
const IMAGE_WIDTH = 500;
const IMAGE_HEIGHT = 300;

function DonateCard(props: Props) {
  const { charities, donateHandler } = props;
  const { name, image } = charities;
  let selectedAmount = 0;

  const onAmountClickHandler = (amount: number) => {
    selectedAmount = amount;
  };

  const onPayHandler = () => {
    if (selectedAmount > 0) {
      const payment: Payment = {
        id: undefined,
        charitiesId: charities.id,
        amount: selectedAmount,
        currency: Currency.THB,
      };
      donateHandler(payment);
    }
  };

  return (
    <CardDiv>
      <p>{name}</p>
      <img
        src={IMAGE_URL_BASE + image}
        alt={name}
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
      />
      <InputDiv>
        {payments.map((amount, i) => {
          return (
            <label key={i}>
              <input
                type="radio"
                name="payment"
                onClick={() => {
                  onAmountClickHandler(amount);
                }}
              />
              {amount}
            </label>
          );
        })}
      </InputDiv>
      <DonateButton onClick={onPayHandler}>Pay</DonateButton>
    </CardDiv>
  );
}

export default DonateCard;
