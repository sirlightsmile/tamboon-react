import React from "react";
import styled, { keyframes } from "styled-components";

const spinning = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;

const LoadingDiv = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
`;

const BG = styled.div`
  position: absolute;
  width: inherit;
  height: inherit;
  background-color: #ccc;
  opacity: 0.5;
`;

const Content = styled.div`
  position: absolute;
  width: inherit;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingImg = styled.img`
  margin-right: 20px;
  animation: ${spinning} 2s linear infinite;
`;

function Loading() {
  return (
    <LoadingDiv onClick={() => {}}>
      <BG />
      <Content>
        <LoadingImg
          src="/images/loading.png"
          width={80}
          height={80}
          alt="loading"
        ></LoadingImg>
        <h1>Loading...</h1>
      </Content>
    </LoadingDiv>
  );
}

export default Loading;
