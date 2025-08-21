"use client";

import React from "react";

import styled from "styled-components";
import CreatorLanding from "imports/creator/pages/Creator";
import Explore from "imports/Home/ui/components/Explore";

export default function Creator() {
  return (
    <Layout>
      <CreatorLanding />
      <ExploreWrapper>
        <Explore creator />
        <Explore creator />
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
