"use client";

import React from "react";

import Landing from "imports/Home/ui/components/Landing";
import Explore from "imports/Home/ui/components/Explore";
import styled from "styled-components";
import { useMoviesData } from "api/movies";

export default function LandingPage() {
  const { data, isLoading } = useMoviesData();

  return (
    <Layout>
      <Landing movieData={data?.allMovies} isLoading={isLoading} />
      {data?.allMovies?.length > 0 && (
        <ExploreWrapper>
          <Explore movieData={data?.allMovies} isLoading={isLoading} />
          <Explore movieData={data?.allMovies} isLoading={isLoading} />
        </ExploreWrapper>
      )}
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
