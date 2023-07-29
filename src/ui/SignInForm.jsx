import { styled } from 'styled-components';
import Paragraph from './Paragraph';
import Form from './Form';
import Button from './Button';
import { AiOutlineGoogle } from 'react-icons/ai';
// import { getCurrentUser } from '../services/apiAuth';
import { useGoogleLogin } from '../authentication/useGoogleLogin';

const Container = styled.div`
  width: 25%;
  /* min-height: 100vh; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* padding: 0 10rem; */
  gap: 3rem;

  @media only screen and (max-width: 112.5em) {
    width: 40%;
  }

  @media only screen and (max-width: 52.75em) {
    gap: 1rem;
  }

  @media only screen and (max-width: 37.5em) {
    width: 80%;
    gap: 3rem;
  }
`;

const StyledParagraph = styled(Paragraph)`
  color: var(--color-light-accent);
`;

const Divider = styled.div`
  display: flex;
  justify-content: center;
  /* Add some padding to the Divider container */
  padding: 0 1rem;
`;

const StyledDivider = styled.p`
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 120px; /* Subtract the padding from the width */
    height: 1px;
    background-color: var(--color-light-accent);
  }

  &::before {
    left: 0;
    /* Move the line to the left using translateX */
    transform: translateX(-110%);
  }

  &::after {
    right: 0;
    /* Move the line to the right using translateX */
    transform: translateX(110%);
  }
`;

function SignInForm() {
  const { signin, isLoading } = useGoogleLogin();

  function handleGoogleLogIn() {
    if (isLoading) return console.log('loading');
    signin();
  }
  return (
    <Container>
      <div>
        <h2>Welcome Back</h2>
        <StyledParagraph>Sign in to your account</StyledParagraph>
      </div>
      <Button type="formSecondary" onClick={handleGoogleLogIn}>
        <AiOutlineGoogle /> Continue with Google
      </Button>
      <Divider>
        <StyledDivider>or</StyledDivider>
      </Divider>
      <div>
        <Form />
      </div>
    </Container>
  );
}

export default SignInForm;
