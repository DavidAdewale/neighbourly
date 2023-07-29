import { styled } from 'styled-components';
import SignInForm from '../ui/SignInForm';

const Page = styled.main`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background: var(--color-hero-bg);
  background-position: top center;
  background-size: cover;
`;

function SignIn() {
  return (
    <Page>
      <SignInForm />
    </Page>
  );
}

export default SignIn;
