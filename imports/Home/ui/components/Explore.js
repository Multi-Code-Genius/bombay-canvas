"use client";

import Flex from "lib/atoms/Flex";
import styled from "styled-components";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowIcon from "/imports/Home/ui/assets/ArrowIcon";
import { useRouter } from "next/navigation";
import SkeletonCard from "imports/core/ui/atoms/SkeletonCard";

const getMaxSlides = (w) => {
  if (w >= 1536) return 6;
  if (w >= 1280) return 5;
  if (w >= 1024) return 4;
  if (w >= 920) return 3;
  if (w > 424) return 2;
  return 1;
};

const Explore = ({ movieData, isLoading }) => {
  const router = useRouter();

  const [windowWidth, setWindowWidth] = useState(1200);
  useEffect(() => {
    const update = () =>
      setWindowWidth(typeof window !== "undefined" ? window.innerWidth : 1200);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  function ArrowButton({ className, onClick }) {
    const side = className?.includes("slick-prev")
      ? "left"
      : className?.includes("slick-next")
      ? "right"
      : undefined;
    const isDisabled = className?.includes("slick-disabled");
    return (
      <ArrowButtonUI
        className={className}
        data-side={side}
        $side={side}
        onClick={onClick}
        style={{ display: isDisabled ? "none" : undefined }}
      >
        <ArrowIcon />
      </ArrowButtonUI>
    );
  }

  const settings = useMemo(
    () => ({
      dots: false,

      infinite: false,
      speed: 600,
      swipe: true,
      draggable: true,
      swipeToSlide: true,
      touchMove: true,
      touchThreshold: 10,
      slidesToShow: 6,
      slidesToScroll: 1,
      centerMode: windowWidth <= 480,
      centerPadding: windowWidth <= 480 ? "60px" : "0px",
      nextArrow: <ArrowButton />,
      prevArrow: <ArrowButton />,
      responsive: [
        { breakpoint: 1536, settings: { slidesToShow: 6, slidesToScroll: 1 } },
        { breakpoint: 1280, settings: { slidesToShow: 4, slidesToScroll: 1 } },
        { breakpoint: 920, settings: { slidesToShow: 3, slidesToScroll: 1 } },
        { breakpoint: 575, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            centerMode: true,
            centerPadding: "60px",
            className: "center",
          },
        },
      ],
    }),
    [windowWidth]
  );

  const items = movieData ?? [];

  if (isLoading) {
    const skeletonCards = Array.from({ length: 15 }).map((_, index) => (
      <SkeletonCard key={index} />
    ));
    return (
      <Div>
        <HeaderText>
          Explore and Learn
          <span> AI Tools</span>
        </HeaderText>
        <SliderShell>
          <Slider className="Slider" {...settings}>
            {skeletonCards}
          </Slider>
        </SliderShell>
      </Div>
    );
  }

  return (
    <Div>
      <HeaderText>
        Explore and Learn
        <span> AI Tools</span>
      </HeaderText>

      <SliderShell>
        <Slider className="Slider" {...settings}>
          {items.map((movie, index) => (
            <Card
              $bgImage={movie?.posterUrl}
              // $bgImage={"/static/filmCard.png"}
              key={index}
              onClick={() => router.push(`/video/${movie?.id}`)}
            >
              <Video
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/creator/${movie?.uploader?.id}`);
                }}
              >
                <AvatarWrapper>
                  <Image
                    src={"/static/avtar.jpg"}
                    width={24}
                    height={24}
                    alt="Avatar"
                  />
                </AvatarWrapper>
                <Name>{movie?.uploader?.name}</Name>
              </Video>
            </Card>
          ))}
        </Slider>
      </SliderShell>
    </Div>
  );
};

export default Explore;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0 40px;
  background-color: black;
  gap: 24px;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 0 8px;
    gap: 14px;
  }
`;

const HeaderText = styled.div`
  font-family: "HelveticaRegular";
  font-size: 34px;
  line-height: 1.2;
  letter-spacing: -1.7px;
  color: #fff;
  span {
    font-family: "HelveticaBold";
  }
  @media (max-width: 768px) {
    font-size: 24px;
    letter-spacing: -1px;
    padding: 16px 0;
  }
  @media (max-width: 480px) {
    font-size: 20px;
    letter-spacing: -0.8px;
    padding: 12px 0 16px 0;
  }
`;

const SliderShell = styled.div`
  .slick-list {
    margin: 0 -6px;
  }
  .slick-slide > div {
    padding: 0 6px;
  }
`;

const Card = styled.div`
  width: 100%;
  height: 414px;
  position: relative;
  cursor: pointer;
  border-radius: 22px;
  overflow: hidden;
  background-image: ${({ $bgImage }) => `url(${$bgImage})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  @media (max-width: 1280px) {
    height: 360px;
  }
  @media (max-width: 1024px) {
    height: 300px;
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
  }
  @media (max-width: 480px) {
    gap: 4px;
  }
`;

const AvatarWrapper = styled.div`
  width: clamp(20px, 3.5vw, 24px);
  height: clamp(20px, 3.5vw, 24px);
  border-radius: 50%;
  overflow: hidden;
`;

const Name = styled.div`
  font-family: "HelveticaRegular";
  font-size: clamp(10px, 2.8vw, 12px);
  letter-spacing: -0.35px;
  color: #fff;
  padding-right: 2px;
  line-height: 1.42;
`;

const ArrowButtonUI = styled.button`
  width: 70px;
  height: 100%;
  z-index: 2;
  border: 0;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: 10px;

  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: ${({ $side }) =>
      $side === "left"
        ? "linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.12) 80%)"
        : "linear-gradient(270deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.12) 80%)"};
  }

  &:hover::before {
    opacity: 1;
  }
  &:active::before {
    opacity: 1;
  }

  svg {
    transform: ${({ $side }) => ($side === "left" ? "scaleX(-1)" : "none")};
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.35));
  }

  @media (max-width: 920px) {
    display: none;
  }
`;

const ScrollRow = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 8px;
  &::-webkit-scrollbar {
    display: none;
  }
  > div {
    flex: 0 0 auto;
    scroll-snap-align: start;
  }
`;
