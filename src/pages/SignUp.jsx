import Paragraph from '../ui/Paragraph';
import StyledLink from '../ui/Link';
import AuthPageLayout from '../ui/AuthPageLayout';
import AuthForm from '../ui/AuthForm';
import SignUpForm from '../authentication/SignUpForm';
import { useUser } from '../authentication/useUser';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  if (isAuthenticated) navigate('/dashboard');

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
