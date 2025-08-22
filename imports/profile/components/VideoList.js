import React, { useState } from "react";
import styled from "styled-components";

import { useAuthStore } from "store/authStore";
import Modal from "imports/common/components/Modal";

const VideoListContainer = styled.div`
  background-color: #282828;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 0.5rem; /* 8px */
  padding: 1.5rem; /* 24px */
  margin-top: 2rem; /* 32px */
  color: white;
`;

const Title = styled.h2`
  font-size: 1.5rem; /* 24px */
  font-weight: 600;
  margin-bottom: 1rem;
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  min-width: 100%;
  background-color: #282828;
`;

const Th = styled.th`
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #4a5568;
`;

const Td = styled.td`
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #4a5568;
`;

const Thumbnail = styled.img`
  width: 6rem; /* 96px */
  height: 4rem; /* 64px */
  object-fit: cover;
  border-radius: 0.25rem; /* 4px */
`;

const Button = styled.button`
  color: white;
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem; /* 4px */
  margin-right: 0.5rem;

  &.update {
    background-color: #f59e0b;
    &:hover {
      background-color: #d97706;
    }
  }

  &.delete {
    background-color: #ef4444;
    &:hover {
      background-color: #dc2626;
    }
  }
`;

const VideoList = () => {
  const token = useAuthStore((s) => s.token);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openModal = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteMovieMutation.mutate(id);
  };

  const userVideos = [];

  return (
    <VideoListContainer>
      <Title>My Videos</Title>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>Thumbnail</Th>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {userVideos?.map((video) => (
              <tr key={video._id}>
                <Td>
                  <Thumbnail src={video.thumbnail} alt={video.title} />
                </Td>
                <Td>{video.title}</Td>
                <Td>{video.description}</Td>
                <Td>
                  <Button className="update" onClick={() => openModal(video)}>
                    Update
                  </Button>
                  <Button
                    className="delete"
                    onClick={() => handleDelete(video._id)}
                  >
                    Delete
                  </Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <EditVideo video={selectedVideo} onClose={closeModal} />
        </Modal>
      )}
    </VideoListContainer>
  );
};

export default VideoList;
