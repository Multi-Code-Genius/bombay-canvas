"use client";
import React from "react";
import styled from "styled-components";
import UserInfo from "../components/UserInfo";

const Container = styled.div`
  background-color: #181818;
  padding: 2rem 1rem;
  margin: 0 auto;
  color: white;
  max-width: 1280px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 1.875rem; /* 30px */
  font-weight: 700;
  margin-bottom: 1rem;
`;

const ProfilePage = () => {
  return (
    <Container>
      <Title>Profile</Title>
      <UserInfo />
    </Container>
  );
};

export default ProfilePage;
