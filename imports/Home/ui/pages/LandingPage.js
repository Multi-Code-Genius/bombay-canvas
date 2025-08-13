"use client";

import React from "react";

import Landing from "imports/Home/ui/components/Landing";
import Explore from "../components/Explore";
import styled from "styled-components";

export default function LandingPage() {
  return (
    <Layout>
      <Landing />
      <Explore />
      <Explore />
    </Layout>
  );
}

const Layout = styled.div`
  /* margin-bottom: 31px; */
  overflow: hidden;
  width: 100%;
`;
