"use client";

import Flex from "lib/atoms/Flex";
import styled from "styled-components";
import React from "react";
import Image from "next/image";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowIcon from "/imports/Home/ui/assets/ArrowIcon";

const Explore = () => {
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

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    swipeToSlide: true,
    touchThreshold: 10,
    adaptiveHeight: true,
    nextArrow: <ArrowButton />,
    prevArrow: <ArrowButton />,
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 6, slidesToScroll: 4 } },
      { breakpoint: 1280, settings: { slidesToShow: 5, slidesToScroll: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 3 } },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.15,
          slidesToScroll: 1,
          // arrows: false,
          // dots: true,
          centerMode: true,
          centerPadding: "12px",
        },
      },
    ],
  };

  return (
    <Div>
      <HeaderText>
        Explore and Learn
        <span> AI Tools</span>
      </HeaderText>

      <Slider className="Slider" {...settings}>
        {Array.from({ length: 50 }).map((_, index) => (
          <Card key={index} style={{ padding: "0 6.5px" }}>
            <div
              style={{
                borderRadius: 12,
                overflow: "hidden",
                transform: "translateZ(0)",
              }}
            >
              <img
                src={"/static/filmCard.png"}
                alt={`Slide ${index}`}
                style={{
                  width: "100%",
                  display: "block",
                  borderRadius: 12,
                  transition: "transform 200ms ease",
                }}
              />
              <Video>
                <AvatarWrapper>
                  <Image
                    src="/static/avtar.jpg"
                    width={24}
                    height={24}
                    alt="Avatar"
                  />
                </AvatarWrapper>
                <Name>James Smith</Name>
              </Video>
            </div>
          </Card>
        ))}
      </Slider>
    </Div>
  );
};

export default Explore;

const Div = styled.div`
  position: relative;
  padding: 0 40px;
  background-color: black;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const HeaderText = styled.div`
  font-family: "HelveticaRegular";
  font-size: 34px;
  line-height: 1.2;
  letter-spacing: -1.7px;
  padding: 24px 0 24px 0;
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

const Card = styled.div`
  width: 259.7px;
  padding: 0 6.5px 0 6.5px;
  border-radius: 22.7px;
  position: relative;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: auto; /* let Slick determine width for smaller screens */
    border-radius: 16px;
  }
`;

const Video = styled(Flex)`
  position: absolute;
  left: clamp(6px, 2vw, 12px);
  bottom: clamp(6px, 2vw, 12px);
  padding: 4px 6px;
  align-items: center;
  gap: 6px;
  border-radius: 24px;
  -webkit-backdrop-filter: blur(11.6px);
  backdrop-filter: blur(11.6px);
  border: solid 0.4px rgba(255, 255, 255, 0.2);
  background-color: rgba(0, 0, 0, 0.36);
  white-space: nowrap;

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
  width: 114px;
  height: 100%;
  z-index: 2;
  border: none;
  cursor: pointer;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);

  padding-left: ${({ $side }) => ($side === "left" ? "63px" : "35px")};
  padding-right: ${({ $side }) => ($side === "left" ? "35px" : "63px")};
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 1.7) 0%,
    rgba(0, 0, 0, 0) 100%
  );

  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0)
  );

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    transform: ${({ $side }) => ($side === "left" ? "scaleX(-1)" : "none")};
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.35));
  }

  @media (max-width: 768px) {
    width: 56px;
  }

  @media (max-width: 640px) {
    display: none;
  }
`;
