"use client";

import React from "react";
import styled from "styled-components";

const Shadow = () => {
  return <Div></Div>;
};

export default Shadow;

const Div = styled.div`
  z-index: 5;
  background-image: url("/static/ellipse.png");
  top: 0;
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  width: 100%;
  transform: rotate(-180deg);
  padding: 13%;
`;
