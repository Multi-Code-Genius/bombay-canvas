"use client";
import Flex from "lib/atoms/Flex";
import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import PlayButtonIcon from "imports/Home/ui/assets/PlayButtonIcon";
import VideoPlayer from "../components/VideoPlayer";
import Header from "imports/core/ui/atoms/Header";
import { useRouter } from "next/navigation";
import { useMoviesDataById } from "api/movies";
import Loading from "imports/common/components/Loading";

const VideoPage = ({ videoId }) => {
  const router = useRouter();
  const [playing, setPlaying] = useState(false);
  const [activeEpisode, setActiveEpisode] = useState(false);

  const { data, isFetching, isLoading } = useMoviesDataById(videoId);

  useEffect(() => {
    setActiveEpisode(data?.movie?.episodes?.[0]);
  }, [data, isFetching]);

  const handlerCreator = (_e, i = 1) => {
    router.push(`/creator/${data?.movie?.uploader?.id || i}`);
  };

  return (
    <Fragment>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <Frame>
          <VideoWrapper>
            <VideoPlayer
              episode={activeEpisode ?? data?.movie?.episodes?.[0]}
              movie={data?.movie}
              playing={playing}
              setPlaying={setPlaying}
            />
          </VideoWrapper>
          <RightSection $isBlur={playing}>
            <MovieInfo>
              <Content>
                <Above>
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
                    elit.Suspendisse varius enim in eros elementum tristique.
                    orem ipsum dolor sit amet, consectetur adipiscing
                    elit.Suspendisse varius enim in eros elementum tristique.
                  </Description>
                </Above>
              </Content>
              <Genres>
                <Creator>
                  <By>By</By>{" "}
                  <InfoCta onClick={() => handlerCreator()}>
                    <AvatarWrapper>
                      <Image
                        src="/static/avtar.jpg"
                        width={24}
                        height={24}
                        alt="Avatar"
                        unoptimized
                      />
                    </AvatarWrapper>

                    <Name>{data?.movie?.uploader?.name}</Name>
                  </InfoCta>
                </Creator>
                <GenresText>
                  <div>Genres: </div>
                  {data?.movie?.genres.map((g, i) => (
                    <span key={g.id || i}>
                      {g.name}
                      {i < data.movie.genres.length - 1 && ", "}
                    </span>
                  ))}
                </GenresText>
              </Genres>
            </MovieInfo>
            <Div>
              {data?.movie?.episodes?.length > 0 && (
                <EpisodeTitle>Episodes</EpisodeTitle>
              )}
              <EpisodeBoxWrapper>
                {data?.movie?.episodes?.map((e, index) => {
                  return (
                    <EpisodeBox
                      key={index}
                      $active={activeEpisode?.episodeNo === e.episodeNo}
                    >
                      <InnerContent>
                        <NumberWrapper>
                          <Number>{index + 1}</Number>
                          <MovieCard>
                            <Ellipse
                              onClick={() => !playing && setActiveEpisode(e)}
                            >
                              <PlayButtonIcon width={13} height={13} />
                            </Ellipse>
                          </MovieCard>
                        </NumberWrapper>
                        <TextWrapper>
                          <OfferWrapper>
                            <OffterText>{e?.title}</OffterText>
                            <Minute>{e.duration}m</Minute>
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
      )}
    </Fragment>
  );
};

export default VideoPage;

const Frame = styled(Flex)`
  justify-content: center;
  gap: 31px;
  margin: auto;

  padding-bottom: 20px;
  z-index: 10;
  position: relative;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 16px;
  }
`;
const VideoWrapper = styled(Flex)`
  width: 390px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const RightSection = styled(Flex)`
  width: 100%;
  max-width: 755px;
  flex-direction: column;
  justify-content: center;
  gap: 21px;
  opacity: ${({ $isBlur }) => ($isBlur ? "0.3" : "1")};
`;

const MovieInfo = styled(Flex)`
  width: 100%;
  align-items: flex-end;
  justify-content: space-between;
  gap: 74px;
  padding: 20px;
  border-radius: 15px;
  background-color: rgba(9, 9, 9, 0.28);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const Content = styled(Flex)`
  width: 435px;
  height: auto;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    width: 100%;
    gap: 12px;
  }
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
  min-width: 63.5px;
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

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Year = styled.div`
  font-family: "HelveticaRegular";
  font-size: 16px;
  line-height: 24px;
  color: #bcbcbc;

  @media (max-width: 480px) {
    font-size: 14px;
  }
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
  font-family: "HelveticaBold";
  font-size: 32px;
  letter-spacing: -0.44px;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 24px;
  }
  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const Description = styled.div`
  align-self: stretch;
  font-family: "HelveticaRegular";
  font-size: 18px;
  line-height: 1.44;
  color: #fff;
  margin-top: 2px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 1.4;
  }
`;

const Genres = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 137px;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    gap: 0;
  }
`;

const GenresText = styled.span`
  font-family: "HelveticaRegular";
  font-size: 14px;
  line-height: 1.43;
  color: #fff;

  div {
    color: #777;
    display: inline;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const Div = styled(Flex)`
  gap: 16px;
  flex-direction: column;
  max-height: 384px;
  padding: 20px;
  border-radius: 15px;
  background-color: rgba(9, 9, 9, 0.28);
  width: 100%;
`;

const EpisodeTitle = styled.div`
  font-family: "HelveticaMedium";
  font-size: 24px;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;
const EpisodeBox = styled(Flex)`
  width: 100%;
  flex-direction: column;
  gap: 10px;
  padding: 30px 12px 30px 16px;
  border-radius: 4px;
  background: ${({ $active }) => ($active ? "#222" : "transparent")};
`;

const InnerContent = styled(Flex)`
  width: 100%;
  gap: 14px;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1024px) {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }
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

  @media (max-width: 480px) {
    font-size: 12px;
    line-height: 1.4;
  }
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
  width: 100%;
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

  @media (max-width: 480px) {
    font-size: 18px;
    width: 40px;
  }
`;

const MovieCard = styled(Flex)`
  background: url("/static/video.jpg") center/cover no-repeat;
  width: 153px;
  height: 72px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 120px;
    height: 72px;
  }
  @media (max-width: 480px) {
    width: 100px;
    height: 60px;
  }
`;

const Ellipse = styled(Flex)`
  justify-content: center;
  align-items: center;
  width: 29.5px;
  cursor: pointer;
  height: 29.5px;
  padding-left: 2px;
  border-radius: 50%;
  -webkit-backdrop-filter: blur(9.3px);
  backdrop-filter: blur(9.3px);
  background-color: rgba(255, 255, 255, 0.24);
`;

const Creator = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0;
`;

const By = styled.span`
  font-family: "HelveticaRegular";
  font-size: 14px;
  line-height: 1.43;
  color: #777;
`;
