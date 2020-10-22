import React, { useState } from "react";
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
  position: absolute;
  top: 30px;
  display: ${(props) => (props.isSelected ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  width: inherit;
  height: inherit;
  font-size: 1.2em;
  z-index: 1;
`;

const CardImgDiv = styled.div`
  background-image: url(${(props) => props.image});
  background-size: cover;
  width: inherit;
  height: inherit;
  opacity: ${(props) => (props.isSelected ? 0.1 : 1)};
  transition: 0.3s;
`;

const Content = styled.div`
  position: relative;
  width: ${(props) => props.width + "px"};
  height: ${(props) => props.height + "px"};

  &:hover ${InputDiv} {
    display: flex;
  }
  :hover ${CardImgDiv} {
    opacity: 0.1;
  }
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

  p {
    font-size: 1.2em;
    font-weight: bold;
  }
`;

const CardTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Button = styled.button`
  font-size: 1em;
  border-radius: 3px;
  color: white;
  border: ${(props) => `2px solid ${props.theme.buttonColor}`};
  border-radius: 8px;
  background-color: ${(props) =>
    props.isSelected ? props.theme.activeButtonColor : props.theme.buttonColor};
  width: 100px;
  height: 40px;
  z-index: 10;
`;

const PayButton = styled(Button)`
  margin: 1em;
  background-color: ${(props) => props.theme.buttonColor};
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
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [isSelected, setIsSelected] = useState(false);

  const onAmountClickHandler = (amount: number) => {
    setSelectedAmount(amount);
  };

  const onPayHandler = () => {
    const payment: Payment = {
      id: undefined,
      charitiesId: charities.id,
      amount: selectedAmount,
      currency: Currency.THB,
    };
    donateHandler(payment);
    setIsSelected(false);
    setSelectedAmount(0);
  };

  const onClickDonate = () => {
    const toggle = !isSelected;
    setIsSelected(toggle);
    if (!toggle) {
      setSelectedAmount(0);
    }
  };

  return (
    <CardDiv width={CARD_WIDTH} height={CARD_HEIGHT}>
      <Content
        image={IMAGE_URL_BASE + image}
        width={CARD_WIDTH}
        height={CARD_HEIGHT * IMAGE_HEIGHT_RATIO}
        isSelected={isSelected}
      >
        <CardImgDiv image={IMAGE_URL_BASE + image} isSelected={isSelected} />
        <InputDiv isSelected={isSelected}>
          <h3>Select amount to donate ({charities.currency})</h3>
          <RatioDiv>
            {payments.map((amount, i) => {
              return (
                <label key={i}>
                  <input
                    type="radio"
                    name="payment"
                    onChange={() => {
                      onAmountClickHandler(amount);
                    }}
                    checked={selectedAmount === amount}
                  />
                  {amount}
                </label>
              );
            })}
          </RatioDiv>
          {selectedAmount > 0 ? (
            <PayButton onClick={onPayHandler}>Pay</PayButton>
          ) : (
            <p color="red">Please select amount</p>
          )}
        </InputDiv>
      </Content>
      <CardTitle>
        <p>{name}</p>
        <Button onClick={onClickDonate} isSelected={isSelected}>
          Donate
        </Button>
      </CardTitle>
    </CardDiv>
  );
}

export default DonateCard;
