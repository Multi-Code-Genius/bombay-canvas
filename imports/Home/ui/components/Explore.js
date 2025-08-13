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
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 4,
    nextArrow: <ArrowButton />,
    prevArrow: <ArrowButton />,
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 6, slidesToScroll: 4 } },
      { breakpoint: 1280, settings: { slidesToShow: 5, slidesToScroll: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 2.2, slidesToScroll: 2 } },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1.3, slidesToScroll: 1, arrows: false },
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
  padding-left: 40px;
  background-color: black;

  @media (max-width: 768px) {
    padding-left: 16px;
    padding-right: 16px;
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
    font-weight: "HelveticaBold";
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
  left: 10.3px;
  bottom: 10.2px;
  width: 109px;
  padding: 2.5px;
  align-items: center;
  gap: 5px;
  border-radius: 27.7px;
  -webkit-backdrop-filter: blur(11.6px);
  backdrop-filter: blur(11.6px);
  border: solid 0.4px rgba(255, 255, 255, 0.2);
  background-color: rgba(0, 0, 0, 0.36);

  @media (max-width: 768px) {
    left: 8px;
    bottom: 8px;
    width: 95px;
    gap: 4px;
    border-radius: 22px;
  }

  @media (max-width: 480px) {
    left: 6px;
    bottom: 6px;
    width: 85px;
  }
`;

const AvatarWrapper = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 22px;
    height: 22px;
  }

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
  }
`;

const Name = styled.div`
  width: 63.5px;
  font-family: "HelveticaRegular";
  font-size: 11.6px;
  letter-spacing: -0.35px;
  color: #fff;

  padding: 0 0.9px 0 0;
  line-height: 1.42;
  letter-spacing: -0.35px;

  @media (max-width: 768px) {
    font-size: 10.5px;
    width: auto;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const ArrowButtonUI = styled.button`
  width: 114px;
  height: 100%;
  z-index: 2;
  border: none;
  cursor: pointer;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  background-image: linear-gradient(272deg, #000 133%, rgba(0, 0, 0, 0.14) 8%);
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.72)
  );

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    transform: ${({ $side }) => ($side === "left" ? "scaleX(-1)" : "none")};
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.35));
  }

  @media (max-width: 768px) {
    width: 64px;
  }

  @media (max-width: 480px) {
    width: 48px;
  }

  @media (max-width: 400px) {
    display: none; /* rely on swipe on very small screens */
  }
`;
