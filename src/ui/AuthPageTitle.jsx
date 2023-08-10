import { styled } from 'styled-components';
import { useGoogleLogin } from '../features/authentication/useGoogleLogin';
import { AiOutlineGoogle } from 'react-icons/ai';
import Button from './Button';
import Paragraph from './Paragraph';

const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Divider = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 1rem;
`;

const StyledDivider = styled.p`
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 80px;
    height: 1px;
    background-color: var(--color-light-accent);
  }

  &::before {
    left: 0;
    transform: translateX(-130%);
  }

  &::after {
    right: 0;
    transform: translateX(130%);
  }
`;

function AuthPageTitle({ title, paragraph }) {
  const { signin, isLoading } = useGoogleLogin();

  function handleGoogleLogIn() {
    if (isLoading) return;
    signin();
  }
  return (
    <>
      <Title>
        <h3>{title}</h3>
        <Paragraph>{paragraph}</Paragraph>
      </Title>
      <Button variation="formSecondary" onClick={handleGoogleLogIn}>
        <AiOutlineGoogle /> Continue with Google
      </Button>
      <Divider>
        <StyledDivider>or</StyledDivider>
      </Divider>
    </>
  );
}

export default AuthPageTitle;
