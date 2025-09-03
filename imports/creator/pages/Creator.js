"use client";

import React from "react";

import styled from "styled-components";
import CreatorLanding from "imports/creator/components/CreatorLanding";
import CreatorGrids from "../components/CreatorGrids";
import { useMoviesDataByCreator } from "api/movies";

export default function Creator({ params }) {
  const { data, isLoading } = useMoviesDataByCreator(params);

  return (
    <Layout>
      <CreatorLanding data={data} />
      {data?.allMovies?.length > 0 && (
        <ExploreWrapper>
          <CreatorGrids data={data} isLoading={isLoading} />
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

  @media (max-width: 768px) {
    gap: 20px;
    padding-bottom: 20px;
    padding-top: 20px;
  }
`;
