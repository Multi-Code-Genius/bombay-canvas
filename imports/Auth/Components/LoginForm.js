"use client";

import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Cookies from "js-cookie";
import Flex from "/lib/atoms/Flex";
import { useLogin } from "api/auth";
import EyeSlashIcon from "imports/core/ui/assets/EyeSlashIcon";
import EyeIcon from "/imports/core/ui/assets/EyeIcon";

export default function LoginForm({ setIsAuthed }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, data, error: errrr } = useLogin(true);

  useEffect(() => {
    if (data?.user?.role === "ADMIN") {
      Cookies.set("adminAccess", "true", { expires: 10 });
      setIsAuthed(true);
    }
  }, [data, setIsAuthed]);

  const onLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    mutate(
      { email, password },
      {
        onSuccess: (res) => {
          if (res?.user?.role === "ADMIN") {
            Cookies.set("adminAccess", "true", { expires: 10 });
            setIsAuthed(true);
          }
        },
        onError: (err) => {
          console.log("err", err);
          // depending on your API shape
          setError("Invalid email or password.");
        },
        onSettled: () => {
          setLoading(false);
        },
      }
    );
  };

  return (
    <LoginContainer>
      <LoginFormStyled onSubmit={onLogin}>
        <LoginTitle>Admin Login</LoginTitle>

        <LoginInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <PasswordWrapper>
          <LoginInput
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <EyeIconWrapper onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </EyeIconWrapper>
        </PasswordWrapper>

        {error && <LoginError>{error}</LoginError>}

        <LoginButton type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </LoginButton>

        {error && <LoginError>{error}</LoginError>}
      </LoginFormStyled>
    </LoginContainer>
  );
}

const LoginContainer = styled(Flex)`
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
  z-index: 12;
`;

const LoginFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #414141;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  width: 100%;
  max-width: 400px;
`;

const LoginTitle = styled.h2`
  font-family: "HelveticaBold";
  font-size: 28px;
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
`;

const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const EyeIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    fill: #fff;
    opacity: 0.7;
  }

  &:hover svg {
    opacity: 1;
  }
`;

const LoginInput = styled.input`
  width: 100%;
  padding: 14px 18px;
  border-radius: 8px;
  border: 1px solid #414141;
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  font-size: 16px;
  outline: none;

  ::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    border-color: #ef8a4c;
    box-shadow: 0 0 0 2px rgba(239, 138, 76, 0.3);
  }
`;

const LoginButton = styled.button`
  padding: 12px;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid rgba(255, 126, 55, 0.2);
  background-image: linear-gradient(101deg, #ff670a 2%, #ef8a4c 82%);
  color: #fff;
  font-family: "HelveticaRegular";
  font-size: 16px;
  transition: opacity 0.3s ease;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const LoginError = styled.div`
  color: #ff7373;
  font-size: 14px;
  text-align: center;
`;
