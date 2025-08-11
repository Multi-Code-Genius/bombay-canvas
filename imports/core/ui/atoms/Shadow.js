"use client";

import useWindowSize from "lib/hooks/useWindowSize";
import React from "react";
import styled from "styled-components";

const Shadow = () => {
  return <Div />;
};

export default Shadow;

const Div = styled.div`
  background-image: url("/static/ellipse.png");
  top: 0;
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  width: 100%;
  transform: rotate(-180deg);
  padding: 15%;
`;
