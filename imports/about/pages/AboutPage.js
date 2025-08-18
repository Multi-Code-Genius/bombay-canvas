"use client";
import Flex from "lib/atoms/Flex";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import PlayButtonIcon from "imports/Home/ui/assets/PlayButtonIcon";
import VideoPlayer from "../components/VideoPlayer";
import Header from "imports/core/ui/atoms/Header";

const AboutPage = () => {
  return (
    <>
      <Header />
      <Frame>
        <VideoWrapper>
          <VideoPlayer />
        </VideoWrapper>
        <RightSection>
          <MovieInfo>
            <Content>
              <Above>
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
                <VideoQuolity>
                  <Episode>Episode 1</Episode>
                  <Year>2024</Year>
                  <Quality>
                    <HD>HD</HD>
                  </Quality>
                </VideoQuolity>
                <Lable>
                  <Text>Lorem ipsum</Text>
                </Lable>
                <Description>
                  Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit.Suspendisse varius enim in eros elementum tristique. orem
                  ipsum dolor sit amet, consectetur adipiscing elit.Suspendisse
                  varius enim in eros elementum tristique.
                </Description>
              </Above>
            </Content>
            <Genres>
              <GenresText>
                <span>Genres: </span>
                Lorem , dolor, ipsum dolor
              </GenresText>
            </Genres>
          </MovieInfo>
          <Div>
            <EpisodeTitle>Episodes</EpisodeTitle>
            <EpisodeBoxWrapper>
              {Array.from({ length: 6 }).map((_, index) => {
                return (
                  <EpisodeBox $active={index === 0}>
                    <InnerContent>
                      <NumberWrapper>
                        <Number>{index + 1}</Number>
                        <MovieCard>
                          <Ellipse>
                            <PlayButtonIcon width={13} height={13} />
                          </Ellipse>
                        </MovieCard>
                      </NumberWrapper>
                      <TextWrapper>
                        <OfferWrapper>
                          <OffterText>The Offer</OffterText>
                          <Minute>55m</Minute>
                        </OfferWrapper>

                        <LargeText>
                          lLorem ipsum dolor sit amet, consectetur adipiscing
                          eLorem ipsum dolor sit amet, consectetur adipiscing
                          elit.Suspendisse varius enim in eros
                        </LargeText>
                      </TextWrapper>
                    </InnerContent>
                  </EpisodeBox>
                );
              })}
            </EpisodeBoxWrapper>
          </Div>
        </RightSection>
      </Frame>
    </>
  );
};

export default AboutPage;

const Frame = styled(Flex)`
  justify-content: center;
  gap: 31px;
  margin: auto;
  padding-top: 16px;
  padding-bottom: 63px;
  /* background-color: white; */
`;

const VideoWrapper = styled(Flex)`
  width: 463px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* margin: 0 26px 27px 25.5px; */
`;

const RightSection = styled(Flex)`
  flex-direction: column;
  /* width: 824px; */
  justify-content: center;
  align-items: center;
  gap: 21px;
`;

const MovieInfo = styled(Flex)`
  align-items: flex-end;
  gap: 95px;
  padding: 20px;
  border-radius: 15px;
  background-color: rgba(9, 9, 9, 0.28);
`;

const Content = styled(Flex)`
  width: 435px;
  height: 248px;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
  padding: 0;
`;

const Above = styled(Flex)`
  flex-direction: column;
  gap: 14px;
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

  @media (max-width: 768px) {
    width: auto;
    padding: 6px 10px;
    gap: 6px;
  }
`;

const Name = styled.div`
  width: 63.5px;
  font-family: "HelveticaRegular";
  font-size: 11.6px;
  line-height: 24px;
  letter-spacing: -0.35px;
  color: #fff;

  @media (max-width: 768px) {
    width: auto;
    font-size: 11px;
  }

  @media (max-width: 480px) {
    font-size: 10.5px;
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

const VideoQuolity = styled(Flex)`
  align-items: center;
  gap: 8px;
`;

const Episode = styled.div`
  font-family: "HelveticaBold";
  font-size: 16px;
  color: #bcbcbc;
`;

const Year = styled.div`
  font-family: "HelveticaRegular";
  font-size: 16px;
  line-height: 24px;
  color: #bcbcbc;
`;
const Quality = styled(Flex)`
  height: 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 7px 6.5px;
  border-radius: 4px;
  border: solid 1px #808080;
`;

const HD = styled.span`
  font-family: "HelveticaRegular";
  font-size: 11px;
  line-height: 24px;
  color: #e5e5e5;
`;

const Lable = styled(Flex)`
  align-items: center;
  gap: 10.4px;
`;

const Text = styled.span`
  width: 184px;
  font-family: "HelveticaBold";
  font-size: 32px;
  letter-spacing: -0.44px;
  color: #fff;
`;

const Description = styled.div`
  align-self: stretch;
  font-family: "HelveticaRegular";
  font-size: 18px;
  line-height: 1.44;
  color: #fff;
  margin-top: 2px;
`;

const Genres = styled(Flex)`
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 14px;
`;

const GenresText = styled.span`
  font-family: "HelveticaRegular";
  font-size: 14px;
  line-height: 1.43;
  color: #fff;

  span {
    color: #777;
  }
`;

const Div = styled(Flex)`
  gap: 16px;
  flex-direction: column;
  max-height: 509px;

  padding: 20px 20px 42px 20px;
  border-radius: 15px;
  background-color: rgba(9, 9, 9, 0.28);
`;

const EpisodeTitle = styled.div`
  width: 488px;
  height: 29px;
  flex-grow: 0;
  font-family: "HelveticaMedium";
  font-size: 24px;
  color: #fff;
`;
const EpisodeBox = styled(Flex)`
  /* width: 714px; */
  flex-direction: column;
  gap: 10px;
  padding: 16px 40px 16px 16px;
  border-radius: 4px;
  background: ${({ $active }) => ($active ? "#222" : "transparent")};
`;

const InnerContent = styled(Flex)`
  width: 670px;
  gap: 14px;
  align-items: center;
  padding: 15px 0;
`;

const OffterText = styled.span`
  font-family: "HelveticaRegular";
  font-size: 16px;
  color: #fff;
`;
const LargeText = styled.span`
  font-family: "HelveticaRegular";
  font-size: 14px;
  line-height: 1.43;
  color: #d2d2d2;
`;

const Minute = styled.div`
  font-family: "HelveticaRegular";
  font-size: 16px;
  text-align: right;
  color: #fff;
`;

const EpisodeBoxWrapper = styled(Flex)`
  flex-direction: column;
  overflow-y: auto;
`;

const OfferWrapper = styled(Flex)`
  justify-content: space-between;
  width: 100%;
`;
const TextWrapper = styled(Flex)`
  flex-direction: column;
`;
const NumberWrapper = styled(Flex)`
  align-items: center;
`;
const Number = styled.span`
  width: 51px;
  font-family: "HelveticaRegular";
  font-size: 24px;
  line-height: 1.25;
  text-align: center;
  color: #dcdcdc;
`;

const MovieCard = styled(Flex)`
  background: url("/static/video.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 153px;
  justify-content: center;
  align-items: center;
  padding: 21px 12px 21px 12px;
  border-radius: 8px;
  background-color: #3a3a3a;
  position: relative;
`;

const Ellipse = styled(Flex)`
  justify-content: center;
  align-items: center;
  width: 29.5px;
  height: 29.5px;
  padding-left: 2px;
  border-radius: 50%;
  -webkit-backdrop-filter: blur(9.3px);
  backdrop-filter: blur(9.3px);
  background-color: rgba(255, 255, 255, 0.24);
`;
