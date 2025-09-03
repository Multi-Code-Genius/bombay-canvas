"use client";

import Flex from "lib/atoms/Flex";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowIcon from "/imports/Home/ui/assets/ArrowIcon";
import { useRouter } from "next/navigation";
import SkeletonCard from "imports/core/ui/atoms/SkeletonCard";

const getSlidesSettings = (width) => {
  if (width < 640) return { slidesToShow: 1, slidesToScroll: 1 };
  if (width < 768) return { slidesToShow: 2, slidesToScroll: 2 };
  if (width < 1024) return { slidesToShow: 3, slidesToScroll: 3 };
  if (width < 1280) return { slidesToShow: 3, slidesToScroll: 3 };
  if (width < 1536) return { slidesToShow: 4, slidesToScroll: 4 };
  return { slidesToShow: 5, slidesToScroll: 5 };
};

const Explore = ({ movieData, isLoading }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
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

  const router = useRouter();

  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const updateSettings = () => {
      const width = window.innerWidth;
      const { slidesToShow, slidesToScroll } = getSlidesSettings(width);

      const isSmallScreen = width <= 768;

      setSettings({
        dots: false,
        infinite: false,
        speed: 1500,
        adaptiveHeight: true,
        touchThreshold: 10,

        swipe: isSmallScreen,
        draggable: isSmallScreen,
        swipeToSlide: isSmallScreen,
        touchMove: isSmallScreen,

        slidesToShow: isSmallScreen ? 1 : slidesToShow,
        slidesToScroll: isSmallScreen ? 1 : slidesToScroll,

        centerMode: isSmallScreen,
        centerPadding: isSmallScreen ? "20px" : "0px",

        nextArrow: <ArrowButton />,
        prevArrow: <ArrowButton />,

        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true,
              centerPadding: "0px",
            },
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true,
              centerPadding: "20px",
            },
          },
        ],
      });
    };

    updateSettings();
    window.addEventListener("resize", updateSettings);
    return () => window.removeEventListener("resize", updateSettings);
  }, []);

  const handlerCreator = (e, i) => {
    e.stopPropagation();
    router.push(`/creator/${i}`);
  };

  if (!settings) return null;

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

        {isMobile ? (
          <ScrollRow>{skeletonCards}</ScrollRow>
        ) : (
          <Slider className="Slider" {...settings}>
            {skeletonCards}
          </Slider>
        )}
      </Div>
    );
  }

  return (
    <Div>
      <HeaderText>
        Explore and Learn
        <span> AI Tools</span>
      </HeaderText>

      {isMobile ? (
        <ScrollRow>
          {movieData?.map((movie, index) => (
            <Card
              $bgImage={movie?.posterUrl}
              key={index}
              onClick={() => router.push(`/video/${movie?.id}`)}
            >
              <Video onClick={(e) => handlerCreator(e, movie?.uploader?.id)}>
                <AvatarWrapper>
                  <AvatarImage
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
        </ScrollRow>
      ) : (
        <Slider className="Slider" {...settings}>
          {movieData?.map((movie, index) => {
            return (
              <Card
                $bgImage={movie?.posterUrl}
                key={index}
                onClick={() => router.push(`/video/${movie?.id}`)}
              >
                <Video onClick={(e) => handlerCreator(e, movie?.uploader?.id)}>
                  <AvatarWrapper>
                    <Image
                      src={"/static/avtar.jpg"}
                      width={24}
                      height={24}
                      alt="Avatar"
                      unoptimized
                    />
                  </AvatarWrapper>
                  <Name>{movie?.uploader?.name}</Name>
                </Video>
              </Card>
            );
          })}
        </Slider>
      )}
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
    padding: 0 16px;
    gap: 14px;
  }

  @media (max-width: 480px) {
    gap: 8.5px;
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
    font-size: 16px;
    letter-spacing: -3%;
    padding: 5px 0;
  }
`;

const Card = styled.div`
  width: 100%;
  height: 413px;
  position: relative;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  background-image: ${({ $bgImage }) => `url(${$bgImage})`};

  background-repeat: no-repeat;
  background-size: cover;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 195px;
    height: 310px;
  }

  @media (max-width: 640px) {
    width: 100%;
    max-width: 195px;
    height: 310px;
  }

  @media (max-width: 425px) {
    width: 100%;
    max-width: 100px;
    height: 160px;
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
    padding: 4px;
    gap: 4px;
    border-radius: 10px;
  }
`;

const AvatarImage = styled(Image)`
  width: 24px;
  height: 24px;

  @media (max-width: 480px) {
    width: 14px !important;
    height: 14px !important;
  }
`;

const AvatarWrapper = styled.div`
  width: clamp(20px, 3.5vw, 24px);
  height: clamp(20px, 3.5vw, 24px);
  border-radius: 50%;
  overflow: hidden;

  @media (max-width: 480px) {
    width: 14px;
    height: 14px;
  }
`;

const Name = styled.div`
  font-family: "HelveticaRegular";
  font-size: clamp(10px, 2.8vw, 12px);
  letter-spacing: -0.35px;
  color: #fff;
  padding-right: 2px;
  line-height: 1.42;

  @media (max-width: 480px) {
    font-size: 7px;
  }
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

  svg {
    transform: ${({ $side }) => ($side === "left" ? "scaleX(-1)" : "none")};
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.35));
  }

  @media (max-width: 768px) {
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
