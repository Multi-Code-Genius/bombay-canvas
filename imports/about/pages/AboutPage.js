"use client";
import Flex from "lib/atoms/Flex";
import React from "react";
import styled from "styled-components";
import Image from "next/image";

const AboutPage = () => {
  return (
    <Frame>
      <VideoWrapper>
        <Story></Story>
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
            <EpisodeBox>
              <InnerContent>
                <NumberWrapper>
                  <Number>1</Number>
                  <MovieCard class="MovieCard"></MovieCard>
                </NumberWrapper>
                <TextWrapper>
                  <OfferWrapper>
                    <OffterText>The Offer</OffterText>
                    <Minute>55m</Minute>
                  </OfferWrapper>

                  <LargeText>
                    lLorem ipsum dolor sit amet, consectetur adipiscing eLorem
                    ipsum dolor sit amet, consectetur adipiscing
                    elit.Suspendisse varius enim in eros
                  </LargeText>
                </TextWrapper>
              </InnerContent>
            </EpisodeBox>
            <EpisodeBox>
              <InnerContent>
                <NumberWrapper>
                  <Number>1</Number>
                  <MovieCard class="MovieCard"></MovieCard>
                </NumberWrapper>
                <TextWrapper>
                  <OfferWrapper>
                    <OffterText>The Offer</OffterText>
                    <Minute>55m</Minute>
                  </OfferWrapper>

                  <LargeText>
                    lLorem ipsum dolor sit amet, consectetur adipiscing eLorem
                    ipsum dolor sit amet, consectetur adipiscing
                    elit.Suspendisse varius enim in eros
                  </LargeText>
                </TextWrapper>
              </InnerContent>
            </EpisodeBox>
            <EpisodeBox>
              <InnerContent>
                <NumberWrapper>
                  <Number>1</Number>
                  <MovieCard class="MovieCard"></MovieCard>
                </NumberWrapper>
                <TextWrapper>
                  <OfferWrapper>
                    <OffterText>The Offer</OffterText>
                    <Minute>55m</Minute>
                  </OfferWrapper>

                  <LargeText>
                    lLorem ipsum dolor sit amet, consectetur adipiscing eLorem
                    ipsum dolor sit amet, consectetur adipiscing
                    elit.Suspendisse varius enim in eros
                  </LargeText>
                </TextWrapper>
              </InnerContent>
            </EpisodeBox>{" "}
          </EpisodeBoxWrapper>
        </Div>
      </RightSection>
    </Frame>
  );
};

export default AboutPage;

const Frame = styled(Flex)`
  width: 1248.6px;
  align-items: center;
  gap: 31px;
  margin: 136px 95.4px 0 96px;
  padding: 0;
`;

const VideoWrapper = styled(Flex)`
  width: 412.1px;
  height: 770.5px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0 26px 27px 25.5px;
  padding: 0;
`;

const Story = styled.div`
  width: 463.6px;
  height: 824.2px;
  flex-grow: 0;
  padding: 26.6px 0 0;
  transform: rotate(-180deg);
  border-radius: 15px;
  border: solid 8px rgba(0, 0, 0, 0.14);
  background-color: #fff;
`;

const RightSection = styled(Flex)`
  height: 824px;
  flex-grow: 1;
  flex-direction: column;
  align-items: stretch;
  gap: 21px;
  padding: 0;
`;

const MovieInfo = styled(Flex)`
  height: 294px;
  align-self: stretch;
  align-items: flex-end;
  gap: 74px;
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
  height: 128px;
  align-self: stretch;
  flex-direction: column;
  gap: 14px;
  padding: 0;
`;

const InfoCta = styled(Flex)`
  width: 122px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 7px 0;
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
  width: 482px;

  align-items: center;
  gap: 8px;
  padding: 0;
`;

const Episode = styled.div`
  width: 69px;

  font-family: "HelveticaBold";
  font-size: 16px;
  color: #bcbcbc;
`;

const Year = styled.div`
  width: 36px;

  font-family: "HelveticaRegular";
  font-size: 16px;
  color: #bcbcbc;
`;
const Quality = styled(Flex)`
  width: 29px;
  height: 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 7px 6.5px;
  border-radius: 4px;
  border: solid 1px #808080;
`;

const HD = styled.span`
  width: 16px;

  font-family: "HelveticaRegular";
  font-size: 11px;
  color: #e5e5e5;
`;

const Lable = styled(Flex)`
  width: 245px;

  align-items: center;
  gap: 10.4px;
  padding: 0;
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
`;

const Genres = styled.div`
  width: 206px;
  height: 254px;
  flex-grow: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 14px;
  padding: 0;
`;

const GenresText = styled.span`
  width: 206px;
  height: 20px;
  flex-grow: 0;
  font-family: "HelveticaRegular";
  font-size: 14px;
  line-height: 1.43;
  color: #fff;

  span {
    color: #777;
  }
`;

const Div = styled.div`
  height: 509px;
  align-self: stretch;
  flex-grow: 0;
  padding: 20px 47px 42px 20px;
  border-radius: 15px;
  background-color: rgba(9, 9, 9, 0.28);
`;

const EpisodeTitle = styled.div`
  width: 488px;
  height: 29px;
  flex-grow: 0;
  font-family: "HelveticaMedium";
  font-size: 24px;

  text-align: left;
  color: #fff;
`;
const EpisodeBox = styled(Flex)`
  .Frame-144 {
    width: 714px;
    height: 134px;
    flex-direction: column;
    gap: 10px;
    padding: 16px 40px 16px 16px;
    border-radius: 4px;
    background-color: #222;
  }
`;

const InnerContent = styled(Flex)`
  width: 670px;
  height: 102px;
  gap: 14px;
  align-items: center;
  padding: 0;
`;

const OffterText = styled.span`
  width: 140px;
  height: 24px;
  flex-grow: 0;
  font-family: "HelveticaRegular";
  font-size: 16px;
  color: #fff;
`;
const LargeText = styled.span`
  height: 40px;
  flex-grow: 1;
  font-family: "HelveticaRegular";
  font-size: 14px;
  line-height: 1.43;
  color: #d2d2d2;
`;

const Minute = styled.div`
  width: 35px;
  height: 24px;
  flex-grow: 0;
  font-family: "HelveticaRegular";
  font-size: 16px;
  text-align: right;
  color: #fff;
`;

const EpisodeBoxWrapper = styled(Flex)`
  flex-direction: column;
`;

const OfferWrapper = styled(Flex)`
  justify-content: space-between;
  width: 100%;
`;
const TextWrapper = styled(Flex)`
  flex-direction: column;
`;
const NumberWrapper = styled(Flex)`
  width: 204px;
  height: 72px;
  align-items: center;
  padding: 0;
`;
const Number = styled.span`
  width: 51px;
  height: 29px;
  flex-grow: 0;
  font-family: "HelveticaRegular";
  font-size: 24px;

  line-height: 1.25;
  text-align: center;
  color: #dcdcdc;
`;

const MovieCard = styled.div`
  width: 153px;
  height: 72px;
  flex-grow: 0;
  padding: 0 12px 0 13px;
  border-radius: 8px;
  background-color: #3a3a3a;
`;
