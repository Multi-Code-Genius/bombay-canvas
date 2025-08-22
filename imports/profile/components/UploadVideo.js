import React, { useState } from "react";
import styled from "styled-components";

const UploadVideoContainer = styled.div`
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

const Form = styled.form``;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  color: white;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #4a5568;
  border-radius: 0.25rem; /* 4px */
  background-color: #4a5568;
  color: white;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #4a5568;
  border-radius: 0.25rem; /* 4px */
  background-color: #4a5568;
  color: white;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  color: white;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem; /* 4px */
  margin-left: 0.5rem;

  &.cancel {
    background-color: #718096;
    &:hover {
      background-color: #4a5568;
    }
  }

  &.submit {
    background-color: #3b82f6;
    &:hover {
      background-color: #2563eb;
    }
  }
`;

const UploadVideo = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", videoFile);

    addMovieMutation.mutate(formData, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <UploadVideoContainer>
      <Title>Upload Video</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="videoFile">Video File</Label>
          <Input
            type="file"
            id="videoFile"
            onChange={(e) => setVideoFile(e.target.files[0])}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            placeholder="Enter video title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            rows="4"
            placeholder="Enter video description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Textarea>
        </FormGroup>
        <ButtonGroup>
          <Button type="button" className="cancel" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="submit">
            Upload
          </Button>
        </ButtonGroup>
      </Form>
    </UploadVideoContainer>
  );
};

export default UploadVideo;
