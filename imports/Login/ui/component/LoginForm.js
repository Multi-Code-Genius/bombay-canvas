"use client";

import { useRouter } from "next/navigation";
import { Fragment } from "react";
import styled from "styled-components";
import ButtonIcon from "/imports/Login/ui/assets/ButtonIcon";
import GoogleLogin from "/imports/Login/ui/assets/GoogleLogin";
import Flex from "/lib/atoms/Flex";

const LoginForm = ({ $fromSignup = false }) => {
  const router = useRouter();

  const handleRedirect = () => {
    if ($fromSignup) router.push("/login");
    else router.push("/signup");
  };

  return (
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
      <FormSection $fullwidth $direction="column">
        <UpperSection $fullwidth $direction="column">
          <Label>Your Information</Label>
          {$fromSignup && <InputField placeholder="Your Fullname" />}
          <InputField placeholder="Email" />
          <InputField placeholder="Your Password" />
        </UpperSection>
        <BtnWrapper $fullwidth $direction="column">
          <ContinueCTA $fullwidth $alignitems="center" $justifycontent="center">
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
            Don't have an account? <span onClick={handleRedirect}>Sign in</span>
          </Fragment>
        )}
      </ExtraTxt>
    </MainSection>
  );
};

export default LoginForm;

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
`;

const CTATxt = styled.div`
  font-family: "HelveticaBold";
  font-size: 16px;
  line-height: 1.4;
  letter-spacing: 0.2px;
  color: #fff;
`;

const GoogleLoginCTA = styled(Flex)`
  gap: 10px;
  padding: 16px 10px;
  border-radius: 12px;
  border: 1px solid #414141;
  cursor: pointer;
`;

const Txt = styled.div`
  opacity: 0.32;
  font-family: "HelveticaRegular";
  font-size: 18px;
  line-height: 1.4;
  letter-spacing: 0.2px;
  color: #fff;
`;

const OrSection = styled(Flex)`
  gap: 24px;
`;

const Line = styled(Flex)`
  width: 50px;
  height: 1px;
  opacity: 0.32;
  background-color: #fff;
`;

const BtnWrapper = styled(Flex)`
  gap: 10px;
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
`;

const UpperSection = styled(Flex)`
  gap: 12px;
`;

const Label = styled.div`
  opacity: 0.54;
  font-family: "HelveticaRegular";
  font-size: 16.3px;
  font-weight: 500;
  color: #fff;
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
`;

const FormSection = styled(Flex)`
  padding: 25px 17px;
  border-radius: 24px;
  backdrop-filter: blur(16.3px);
  box-shadow: -9.4px 22.5px 54.5px 0 rgba(0, 0, 0, 0.05),
    -36.6px 92.1px 98.6px 0 rgba(0, 0, 0, 0.05),
    -82.7px 206.7px 133.4px 0 rgba(0, 0, 0, 0.03),
    -146.6px 367.3px 157.8px 0 rgba(0, 0, 0, 0.01),
    -228.3px 575px 172.9px 0 rgba(0, 0, 0, 0);
  border: solid 6px rgba(54, 54, 54, 0.37);
  background-color: rgba(32, 32, 32, 0.7);

  gap: 25px;
`;

const SubTitle = styled.div`
  opacity: 0.7;
  font-family: "HelveticaRegular";
  font-size: 20px;
  line-height: 1.5;
  text-align: center;
  color: #fff;
  width: 100%;
`;

const TitleSection = styled(Flex)`
  gap: 27px;
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
`;

const MainSection = styled(Flex)`
  min-height: 100vh;
  max-width: 895px;
  margin: 0 auto;
  gap: 42px;
`;
