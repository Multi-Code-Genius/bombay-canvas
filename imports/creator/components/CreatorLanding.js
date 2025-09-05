"use client";

import Header from "imports/core/ui/atoms/Header";
import React from "react";
import styled from "styled-components";
import Flex from "lib/atoms/Flex";
import YoutubeIcon from "imports/creator/assets/YoutubeIcon";
import InstagramIcon from "imports/creator/assets/InstagramIcon";

const CreatorLanding = ({ data }) => {
  return (
    <Layout>
      <Header />
      <Content>
        <MainTitle>{data?.creator?.name}</MainTitle>
        <Para>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.Suspendisse
          varius enim in eros elementum tristique.
        </Para>
        <CtaWrappers>
          <Buttons>
            <Wrapper>
              <InstagramIcon />
              <Text>Instagram</Text>
            </Wrapper>
          </Buttons>
          <Buttons>
            <Wrapper>
              <YoutubeIcon />
              <Text>Youtube</Text>
            </Wrapper>
          </Buttons>
        </CtaWrappers>
      </Content>
    </Layout>
  );
};

export default CreatorLanding;

const Layout = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  padding-bottom: 43.5%;
  background: url("/static/creator.png") no-repeat;
  background-size: cover;
  background-position: center;

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

    &::after {
      height: 55%;
    }
  }

  @media (max-width: 480px) {
    min-height: 65vh;
    height: 75vh;
  }
`;

const Content = styled(Flex)`
  position: absolute;
  bottom: 10%;
  left: 40px;
  flex-direction: column;
  gap: 23.2px;
  z-index: 3;

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

const MainTitle = styled.div`
  flex-grow: 0;
  opacity: 0.9;
  font-family: "HelveticaBold";
  font-size: 40px;
  letter-spacing: -2px;
  text-align: center;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 30px;
    letter-spacing: -0.9px;
    line-height: 1.15;
  }
`;

const Para = styled.div`
  font-family: "HelveticaRegular";
  max-width: 518px;
  color: #fff;
  opacity: 0.4;
  font-size: 23.4px;

  @media (max-width: 768px) {
    font-size: 12px;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    font-size: 12px;
  }
`;

const CtaWrappers = styled.div`
  display: flex;
  gap: 16px;
  margin-top: -7.2px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 12px;
  }
`;

const Buttons = styled.div`
  width: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 10px;

  padding: 9px 32px;
  border-radius: 10px;
  box-shadow: -0.7px 4.3px 8.6px 0 rgba(61, 61, 61, 0.12),
    inset -2.9px 3.6px 18.9px 0 rgba(255, 255, 255, 0.25),
    inset -2.9px -2.9px 95.7px -199px rgba(255, 255, 255, 0);
  border: solid 1.4px rgba(1, 1, 1, 0.2);
  background-image: linear-gradient(
    108deg,
    rgba(14, 14, 14, 0.71) -91%,
    #000 112%
  );

  @media (max-width: 768px) {
    width: 94px;
    padding: 7px 8px;
    gap: 6px;
    font-size: 14px;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 13px;
  }
`;

const Wrapper = styled(Flex)`
  min-width: 87.6px;
  align-items: center;
  gap: 4.6px;
  padding: 0;
  opacity: 0.9;

  @media (max-width: 768px) {
    justify-content: center;

    svg {
      width: 15px;
      height: 15px;
    }
  }
`;

const Text = styled.div`
  min-width: 63px;
  opacity: 0.9;
  font-family: "HelveticaMedium";
  font-size: 15px;
  letter-spacing: -0.5px;
  text-align: center;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 12px;
    text-align: left;
    min-width: fit-content;
  }
`;
