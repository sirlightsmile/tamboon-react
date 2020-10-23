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
    height: 300px;
    width: 90%;
  }
`;

const PopupStyle = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 20vh;
  width: 90%;
  height: 300px;
  z-index: 10;
`;

const BG = styled(TransparentBG)`
  animation: ${displayAnim} 0.2s linear;
  background-color: black;
  border-radius: 12px;
  opacity: 0.7;
`;

const MessageDiv = styled.div`
  margin: 2em;
  width: inherit;
  height: fit-content;
  z-index: 11;
`;

const MessageStyle = styled.p`
  color: ${(props) => props.theme.popupFontColor};
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 2px 2px darkgray;
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
      <MessageDiv>
        <MessageStyle>
          {message.split('\n').map((o, i) => (
            <React.Fragment key={i}>
              {o}
              {i < message.length - 1 ? <br /> : ''}
            </React.Fragment>
          ))}
        </MessageStyle>
      </MessageDiv>
    </PopupStyle>
  ) : null;
}

export default PopupMessage;
