"use client";

import Flex from "lib/atoms/Flex";
import styled from "styled-components";
import React from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import SkeletonCard from "imports/core/ui/atoms/SkeletonCard";

const CreatorGrids = ({ data, isLoading }) => {
  const router = useRouter();

  const handlerCreator = (e, i) => {
    e.stopPropagation();
    router.push(`/creator/${i}`);
  };

  if (isLoading) {
    const skeletonCards = Array.from({ length: 15 }).map((_, index) => (
      <SkeletonCard key={index} />
    ));

    return <Wrapper>{skeletonCards}</Wrapper>;
  }

  return (
    <Div>
      <Wrapper>
        {data?.allMovies?.map((movie, index) => (
          <Card
            $bgImage={movie?.posterUrl}
            key={index}
            onClick={() => router.push(`/video/${movie?.id}`)}
          >
            <Video onClick={(e) => handlerCreator(e, movie?.uploaderId)}>
              <AvatarWrapper>
                <Image
                  src="/static/avtar.jpg"
                  width={24}
                  height={24}
                  alt="Avatar"
                />
              </AvatarWrapper>
              <Name>{movie?.uploader?.name}</Name>
            </Video>
          </Card>
        ))}
      </Wrapper>
    </Div>
  );
};

export default CreatorGrids;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0 40px;
  background-color: black;
  gap: 24px;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(235px, 1fr));
  gap: 25px;

  @media (max-width: 920px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  @media (max-width: 768px) {
    margin: 0;
    gap: 16px;
    place-items: center;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 375px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Card = styled.div`
  width: 252px;
  height: 401px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: ${({ $bgImage }) => `url(${$bgImage})`};
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 12px;

  overflow: hidden;

  @media (max-width: 920px) {
    width: 150px;
    height: 250px;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
  }

  @media (max-width: 640px) {
    width: 100%;
    height: 200px;
  }
`;

const Video = styled(Flex)`
  position: absolute;
  left: clamp(6px, 2vw, 12px);
  bottom: clamp(6px, 2vw, 12px);
  cursor: pointer;
  padding: 4px 9px 4px 3px;
  align-items: center;
  gap: 6px;
  border-radius: 24px;
  -webkit-backdrop-filter: blur(11.6px);
  backdrop-filter: blur(11.6px);
  border: solid 0.4px rgba(255, 255, 255, 0.2);
  background-color: rgba(0, 0, 0, 0.36);
  white-space: nowrap;
  z-index: 100;

  @media (max-width: 768px) {
    gap: 5px;
    border-radius: 20px;
    padding: 4px 6px 4px 3px;
  }

  @media (max-width: 480px) {
    gap: 4px;
    padding: 3px 5px 3px 2px;
    left: clamp(3px, 1vw, 12px);
  }
`;

const AvatarWrapper = styled.div`
  width: clamp(20px, 3.5vw, 24px);
  height: clamp(20px, 3.5vw, 24px);
  border-radius: 50%;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 15px;
    height: 15px;
  }

  @media (max-width: 480px) {
    width: 7px;
    height: 7px;
  }
`;

const Name = styled.div`
  font-family: "HelveticaRegular";
  font-size: clamp(10px, 2.8vw, 12px);
  letter-spacing: -0.35px;
  color: #fff;
  padding-right: 2px;
  line-height: 1.42;

  @media (max-width: 768px) {
    font-size: 8px;
  }

  @media (max-width: 480px) {
    font-size: 5px;
  }
`;
