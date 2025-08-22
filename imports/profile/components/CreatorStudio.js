import React, { useState } from "react";
import styled from "styled-components";
// import Modal from "imports/common/components/Modal";

import VideoList from "./VideoList";
import Modal from "imports/common/components/Modal";
import UploadVideo from "./UploadVideo";

const CreatorStudioContainer = styled.div`
  background-color: #282828;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 0.5rem; /* 8px */
  padding: 1.5rem; /* 24px */
  color: white;
`;

const Title = styled.h2`
  font-size: 1.5rem; /* 24px */
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background-color: #3b82f6;
  &:hover {
    background-color: #2563eb;
  }
  color: white;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem; /* 4px */
`;

const CreatorStudio = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <CreatorStudioContainer>
      <Title>Creator Studio</Title>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <Button onClick={openModal}>Upload Video</Button>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <UploadVideo onClose={closeModal} />
        </Modal>
      )}
      <VideoList />
    </CreatorStudioContainer>
  );
};

export default CreatorStudio;
