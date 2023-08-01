import { useNavigate } from 'react-router-dom';

import { useUser } from '../features/authentication/useUser';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

import AuthPageLayout from '../ui/AuthPageLayout';
import AuthForm from '../ui/AuthForm';
import SignInForm from '../features/authentication/SignInForm';
import StyledLink from '../ui/Link';
import Paragraph from '../ui/Paragraph';

function SignIn() {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  if (isAuthenticated) navigate('/dashboard');

  useDocumentTitle('Sign in to your Neighbourly account');

  const heading = {
    title: 'Welcome Back',
    paragraph: 'Sign in to your account',
  };
  return (
    <AuthPageLayout>
      <AuthForm heading={heading} form={<SignInForm />} />
      <Paragraph>
        Don&lsquo;t have an account?{' '}
        <StyledLink to="/signup">Sign up</StyledLink>
      </Paragraph>
    </AuthPageLayout>
  );
}

export default SignIn;
