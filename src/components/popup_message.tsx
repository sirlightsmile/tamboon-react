import React, { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { debounce } from 'lodash';
import { TransparentBG } from '../styles/customStyles';

export const popupMessageAtom = atom<string>({
  key: 'popupMessageAtom',
  default: null,
});

const displayAnim = keyframes`
  from {
    height: 0px;
    width: 0%;
  }
  to {
    height: 150px;
    width: 100%;
  }
`;

const PopupStyle = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 20vh;
  width: 100%;
  height: 150px;
  z-index: 10;
`;

const BG = styled(TransparentBG)`
  animation: ${displayAnim} 0.2s linear;
  background-color: black;
  opacity: 0.7;
`;

const MessageStyle = styled.p`
  color: ${(props) => props.theme.popupFontColor};
  margin: 2em;
  font-size: 3em;
  font-weight: bold;
  text-align: center;
  text-shadow: 2px 2px darkgray;
  z-index: 11;
`;

function PopupMessage() {
  const [message, setMessage] = useRecoilState(popupMessageAtom);

  const setupTimer = () => {
    const timer = debounce(() => {
      setMessage('');
    }, 2000);
    timer();
    return () => {
      timer.cancel();
    };
  };
  useEffect(message ? setupTimer : () => {}, [message]);

  return message ? (
    <PopupStyle>
      <BG />
      <MessageStyle>{message}</MessageStyle>
    </PopupStyle>
  ) : null;
}

export default PopupMessage;
