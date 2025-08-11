"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";

const Shadow = () => {
  return (
    <Div>
      <Image src="/ellipse.png" alt="ellipse" width={100} height={40} />
      <Image src="/logo.png" alt="Logo" width={100} height={40} />
    </Div>
  );
};

export default Shadow;

const Div = styled.div`
  position: absolute;
  width: 100%;
  top: 20px;
`;
