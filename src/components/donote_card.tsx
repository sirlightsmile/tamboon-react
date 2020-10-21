import React from "react";
import styled from "styled-components";
import { Charities } from "../model/charities_model";
import { Currency } from "../model/enum";
import { Payment } from "../model/payment_model";

const payments = [10, 20, 50, 100, 500];

const IMAGE_URL_BASE = "images/";
const CARD_WIDTH = 450;
const CARD_HEIGHT = 280;
const IMAGE_HEIGHT_RATIO = 0.82;

//style
const InputDiv = styled.div`
  display: none;
  position: absolute;
`;

const CardDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 10px;
  box-shadow: 3px 3px 5px 3px #ccc;

  margin: 10px;
  border: 1px solid #ccc;
  width: ${(props) => props.width + "px"};
  height: ${(props) => props.height + "px"};

  :hover ${InputDiv} {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: inherit;
    height: inherit;
    margin-top: 30px;
    font-size: 1.2em;
  }
  :hover .card-img {
    opacity: 10%;
  }

  p {
    font-size: 1.2em;
    font-weight: bold;
  }
`;

const DonateButton = styled.button`
  font-size: 1em;
  margin: 1em;
  border-radius: 3px;
  color: white;
  border: ${(props) => `2px solid ${props.theme.buttonColor}`};
  background-color: ${(props) => props.theme.buttonColor};
  width: 100px;
  height: 40px;
`;

const RatioDiv = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export interface Props {
  charities: Charities;
  donateHandler: (payment: Payment) => void;
}

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
    <CardDiv width={CARD_WIDTH} height={CARD_HEIGHT}>
      <img
        className="card-img"
        src={IMAGE_URL_BASE + image}
        alt={name}
        width={CARD_WIDTH}
        height={CARD_HEIGHT * IMAGE_HEIGHT_RATIO}
      />
      <p>{name}</p>
      <InputDiv>
        <h3>Select amount to donate ({charities.currency})</h3>
        <RatioDiv>
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
        </RatioDiv>
        <DonateButton onClick={onPayHandler}>Pay</DonateButton>
      </InputDiv>
    </CardDiv>
  );
}

export default DonateCard;
