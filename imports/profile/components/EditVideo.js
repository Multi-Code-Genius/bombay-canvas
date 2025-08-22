import React, { useState } from "react";

const EditVideoContainer = styled.div`
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

const EditVideo = ({ video, onClose }) => {
  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description);
  // const editMovieMutation = useEditMovies();

  const handleSubmit = (e) => {
    e.preventDefault();
    // editMovieMutation.mutate(
    //   {
    //     id: video._id,
    //     title,
    //     description,
    //   },
    //   {
    //     onSuccess: () => {
    //       onClose();
    //     },
    //   }
    // );
  };

  return (
    <EditVideoContainer>
      <Title>Edit Video</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Textarea>
        </FormGroup>
        <ButtonGroup>
          <Button type="button" className="cancel" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="submit">
            Save Changes
          </Button>
        </ButtonGroup>
      </Form>
    </EditVideoContainer>
  );
};

export default EditVideo;
