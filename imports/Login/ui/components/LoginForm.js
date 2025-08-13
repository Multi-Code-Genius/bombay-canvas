"use client";

import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import ButtonIcon from "/imports/Login/ui/assets/ButtonIcon";
import GoogleLogin from "/imports/Login/ui/assets/GoogleLogin";
import Flex from "/lib/atoms/Flex";
import { useLogin, useRequestOtp } from "api/auth";
import EyeIcon from "/imports/core/ui/assets/EyeIcon";
import EyeSlashIcon from "/imports/core/ui/assets/EyeSlashIcon";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "config/firebaseConfig";
import Header from "imports/core/ui/atoms/Header";

const LoginForm = ({ $fromSignup = false }) => {
  const router = useRouter();
  const { mutate, isPending, isSuccess } = useRequestOtp();
  const { mutate: loginMutate } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRedirect = () => {
    if ($fromSignup) router.push("/login");
    else router.push("/signup");
  };

  const onSubmit = (data) => {
    if (!$fromSignup) {
      return loginMutate({
        email: data.email.trim(),
        password: data.password.trim(),
      });
    } else {
      mutate({
        email: data.email.trim(),
        name: data.fullname.trim(),
        password: data.password.trim(),
      });
      return;
    }
  };

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: idToken }),
      });
    } catch (err) {
      console.error("Google Login Error:", err);
    }
  };

  return (
    <>
      <Header />
      <MainSection
        $direction="column"
        $fullwidth
        $alignitems="center"
        $justifycontent="center"
      >
        <TitleSection $direction="column">
          <MainTitle
            dangerouslySetInnerHTML={{
              __html: $fromSignup
                ? `Let's Get <span>You Started</span>`
                : ` Welcome <span>Back!</span>`,
            }}
          />
          <SubTitle>
            Log iLorem ipsum dolor sit amet, consectetur adipiscing
          </SubTitle>
        </TitleSection>
        <FormSection onSubmit={handleSubmit(onSubmit)}>
          <UpperSection $fullwidth $direction="column">
            <Label>Your Information</Label>
            {$fromSignup && (
              <>
                <InputField
                  placeholder="Your Fullname"
                  {...register("fullname", { required: $fromSignup })}
                />
                {errors.fullname && <ErrorText>Fullname is required</ErrorText>}
              </>
            )}
            <InputField
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
            <PasswordWrapper>
              <InputField
                placeholder="Your Password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/,
                    message:
                      "Password must contain at least one letter, one number and one special character",
                  },
                })}
              />
              <EyeIconWrapper onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </EyeIconWrapper>
            </PasswordWrapper>
            {errors.password && (
              <ErrorText>{errors.password.message}</ErrorText>
            )}
          </UpperSection>
          <BtnWrapper $fullwidth $direction="column">
            <ContinueCTA
              as="button"
              type="submit"
              $fullwidth
              $alignitems="center"
              $justifycontent="center"
            >
              {$fromSignup ? "Sign Up" : "Log in"} <ButtonIcon />
            </ContinueCTA>
            <OrSection $alignitems="center" $justifycontent="center" $fullwidth>
              <Line />
              <Txt>or</Txt>
              <Line />
            </OrSection>
            <GoogleLoginCTA
              $alignitems="center"
              $fullwidth
              $justifycontent="center"
              onClick={handleLogin}
            >
              <GoogleLogin />
              <CTATxt>{$fromSignup ? "Sign in" : "Log in"} with Google</CTATxt>
            </GoogleLoginCTA>
            <TermsCheckbox $alignitems="center">
              <CheckboxInput type="checkbox" id="terms" />
              <MyLabel htmlFor="terms">
                I agree to the <span>Terms of Service</span> and{" "}
                <span>Privacy Policy</span>
              </MyLabel>
            </TermsCheckbox>
          </BtnWrapper>
        </FormSection>
        <ExtraTxt>
          {$fromSignup ? (
            <Fragment>
              Already have an account?{" "}
              <span onClick={handleRedirect}>Log in</span>
            </Fragment>
          ) : (
            <Fragment>
              Don't have an account?{" "}
              <span onClick={handleRedirect}>Sign in</span>
            </Fragment>
          )}
        </ExtraTxt>
      </MainSection>
    </>
  );
};

export default LoginForm;

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

  @media (max-width: 768px) {
    right: 12px;
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 4px;

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const ExtraTxt = styled.div`
  opacity: 0.7;
  font-family: "HelveticaMedium";
  font-size: 20px;
  line-height: 1.5;
  text-align: center;
  color: #fff;

  span {
    font-family: "HelveticaBold";
    text-decoration: underline;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const CheckboxInput = styled.input.attrs({ type: "checkbox" })`
  width: 16.9px;
  height: 16.9px;
  border-radius: 5px;
  border: 1px solid #ef8a4c;
  background-color: transparent;
  appearance: none;
  cursor: pointer;
  display: grid;
  place-content: center;

  &::before {
    content: "✓";
    font-size: 12px;
    color: white;
    transform: scale(0);
    transition: transform 0.1s ease-in-out;
  }

  &:checked {
    background-color: #ef8a4c;
  }

  &:checked::before {
    transform: scale(1);
  }
`;

const TermsCheckbox = styled(Flex)`
  gap: 8px;

  @media (max-width: 768px) {
    gap: 6px;
  }
`;

const MyLabel = styled.label`
  font-family: "HelveticaRegular";
  font-size: 12px;
  line-height: 1.6;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.65);

  span {
    font-family: "HelveticaBold";
    color: #fff;
  }

  @media (max-width: 480px) {
    font-size: 11.5px;
  }
`;

const CTATxt = styled.div`
  font-family: "HelveticaBold";
  font-size: 16px;
  line-height: 1.4;
  letter-spacing: 0.2px;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const GoogleLoginCTA = styled(Flex)`
  gap: 10px;
  padding: 16px 10px;
  border-radius: 12px;
  border: 1px solid #414141;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 14px 10px;
    gap: 8px;
  }

  @media (max-width: 480px) {
    padding: 12px 10px;
  }
`;

const Txt = styled.div`
  opacity: 0.32;
  font-family: "HelveticaRegular";
  font-size: 18px;
  line-height: 1.4;
  letter-spacing: 0.2px;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const OrSection = styled(Flex)`
  gap: 24px;

  @media (max-width: 768px) {
    gap: 18px;
  }

  @media (max-width: 480px) {
    gap: 14px;
  }
`;

const Line = styled(Flex)`
  width: 50px;
  height: 1px;
  opacity: 0.32;
  background-color: #fff;

  @media (max-width: 768px) {
    width: 40px;
  }

  @media (max-width: 480px) {
    width: 32px;
  }
`;

const BtnWrapper = styled(Flex)`
  gap: 10px;

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 480px) {
    gap: 6px;
  }
`;

const ContinueCTA = styled(Flex)`
  padding: 13px;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: -0.7px 4.3px 8.6px 0 rgba(250, 87, 0, 0.12),
    -1.4px 16.5px 16.5px 0 rgba(250, 87, 0, 0.1),
    -3.6px 36.6px 22.2px 0 rgba(250, 87, 0, 0.06),
    -5.7px 64.6px 25.8px 0 rgba(250, 87, 0, 0.02),
    -9.3px 101.1px 28.7px 0 rgba(250, 87, 0, 0),
    inset -2.9px 3.6px 5.6px 0 rgba(255, 255, 255, 0.25),
    inset -2.9px -2.9px 2.9px 0 rgba(255, 255, 255, 0.17);
  border: solid 1.4px rgba(255, 126, 55, 0.2);
  background-image: linear-gradient(101deg, #ff670a 2%, #ef8a4c 82%);

  font-family: "HelveticaRegular";
  font-size: 16px;
  color: #fff;

  > svg {
    margin-left: 6px;
  }

  @media (max-width: 768px) {
    padding: 12px;
    font-size: 15px;
  }

  @media (max-width: 480px) {
    padding: 11px;
    font-size: 14px;
  }
`;

const UpperSection = styled(Flex)`
  gap: 12px;

  @media (max-width: 768px) {
    gap: 10px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const Label = styled.div`
  opacity: 0.54;
  font-family: "HelveticaRegular";
  font-size: 16.3px;
  font-weight: 500;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 16px 20px;
  border-radius: 12px;
  outline: none;
  border: 0.8px solid rgba(26, 41, 58, 0.08);
  background-color: #353535;

  font-family: "HelveticaRegular";
  font-size: 12.5px;
  color: #fff;

  &::placeholder {
    opacity: 0.3;
    font-family: "HelveticaRegular";
    font-size: 12.5px;
    color: #fff;
  }

  @media (max-width: 768px) {
    padding: 14px 16px;
    font-size: 14px;

    &::placeholder {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    padding: 12px 14px;
    font-size: 13.5px;

    &::placeholder {
      font-size: 13.5px;
    }
  }
`;

const FormSection = styled.form`
  padding: 25px 17px;
  border-radius: 24px;
  backdrop-filter: blur(16.3px);
  border: solid 6px rgba(54, 54, 54, 0.37);
  background-color: rgba(32, 32, 32, 0.7);
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 25px;

  @media (max-width: 768px) {
    padding: 20px 16px;
    gap: 18px;
  }

  @media (max-width: 480px) {
    padding: 18px 14px;
    gap: 16px;
  }
`;

const SubTitle = styled.div`
  opacity: 0.7;
  font-family: "HelveticaRegular";
  font-size: 20px;
  line-height: 1.5;
  text-align: center;
  color: #fff;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const TitleSection = styled(Flex)`
  gap: 27px;

  @media (max-width: 768px) {
    gap: 18px;
  }

  @media (max-width: 480px) {
    gap: 14px;
  }
`;

const MainTitle = styled.div`
  font-family: "HelveticaLight";
  font-size: 84px;
  letter-spacing: -2.52px;
  text-align: center;
  color: #fff;

  span {
    font-family: "HelveticaMedium";
  }

  @media (max-width: 1024px) {
    font-size: 72px;
  }

  @media (max-width: 768px) {
    font-size: 48px;
    letter-spacing: -1.6px;
  }

  @media (max-width: 480px) {
    font-size: 36px;
    letter-spacing: -1.1px;
  }
`;

const MainSection = styled(Flex)`
  min-height: calc(100vh - 126px);
  max-width: 895px;
  width: 95%;
  margin: 0 auto;
  gap: 42px;

  @media (max-width: 1024px) {
    width: 96%;
  }

  @media (max-width: 768px) {
    width: 94%;
    gap: 28px;
    min-height: calc(100vh - 112px);
  }

  @media (max-width: 480px) {
    width: 92%;
    gap: 22px;
    min-height: calc(100vh - 108px);
  }
`;
