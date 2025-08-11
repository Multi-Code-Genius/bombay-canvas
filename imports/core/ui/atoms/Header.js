"use client";

import Flex from "lib/atoms/Flex";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import SearchIcon from "../assets/SearchIcon";
import CloseIcon from "../assets/CloseIcon";
import VuesaxIcon from "../assets/VuesaxIcon";
import ExpandIcon from "../assets/ExpandIcon";

const Header = () => {
  const router = useRouter();

  return (
    <HeaderContainer $fullwidth>
      <Left $alignitems="center">
        <Logo onClick={() => router.push("/")}>
          <Image src="/logo.png" alt="Logo" width={100} height={40} />
        </Logo>
        <Navs>
          <NavLink>Home</NavLink>
          <NavLink>About</NavLink>
        </Navs>
      </Left>
      <RightSection $alignitems="center">
        <Search>
          <SearchWrapper $alignitems="center" $gap="8px">
            <SearchIcon />
            <SearchBar type="text" placeholder="Search" />
          </SearchWrapper>
          <CloseIcon />
        </Search>

        <CategoryTitle>
          <VuesaxIcon />
          <Text>Categories</Text>
          <ExpandIcon />
        </CategoryTitle>

        <LoginButton onClick={() => router.push("/login")}>Login</LoginButton>
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  padding: 40px;
`;

const Left = styled(Flex)`
  align-items: center;
  gap: 17px;
`;

const Logo = styled.div`
  width: 100px;
  cursor: pointer;
  position: relative;
`;

const Text = styled.span`
  font-family: "HelveticaMedium";
  font-size: 16px;
  letter-spacing: -0.4px;
  color: #fff;
`;

const Navs = styled(Flex)`
  gap: 14px;
  align-items: center;
  justify-content: center;
`;

const RightSection = styled(Flex)`
  width: 544px;
  gap: 14px;
`;

const CategoryTitle = styled(Flex)`
  width: 146px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px 9px;
  border-radius: 8px;
  border: solid 1px rgba(239, 239, 239, 0.28);
  background-color: rgba(0, 0, 0, 0.37);
`;

const NavLink = styled.a`
  width: 41px;
  opacity: 0.5;
  font-family: "HelveticaMedium", sans-serif;
  font-size: 16px;
  letter-spacing: -0.8px;
  text-align: center;
  color: #fff;
  cursor: pointer;
`;

const SearchWrapper = styled(Flex)`
  align-items: center;
  gap: 8px;
`;

const SearchBar = styled.input`
  display: flex;
  align-items: center;
  outline: none;
  border: none;
  font-family: "HelveticaMedium", sans-serif;
  font-size: 16px;
  background-color: transparent;
  line-height: 1.5;
  letter-spacing: -0.16px;
  color: rgba(255, 255, 255, 0.27);
`;

const Search = styled(Flex)`
  width: 284px;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 7px 12px;
  border-radius: 8px;
  -webkit-backdrop-filter: blur(20.4px);
  backdrop-filter: blur(20.4px);
  border: solid 1px rgba(255, 255, 255, 0.2);
  background-color: rgba(15, 15, 15, 0.12);
`;

const LoginButton = styled.button`
  width: 86px;
  padding: 7.5px 0;
  border-radius: 8px;
  cursor: pointer;
  color: #fff;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  box-shadow: -0.7px 4.3px 8.6px 0 rgba(250, 87, 0, 0.12),
    -1.4px 16.5px 16.5px 0 rgba(250, 87, 0, 0.1),
    -3.6px 36.6px 22.2px 0 rgba(250, 87, 0, 0.06),
    -5.7px 64.6px 25.8px 0 rgba(250, 87, 0, 0.02),
    -9.3px 101.1px 28.7px 0 rgba(250, 87, 0, 0),
    inset -2.9px 3.6px 5.6px 0 rgba(255, 255, 255, 0.25),
    inset -2.9px -2.9px 2.9px 0 rgba(255, 255, 255, 0.17);
  border: solid 1.4px rgba(255, 126, 55, 0.2);
  background-image: linear-gradient(144deg, #ff670a -18%, #ef8a4c 121%);
`;
