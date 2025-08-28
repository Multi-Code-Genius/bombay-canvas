import styled, { keyframes } from "styled-components";

const SkeletonCard = () => (
  <StyledSkeletonCard>
    <SkeletonVideo>
      <SkeletonAvatar />
      <SkeletonName />
    </SkeletonVideo>
  </StyledSkeletonCard>
);

export default SkeletonCard;

const pulse = keyframes`
  0% { background-color: #2a2a2a; }
  50% { background-color: #3a3a3a; }
  100% { background-color: #2a2a2a; }
`;

const StyledSkeletonCard = styled.div`
  width: 100%;
  position: relative;
  background-color: #2a2a2a;
  border-radius: 12px;

  @media (max-width: 640px) {
    padding-top: 62%;
    width: 39%;
  }
  @media (min-width: 640px) {
    height: 413px;
  }

  animation: ${pulse} 1.5s infinite ease-in-out;
`;

const SkeletonVideo = styled.div`
  position: absolute;
  left: clamp(6px, 2vw, 12px);
  bottom: clamp(6px, 2vw, 12px);
  padding: 4px 9px 4px 3px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: 24px;
  background-color: rgba(0, 0, 0, 0.2);
  -webkit-backdrop-filter: blur(11.6px);
  backdrop-filter: blur(11.6px);
`;

const SkeletonAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #4a4a4a;
`;

const SkeletonName = styled.div`
  width: 60px;
  height: 12px;
  border-radius: 4px;
  background-color: #4a4a4a;
`;
