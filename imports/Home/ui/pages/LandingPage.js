"use client";

import React from "react";

import Landing from "imports/Home/ui/components/Landing";
import Explore from "../components/Explore";
import styled from "styled-components";

export default function LandingPage() {
  return (
    <Layout>
      <Landing />
      <ExploreWrapper>
        <Explore />
        <Explore />
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
