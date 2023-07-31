import { useNavigate } from 'react-router-dom';

import { useUser } from '../authentication/useUser';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

import SignUpForm from '../authentication/SignUpForm';
import AuthPageLayout from '../ui/AuthPageLayout';
import AuthForm from '../ui/AuthForm';
import StyledLink from '../ui/Link';
import Paragraph from '../ui/Paragraph';

function SignUp() {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  if (isAuthenticated) navigate('/dashboard');

  useDocumentTitle('Sign Up and Get Started with Neighbourly');

  const heading = {
    title: 'Welcome to Neighbourly',
    paragraph: 'Sign Up and Get Started',
  };
  return (
    <AuthPageLayout>
      <AuthForm heading={heading} form={<SignUpForm />} />
      <Paragraph>
        Already have an account? <StyledLink to="/signin">Sign in</StyledLink>
      </Paragraph>
    </AuthPageLayout>
  );
}

export default SignUp;
