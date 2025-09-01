import { LoaderCircle } from "lucide-react";
import React from "react";
import styled, { keyframes } from "styled-components";

const Loading = () => {
  return (
    <Backdrop>
      <Circle color="#EF8A4C" size={50} />
    </Backdrop>
  );
};

export default Loading;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Circle = styled(LoaderCircle)`
  width: 40px;
  height: 40px;
  animation: ${spin} 0.9s linear infinite;
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1e1e1e;
  z-index: 9999;
`;
