"use client";

import { useRef, useState } from "react";
import styled from "styled-components";
import { Pause, VolumeOff, VolumeX } from "lucide-react";

export default function VideoPlayer() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
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

  return (
    <Container>
      <StyledVideo
        ref={videoRef}
        src="https://videos.pexels.com/video-files/26654027/11984840_1080_1920_30fps.mp4"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        muted={muted}
      />

      <SideButtonLeft onClick={() => seek(-10)}>
        <svg
          width="53"
          height="53"
          viewBox="0 0 53 53"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.272 36.32v-9.843l-2.868.898v-2.06l5.148-1.48V36.32h-2.28zM31.23 36.584c-.967 0-1.814-.258-2.54-.775-.725-.528-1.29-1.268-1.693-2.218-.391-.963-.587-2.096-.587-3.399 0-1.291.196-2.418.587-3.38.404-.963.968-1.703 1.694-2.22.725-.527 1.572-.791 2.54-.791.967 0 1.813.264 2.539.792.726.516 1.284 1.256 1.676 2.218.403.963.605 2.09.605 3.381 0 1.303-.202 2.436-.605 3.398-.392.951-.95 1.69-1.676 2.22-.726.516-1.572.774-2.54.774zm0-2.078c.76 0 1.365-.381 1.814-1.144.461-.763.691-1.82.691-3.17 0-1.35-.23-2.406-.69-3.17-.45-.762-1.055-1.144-1.815-1.144s-1.37.382-1.831 1.145c-.45.763-.674 1.82-.674 3.17 0 1.35.225 2.406.674 3.169.46.763 1.071 1.144 1.831 1.144z"
            fill="#fff"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M31.792 4.687 27.92 9.11a32.07 32.07 0 0 1 4.966 1.248c2.576.873 5.127 2.12 6.918 3.73a20.876 20.876 0 0 1 6.566 11.83 21.126 21.126 0 0 1-2.014 13.434c-2.13 4.121-5.558 7.394-9.732 9.291a20.03 20.03 0 0 1-13.286 1.172c-4.432-1.139-8.36-3.762-11.153-7.45a21.036 21.036 0 0 1-4.248-12.882 1.344 1.344 0 0 1 1.343-1.345c.736.006 1.327.62 1.32 1.37a18.287 18.287 0 0 0 3.694 11.198 17.699 17.699 0 0 0 9.695 6.476c3.853.99 7.92.631 11.55-1.018A17.863 17.863 0 0 0 42 38.086a18.366 18.366 0 0 0 1.75-11.68 18.148 18.148 0 0 0-5.707-10.283c-1.413-1.27-3.585-2.372-5.996-3.19a29.642 29.642 0 0 0-3.51-.95l3.253 3.804-2.008 1.784-5.573-6.517a1.377 1.377 0 0 1 .01-1.796l5.585-6.378 1.988 1.807zm-7.76-.098-4.37 5.537 4.376 5.109-2.007 1.785-5.11-5.965a1.377 1.377 0 0 1-.035-1.744l5.07-6.423 2.075 1.701z"
            fill="#fff"
          />
        </svg>
      </SideButtonLeft>

      <CenterButton onClick={togglePlay}>
        {playing ? (
          <PauseIcon />
        ) : (
          <svg
            width="51"
            height="58"
            viewBox="0 0 51 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.985.921C5.561-1.676 0 1.528 0 6.675v44.302c0 5.147 5.561 8.352 9.985 5.754L47.713 34.58c4.383-2.573 4.383-8.934 0-11.507L9.985.92z"
              fill="#fff"
            />
          </svg>
        )}
      </CenterButton>

      <SideButtonRight onClick={() => seek(10)}>
        <svg
          width="53"
          height="53"
          viewBox="0 0 53 53"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.46 36.32v-9.843l-2.867.898v-2.06l5.148-1.48V36.32h-2.28zM30.419 36.584c-.968 0-1.814-.258-2.54-.775-.725-.528-1.29-1.268-1.693-2.218-.391-.963-.587-2.096-.587-3.399 0-1.291.196-2.418.587-3.38.403-.963.968-1.703 1.693-2.22.726-.527 1.572-.791 2.54-.791s1.814.264 2.54.792c.725.516 1.284 1.256 1.675 2.218.404.963.605 2.09.605 3.381 0 1.303-.201 2.436-.604 3.398-.392.951-.95 1.69-1.676 2.22-.726.516-1.573.774-2.54.774zm0-2.078c.76 0 1.365-.381 1.814-1.144.46-.763.691-1.82.691-3.17 0-1.35-.23-2.406-.69-3.17-.45-.762-1.055-1.144-1.815-1.144s-1.37.382-1.831 1.145c-.45.763-.674 1.82-.674 3.17 0 1.35.224 2.406.674 3.169.46.763 1.07 1.144 1.831 1.144z"
            fill="#fff"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="m20.851 4.687 3.871 4.422a32.07 32.07 0 0 0-4.966 1.248c-2.576.873-5.127 2.12-6.918 3.73a20.876 20.876 0 0 0-6.566 11.83A21.126 21.126 0 0 0 8.286 39.35c2.13 4.121 5.558 7.394 9.732 9.291a20.03 20.03 0 0 0 13.286 1.172c4.432-1.139 8.36-3.762 11.153-7.45a21.036 21.036 0 0 0 4.248-12.882 1.344 1.344 0 0 0-1.343-1.345 1.345 1.345 0 0 0-1.32 1.37 18.288 18.288 0 0 1-3.694 11.198 17.699 17.699 0 0 1-9.695 6.476c-3.853.99-7.92.631-11.55-1.018a17.862 17.862 0 0 1-8.46-8.077 18.365 18.365 0 0 1-1.75-11.68A18.148 18.148 0 0 1 14.6 16.123c1.412-1.27 3.585-2.372 5.996-3.19a29.644 29.644 0 0 1 3.51-.95l-3.253 3.804 2.008 1.784 5.572-6.517a1.377 1.377 0 0 0-.01-1.796L22.84 2.88 20.85 4.687zm7.76-.098 4.37 5.537-4.376 5.109 2.007 1.785 5.11-5.965c.425-.496.44-1.23.035-1.744l-5.07-6.423-2.075 1.701z"
            fill="#fff"
          />
        </svg>
      </SideButtonRight>

      <MuteButton onClick={toggleMute}>
        {muted ? (
          <VolumeXIcon />
        ) : (
          <svg
            width="34"
            height="26"
            viewBox="0 0 34 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.853 17.259h-4.7C.963 17.259 0 16.255 0 15.017v-4.034C0 9.745.964 8.74 2.153 8.74h4.7l5.499-4.983c.557-.505 1.426-.093 1.426.676v17.131c0 .77-.869 1.182-1.426.677l-5.5-4.983z"
              fill="#fff"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.92 7.206a.837.837 0 0 1 1.218.01c1.305 1.377 2.099 3.481 2.099 5.784s-.794 4.407-2.1 5.785a.837.837 0 0 1-1.217.009.923.923 0 0 1-.008-1.268c.946-1 1.603-2.63 1.603-4.526s-.657-3.527-1.603-4.526a.923.923 0 0 1 .008-1.268z"
              fill="#fff"
            />
            <path
              d="M29.314.207a.628.628 0 0 0-.913-.02.692.692 0 0 0-.019.95c2.487 2.7 4.126 6.989 4.126 11.863s-1.64 9.163-4.126 11.862a.692.692 0 0 0 .02.95.628.628 0 0 0 .912-.019C32.064 22.808 33.8 18.168 33.8 13c0-5.168-1.735-9.808-4.485-12.793zM23.27 3.328a.628.628 0 0 0-.913.014.692.692 0 0 0 .013.95c1.956 1.979 3.25 5.126 3.25 8.708s-1.294 6.73-3.25 8.707a.692.692 0 0 0-.013.951.628.628 0 0 0 .913.014c2.234-2.259 3.64-5.768 3.64-9.672 0-3.904-1.406-7.413-3.64-9.672z"
              fill="#fff"
              fillOpacity=".2"
            />
          </svg>
        )}
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
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CenterButton = styled.button`
  display: flex;
  position: absolute;
  cursor: pointer;
  top: 46%;
  right: 42%;
  align-items: center;
  background-color: transparent;
  border: none;
  justify-content: center;

  @media (max-width: 640px) {
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    svg {
      width: 36px;
      height: 42px;
    }
  }
`;

const PauseIcon = styled(Pause)`
  width: 51px;
  height: 58px;
  cursor: pointer;
  color: white;

  @media (max-width: 640px) {
    width: 36px;
    height: 42px;
  }
`;

const SideButtonLeft = styled.button`
  position: absolute;
  top: 46%;
  left: 22%;
  cursor: pointer;
  border: none;
  background-color: transparent;

  @media (max-width: 640px) {
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
    svg {
      width: 38px;
      height: 38px;
    }
  }
`;

const SideButtonRight = styled.button`
  position: absolute;
  top: 46%;
  right: 22%;
  cursor: pointer;
  border: none;
  background-color: transparent;

  @media (max-width: 640px) {
    top: 50%;
    right: 10%;
    transform: translateY(-50%);
    svg {
      width: 38px;
      height: 38px;
    }
  }
`;

const MuteButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
  padding: 6px;
  border: none;
  border-radius: 50%;
  background: transparent;

  &:hover {
    background: transparent;
  }

  @media (max-width: 640px) {
    top: 8px;
    right: 8px;
    padding: 4px;
    svg {
      width: 24px;
      height: 20px;
    }
  }
`;

const VolumeXIcon = styled(VolumeOff)`
  width: 34px;
  height: 26px;
  cursor: pointer;
  color: white;

  @media (max-width: 640px) {
    width: 24px;
    height: 20px;
  }
`;

const BottomControls = styled.div`
  position: absolute;
  bottom: 27px;
  left: 25.5px;
  right: 26px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 640px) {
    bottom: 12px;
    left: 12px;
    right: 12px;
    gap: 6px;
  }
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
    width: 15px;
    height: 15px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
    border: none;
    position: relative;
    z-index: 2;
  }

  @media (max-width: 640px) {
    height: 3px;

    &::-webkit-slider-thumb {
      width: 12px;
      height: 12px;
    }
  }
`;

const TimeText = styled.span`
  width: 76px;
  font-family: "HelveticaRegular";
  font-size: 15px;
  text-align: center;
  color: #fff;

  @media (max-width: 640px) {
    width: auto;
    font-size: 13px;
  }
`;
