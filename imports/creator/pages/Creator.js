"use client";

import React from "react";

import styled from "styled-components";
import CreatorLanding from "imports/creator/components/CreatorLanding";
import CreatorGrids from "../components/CreatorGrids";

export default function Creator() {
  return (
    <Layout>
      <CreatorLanding />
      <ExploreWrapper>
        <CreatorGrids />
      </ExploreWrapper>
    </Layout>
  );
}

const Layout = styled.div`
  overflow: hidden;
  width: 100%;
`;

const ExploreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 42px;
  background-color: black;
  padding-bottom: 31px;
`;
