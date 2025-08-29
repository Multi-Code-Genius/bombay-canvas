"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Pause, VolumeOff, VolumeXIcon } from "lucide-react";
import SideButtonLeftIcon from "../assets/SideButtonLeftIcon";
import SideButtonRightIcon from "../assets/SideButtonRightIcon";
import PlayIcon from "../assets/PlayIcon";
import VolumeIcon from "../assets/VolumeIcon";
import Hls from "hls.js";

export default function VideoPlayer({ episode, movie, playing, setPlaying }) {
  const videoRef = useRef(null);

  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    const video = videoRef.current;

    if (!video) return;

    if (playing) {
      video.pause();
    } else {
      video.play();
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress(
        (videoRef.current.currentTime / videoRef.current.duration) * 100
      );
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const seek = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    if (videoRef.current && episode?.videoUrl) {
      if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = episode?.videoUrl;
      } else if (Hls.isSupported()) {
        const hls = new Hls();
        hls?.loadSource(episode?.videoUrl);
        hls?.attachMedia(videoRef.current);

        return () => {
          hls.destroy();
        };
      }
    }
  }, [movie]);

  return (
    <Container $playing={playing}>
      <StyledVideo
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        muted={muted}
        preload="auto"
        src={episode?.videoUrl}
        poster={movie?.posterUrl ?? "/static/videoImage.png"}
        ref={videoRef}
      />

      <Controls className="controls">
        <SideButtonLeft onClick={() => seek(-10)}>
          <SideButtonLeftIcon />
        </SideButtonLeft>

        <CenterButton onClick={togglePlay}>
          {playing ? <PauseIcon /> : <PlayIcon />}
        </CenterButton>

        <SideButtonRight onClick={() => seek(10)}>
          <SideButtonRightIcon />
        </SideButtonRight>

        <MuteButton onClick={toggleMute}>
          {muted ? <VolumeXIcon /> : <VolumeIcon />}
        </MuteButton>

        <BottomControls>
          <ProgressBar
            min="0"
            max="100"
            value={progress}
            style={{
              "--progress": `${progress}%`,
            }}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              if (videoRef.current) {
                const newTime = (val / 100) * videoRef.current.duration;
                videoRef.current.currentTime = newTime;
              }
            }}
          />
          <TimeText>
            {formatTime(videoRef.current?.currentTime || 0)}/
            {formatTime(duration)}
          </TimeText>
        </BottomControls>
      </Controls>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;

  .controls {
    opacity: ${({ $playing }) => ($playing ? "0" : "1")};
    transition: opacity 0.3s ease;
  }

  &:hover .controls {
    opacity: 1;
  }
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Controls = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;

  > * {
    pointer-events: auto;
  }
`;

const CenterButton = styled.button`
  position: absolute;
  cursor: pointer;
  background: transparent;
  border: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PauseIcon = styled(Pause)`
  width: 50px;
  height: 50px;
  color: white;
`;

const SideButtonLeft = styled.button`
  position: absolute;
  top: 50%;
  left: 15%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: white;
  font-size: 24px;
`;

const SideButtonRight = styled.button`
  position: absolute;
  top: 50%;
  right: 15%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: white;
  font-size: 24px;
`;

const MuteButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  color: white;
`;

const MutedIcon = styled(VolumeOff)`
  width: 30px;
  height: 30px;
  color: white;
`;

const UnmutedIcon = styled(MutedIcon)``;

const BottomControls = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProgressBar = styled.input.attrs({ type: "range" })`
  flex: 1;
  height: 4px;
  border-radius: 2px;
  appearance: none;
  background: linear-gradient(
    to right,
    white 0%,
    white var(--progress, 0%),
    #808080 var(--progress, 0%),
    #808080 100%
  );

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const TimeText = styled.span`
  font-size: 14px;
  color: white;
`;
