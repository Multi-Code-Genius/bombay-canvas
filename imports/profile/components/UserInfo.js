import React from "react";
import styled from "styled-components";
import { useAuthStore } from "store/authStore";

const UserInfoContainer = styled.div`
  background-color: #282828;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 0.5rem; /* 8px */
  padding: 1.5rem; /* 24px */
  margin-bottom: 2rem; /* 32px */
  color: white;
`;

const Title = styled.h2`
  font-size: 1.5rem; /* 24px */
  font-weight: 600;
  margin-bottom: 1rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const InfoItem = styled.div``;

const Label = styled.p`
  font-weight: 600;
`;

const Value = styled.p``;

const ProfileImage = styled.img`
  width: 6rem; /* 96px */
  height: 6rem; /* 96px */
  border-radius: 9999px;
  object-fit: cover;
`;

const UserInfo = () => {
  const token = useAuthStore((s) => s.token);

  return (
    <UserInfoContainer>
      <Title>User Information</Title>
      <InfoGrid>
        <InfoItem>
          <Label>Name:</Label>
          <Value>{"Jay"}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Email:</Label>
          <Value>{"example@gmail.com"}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Profile Picture:</Label>
          <ProfileImage src={"/static/avtar.jpg"} alt="Profile" />
        </InfoItem>
      </InfoGrid>
    </UserInfoContainer>
  );
};

export default UserInfo;
