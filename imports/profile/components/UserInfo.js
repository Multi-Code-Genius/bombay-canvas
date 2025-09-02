import React from "react";
import styled from "styled-components";
import { useAuthStore } from "store/authStore";
import { useUserData } from "api/user";
import { useRouter } from "next/navigation";

const UserInfoContainer = styled.div`
  background-color: #282828;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
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
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const { logout } = useAuthStore();
  const { data } = useUserData(token);

  const handleLogOut = () => {
    logout();
    router.push("/");
  };

  return (
    <UserInfoContainer>
      <Title>User Information</Title>
      <InfoGrid>
        <InfoItem>
          <Label>Name:</Label>
          <Value>{data?.userData?.name}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Email:</Label>
          <Value>{data?.userData?.email}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Profile Picture:</Label>
          <ProfileImage src={"/static/avtar.jpg"} alt="Profile" />
        </InfoItem>
        <InfoItem>
          <LogInBtn onClick={handleLogOut}>Log out</LogInBtn>
        </InfoItem>
      </InfoGrid>
    </UserInfoContainer>
  );
};

export default UserInfo;

const LogInBtn = styled.button`
  width: 100px;
  text-align: center;
  padding: 8px 10px;
  margin-bottom: 6px;
  border-radius: 8px;
  border: 1px solid #ef8a4c;
  background: #ef8a4c22;
  color: #fff;
  cursor: pointer;
  font-size: 17px;

  &:hover {
    background: #f7af8330;
  }
`;
