import React, { useState } from 'react';
import styled from 'styled-components';
import { Charities } from '../model/charities_model';
import { Currency } from '../model/enum';
import { Payment } from '../model/payment_model';

const payments = [10, 20, 50, 100, 500];

const IMAGE_URL_BASE = 'images/';

//style
const CardDiv = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  flex: 1 0 33%;

  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 3px 3px 5px 3px #ccc;
  padding: 10px;
  margin: 20px 50px;

  height: 35vh;
  min-width: 400px;
  max-width: 550px;
  min-height: 300px;
  max-height: 400px;

  p {
    font-size: 1.2em;
    font-weight: bold;
  }
`;

const ImgDiv = styled.div`
  position: absolute;
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-size: 100% 100%;

  width: 100%;
  height: 100%;

  opacity: ${(props) => (props.isSelected ? 0.1 : 1)};
  transition: 0.3s;
`;

const InputDiv = styled.div`
  display: ${(props) => (props.isSelected ? 'flex' : 'none')};
  position: absolute;
  flex-direction: column;
  align-items: center;
  top: 30px;

  width: inherit;
  height: inherit;

  font-size: 1.2em;
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  &:hover ${InputDiv} {
    display: flex;
  }
  :hover ${ImgDiv} {
    opacity: 0.1;
  }
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Button = styled.button`
  border: ${(props) => `2px solid ${props.theme.buttonColor}`};
  border-radius: 8px;
  background-color: ${(props) => (props.isSelected ? props.theme.activeButtonColor : props.theme.buttonColor)};
  color: white;

  font-size: 1em;
  font-weight: bold;
  width: 100px;
  height: 40px;
  z-index: 1;
`;

const PayButton = styled(Button)`
  background-color: ${(props) => props.theme.buttonColor};
  margin: 1em;
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
    <CardDiv>
      <Content isSelected={isSelected}>
        <ImgDiv image={IMAGE_URL_BASE + image} isSelected={isSelected} />
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
      <TitleDiv>
        <p>{name}</p>
        <Button onClick={onClickDonate} isSelected={isSelected}>
          Donate
        </Button>
      </TitleDiv>
    </CardDiv>
  );
}

export default DonateCard;
