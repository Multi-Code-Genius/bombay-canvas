"use client";

import Flex from "lib/atoms/Flex";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import styled, { css } from "styled-components";
import SearchIcon from "/imports/core/ui/assets/SearchIcon";
import CloseIcon from "/imports/core/ui/assets/CloseIcon";
import VuesaxIcon from "/imports/core/ui/assets//VuesaxIcon";
import MenuIcon from "/imports/core/ui/assets/MenuIcon";
import { useSearchUsers, useUserData } from "api/user";
import { useAuthStore } from "store/authStore";
import { getInitials } from "lib/hooks/getIntials";
import { ExpandIcon } from "../assets/ExpandIcon";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data } = useUserData(!!useAuthStore.getState().token);
  const token = useAuthStore((s) => s.token);

  const userName = data?.userData?.name || "";
  const initials = getInitials(userName);

  const [query, setQuery] = useState("");
  const { data: users, isLoading, error } = useSearchUsers(query);

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categories, setCategories] = useState("Categories");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleProfileClick = () => {
    router.push("/profile");
  };

  const isLoggedIn = Boolean(token);

  const isCreator = pathname?.startsWith("/creator/");
  const showBg = pathname !== "/" && !isCreator;

  return (
    <HeaderContainer $fullwidth $isBackground={showBg}>
      <Left $alignitems="center">
        <Logo>
          <Link href="/">
            <Image src="/static/logo.png" alt="Logo" width={100} height={40} />
          </Link>
        </Logo>
        <Navs>
          <NavLink href="/" active={`${pathname === "/"}`}>
            Home
            {pathname === "/" && <BorderBottom />}
          </NavLink>
          <NavLink href="/about" active={`${pathname === "/about"}`}>
            About
            {pathname === "/about" && <BorderBottom />}
          </NavLink>
        </Navs>
      </Left>
      <RightSection $alignitems="center">
        <Search>
          <SearchWrapper $alignitems="center" $gap="8px">
            <SearchIcon />
            <SearchBar
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </SearchWrapper>
          <CloseIconWrapper
            onClick={() => {
              setQuery("");
            }}
          >
            <CloseIcon />
          </CloseIconWrapper>
          {query && (
            <SearchResults>
              {isLoading && <p>Loading...</p>}
              {error && <p>Something went wrong</p>}
              {users && users.length > 0
                ? users.map((user) => (
                    <SearchResultItem key={user?.id}>
                      <Link href={`/creator/${user?.id}`}>
                        <Avatar>
                          <AvatarText>{getInitials(user.name)}</AvatarText>
                        </Avatar>
                        <span>{user.name}</span>
                      </Link>
                    </SearchResultItem>
                  ))
                : !isLoading && !error && <p>No users found</p>}
            </SearchResults>
          )}
        </Search>
        <CategoryContainer>
          <CategoryTitle onClick={toggleCategory}>
            <CategoryTextWrapper>
              <VuesaxIcon />
              <Text>{categories}</Text>
            </CategoryTextWrapper>
            <ExpandIcon reversed={isCategoryOpen} />
          </CategoryTitle>
          {isCategoryOpen && (
            <CategoryDropdown>
              <CategoryItem
                onClick={() => {
                  setCategories("Movies");
                  setIsCategoryOpen(false);
                }}
              >
                Movies
              </CategoryItem>
              <CategoryItem
                onClick={() => {
                  setCategories("Series");
                  setIsCategoryOpen(false);
                }}
              >
                Series
              </CategoryItem>
            </CategoryDropdown>
          )}
        </CategoryContainer>

        {isLoggedIn ? (
          <Avatar onClick={handleProfileClick} title={userName || ""}>
            <AvatarText>{initials || "U"}</AvatarText>
          </Avatar>
        ) : (
          <LoginButton onClick={handleLoginClick}>Login</LoginButton>
        )}
      </RightSection>
      <MenuIconWrapper onClick={toggleMenu}>
        <MenuIcon open={isMenuOpen} />
      </MenuIconWrapper>
      <DropdownMenu open={isMenuOpen}>
        <Navs $direction="column">
          <NavLink
            href="/"
            active={`${pathname === "/"}`}
            onClick={() => closeMenu()}
          >
            Home
            {pathname === "/" && <BorderBottom />}
          </NavLink>
          <NavLink
            href="/about"
            active={`${pathname === "/about"}`}
            onClick={() => closeMenu()}
          >
            About
            {pathname === "/about" && <BorderBottom />}
          </NavLink>
        </Navs>
        <Search>
          <SearchWrapper $alignitems="center" $gap="8px">
            <SearchIcon />
            <SearchBar
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search"
            />
          </SearchWrapper>
          <CloseIconWrapper
            onClick={() => {
              setQuery("");
            }}
          >
            <CloseIcon />
          </CloseIconWrapper>
          {query && (
            <SearchResults>
              {isLoading && <p>Loading...</p>}
              {error && <p>Error fetching users</p>}
              {users && users.length > 0
                ? users.map((user) => (
                    <SearchResultItem key={user.id}>
                      <Link href={`/creator/${user.id}`}>
                        <Avatar>
                          <AvatarText>{getInitials(user.name)}</AvatarText>
                        </Avatar>
                        <span>{user.name}</span>
                      </Link>
                    </SearchResultItem>
                  ))
                : !isLoading && !error && <p>No users found</p>}
            </SearchResults>
          )}
        </Search>
        <CategoryContainer>
          <CategoryTitle onClick={toggleCategory}>
            <CategoryTextWrapper>
              <VuesaxIcon />
              <Text>{categories}</Text>
            </CategoryTextWrapper>
            <ExpandIcon reversed={isCategoryOpen} />
          </CategoryTitle>
          {isCategoryOpen && (
            <CategoryDropdown>
              <CategoryItem
                onClick={() => {
                  setCategories("Movies"), setIsCategoryOpen(false);
                }}
              >
                Movies
              </CategoryItem>
              <CategoryItem
                onClick={() => {
                  setCategories("Series"), setIsCategoryOpen(false);
                }}
              >
                Series
              </CategoryItem>
            </CategoryDropdown>
          )}
        </CategoryContainer>
        {isLoggedIn ? (
          <Avatar onClick={handleProfileClick} title={userName} $fullwidth>
            <AvatarText>{initials || "U"}</AvatarText>
          </Avatar>
        ) : (
          <LoginButton onClick={handleLoginClick}>Login</LoginButton>
        )}
      </DropdownMenu>
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

  ${({ $isBackground }) =>
    $isBackground &&
    css`
      background: rgba(24, 24, 24, 0.5);
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
    `}

  @media (max-width: 1100px) {
    padding: 20px;
  }
`;

const Left = styled(Flex)`
  align-items: center;
  gap: 37px;
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

  @media (max-width: 920px) {
    display: none;
  }
`;

const RightSection = styled(Flex)`
  gap: 14px;

  @media (max-width: 920px) {
    display: none;
  }
`;

const CategoryTextWrapper = styled(Flex)`
  align-items: center;
  gap: 10px;
`;

const CategoryTitle = styled(Flex)`
  width: 146px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 8.5px 12px;
  border-radius: 8px;
  cursor: pointer;
  outline: solid 1px rgba(255, 255, 255, 0.2);
  border: none;
  background-color: rgba(15, 15, 15, 0.12);
  justify-content: space-between;

  @media (max-width: 920px) {
    width: 100%;
  }
`;

const CategoryContainer = styled.div`
  position: relative;
`;

const CategoryDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: rgba(15, 15, 15, 0.12);
  border-radius: 8px;
  margin-top: 8px;
  padding: 10px;
  z-index: 100;
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  outline: solid 1px rgba(255, 255, 255, 0.2) !important;
  border: none;
`;

const CategoryItem = styled.div`
  display: block;
  padding: 10px;
  color: #fff;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const NavLink = styled(Link)`
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  font-family: "HelveticaMedium", sans-serif;
  font-size: 16px;
  letter-spacing: -0.8px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  position: relative;
  padding-bottom: 5px;
`;

const BorderBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 2px;
  background-color: #fff;
  border-radius: 2px;
`;

const SearchWrapper = styled(Flex)`
  width: 100%;
  align-items: center;
  gap: 8px;
`;

const SearchBar = styled.input`
  width: 100%;
  display: flex;
  align-items: center;
  outline: none;
  border: none;
  font-family: "HelveticaMedium", sans-serif;
  font-size: 16px;
  background-color: transparent;
  line-height: 1.5;
  letter-spacing: -0.16px;
  color: rgba(255, 255, 255, 1);

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Search = styled(Flex)`
  width: 284px;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 7.5px 12px;
  border-radius: 8px;
  outline: solid 1px rgba(255, 255, 255, 0.2) !important;
  border: none;
  background-color: rgba(15, 15, 15, 0.12);
  position: relative;

  @media (max-width: 920px) {
    z-index: 99;
  }
`;

const SearchResults = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background-color: rgba(15, 15, 15, 0.12);
  border: solid 1px rgba(239, 239, 239, 0.28);
  border-radius: 8px;
  padding: 10px;
  z-index: 100;
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  outline: solid 1px rgba(255, 255, 255, 0.2) !important;
  border: none;

  p {
    margin: 0;
    padding: 5px;
    color: rgba(255, 255, 255, 1);
  }
`;

const SearchResultItem = styled.div`
  padding: 12px 10px;
  cursor: pointer;
  border-radius: 6px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  a {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #fff;
    text-decoration: none;
  }
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
  box-shadow:
    -0.7px 4.3px 8.6px 0 rgba(250, 87, 0, 0.12),
    -1.4px 16.5px 16.5px 0 rgba(250, 87, 0, 0.1),
    -3.6px 36.6px 22.2px 0 rgba(250, 87, 0, 0.06),
    -5.7px 64.6px 25.8px 0 rgba(250, 87, 0, 0.02),
    -9.3px 101.1px 28.7px 0 rgba(250, 87, 0, 0),
    inset -2.9px 3.6px 5.6px 0 rgba(255, 255, 255, 0.25),
    inset -2.9px -2.9px 2.9px 0 rgba(255, 255, 255, 0.17);
  border: solid 1.4px rgba(255, 126, 55, 0.2);
  background-image: linear-gradient(144deg, #ff670a -18%, #ef8a4c 121%);
`;

const Avatar = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  background-image: linear-gradient(144deg, #3a3a3a -18%, #1f1f1f 121%);
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  ${({ $fullwidth }) =>
    $fullwidth &&
    `
      width: 100%;
      height: 48px;
      border-radius: 8px;
    `}
`;

const AvatarText = styled.span`
  font-family: "HelveticaMedium", sans-serif;
  font-size: 14px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const MenuIconWrapper = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 920px) {
    display: block;
  }
`;

const DropdownMenu = styled.div`
  display: none;

  @media (max-width: 920px) {
    display: flex;

    flex-direction: column;
    gap: 16px;
    position: absolute;
    top: 80px;
    right: 20px;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 20px;
    border-radius: 8px;
    z-index: 1001;
    transition:
      transform 0.3s ease-in-out,
      opacity 0.3s ease-in-out;
    transform: ${({ open }) => (open ? "translateY(0)" : "translateY(-20px)")};
    opacity: ${({ open }) => (open ? 1 : 0)};
    pointer-events: ${({ open }) => (open ? "auto" : "none")};

    > ${Navs} {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    > ${Search} {
      width: 100%;
    }

    > ${CategoryContainer} {
      width: 100%;
    }

    > ${LoginButton} {
      width: 100%;
    }

    > ${Avatar} {
      width: 100%;
    }
  }
`;

const CloseIconWrapper = styled.div`
  cursor: pointer;
`;
