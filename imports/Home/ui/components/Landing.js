"use client";

import Header from "imports/core/ui/atoms/Header";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Flex from "lib/atoms/Flex";
import PlayButtonIcon from "/imports/Home/ui/assets/PlayButtonIcon";

const Landing = () => {
  return (
    <Layout>
      <Header />
      <Content>
        <Image src="/static/logo.png" alt="Logo" width={75} height={32} />
        <MainTitle
          dangerouslySetInnerHTML={{
            __html: `Lorem ipsum <span>dolor sit amet</span>`,
          }}
        />
        <Para>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.Suspendisse
          varius enim in eros elementum tristique. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.Suspendisse varius enim in
        </Para>
        <CtaWrappers>
          <Buttons>
            <PlayButtonIcon width={17} height={19} />
            Play
          </Buttons>
          <InfoCta>
            <AvatarWrapper>
              <Image
                src="/static/avtar.jpg"
                width={24}
                height={24}
                alt="Avatar"
              />
            </AvatarWrapper>

            <Name>James Smith</Name>
          </InfoCta>
        </CtaWrappers>
      </Content>
      <Range>
        <Duration>
          Duration :<span>14hr</span>
        </Duration>
      </Range>
    </Layout>
  );
};

export default Landing;

const Layout = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  padding-bottom: 45%;
  background: url("/static/card-image.png") top/cover no-repeat;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40%;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 1.7) 0%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  @media (max-width: 768px) {
    padding-bottom: 0;
    height: 70vh;
    background-position: center;
    overflow-x: hidden;

    &::after {
      height: 55%;
    }
  }

  @media (max-width: 480px) {
    min-height: 65vh;
  }
`;

const Content = styled(Flex)`
  position: absolute;
  bottom: 10%;
  left: 40px;
  flex-direction: column;
  gap: 20px;
  z-index: 1;

  @media (max-width: 768px) {
    left: 16px;
    right: 16px;
    bottom: 16px;
    gap: 14px;
    padding-bottom: env(safe-area-inset-bottom, 0);
  }

  @media (max-width: 480px) {
    gap: 12px;
    bottom: 12px;
  }
`;

const Range = styled(Flex)`
  position: absolute;
  bottom: 20%;
  right: 0;
  z-index: 1;
  width: 310px;
  padding: 27px 0px 25px 73px;
  border-right: 11px solid #ff6a00;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    display: none;
  }
`;

const MainTitle = styled.div`
  font-family: "HelveticaLight";
  font-size: 57.6px;
  letter-spacing: -2.31px;
  color: #fff;
  line-height: 1.1;
  word-break: break-word;

  span {
    display: block;
    font-family: "HelveticaBold";
  }

  @media (max-width: 768px) {
    font-size: 36px;
    letter-spacing: -1.2px;
    line-height: 1.15;
  }

  @media (max-width: 480px) {
    font-size: 28px;
    letter-spacing: -0.9px;
  }
`;

const Para = styled.div`
  font-family: "HelveticaRegular";
  font-size: 17px;
  max-width: 518px;
  color: #fff;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 15px;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    max-width: 100%;
  }
`;

const CtaWrappers = styled(Flex)`
  gap: 16px;
  margin-top: -4px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 12px;
  }
`;

const Buttons = styled(Flex)`
  width: 119.5px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 5.7px;
  color: white;
  font-family: "HelveticaMedium";
  font-size: 16px;
  padding: 8px;
  border-radius: 8px;
  line-height: 24px;
  box-shadow: -0.7px 4.3px 8.6px 0 rgba(250, 87, 0, 0.12),
    -1.4px 16.5px 16.5px 0 rgba(250, 87, 0, 0.1),
    -3.6px 36.6px 22.2px 0 rgba(250, 87, 0, 0.06),
    -5.7px 64.6px 25.8px 0 rgba(250, 87, 0, 0.02),
    -9.3px 101.1px 28.7px 0 rgba(250, 87, 0, 0),
    inset -2.9px 3.6px 5.6px 0 rgba(255, 255, 255, 0.25),
    inset -2.9px -2.9px 2.9px 0 rgba(255, 255, 255, 0.17);
  border: solid 1.4px rgba(255, 126, 55, 0.2);
  background-image: linear-gradient(136deg, #ff6a00 -11%, #ef8a4c 107%);

  @media (max-width: 768px) {
    width: auto;
    padding: 8px 12px;
    gap: 6px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 13px;
  }
`;

const InfoCta = styled(Flex)`
  min-width: 122px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 8px 0;
  border-radius: 10px;
  box-shadow: -0.7px 4.3px 8.6px 0 rgba(61, 61, 61, 0.12),
    inset -2.9px 3.6px 18.9px 0 rgba(255, 255, 255, 0.25),
    inset -2.9px -2.9px 95.7px -199px rgba(255, 255, 255, 0);
  border: solid 1.4px rgba(1, 1, 1, 0.2);
  background-image: linear-gradient(
    109deg,
    rgba(14, 14, 14, 0.71) -91%,
    #000 112%
  );
`;

const Name = styled.div`
  width: 63.5px;
  font-family: "HelveticaRegular";
  font-size: 11.6px;
  letter-spacing: -0.35px;
  color: #fff;
`;

const AvatarWrapper = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
`;

const Duration = styled.div`
  opacity: 0.8;
  font-family: "HelveticaRegular";
  font-size: 36px;
  letter-spacing: -1.8px;
  text-align: center;
  color: #fff;

  span {
    font-weight: "HelveticaMedium";
  }

  @media (max-width: 768px) {
    font-size: 24px;
    letter-spacing: -1.2px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    letter-spacing: -1px;
  }
`;
