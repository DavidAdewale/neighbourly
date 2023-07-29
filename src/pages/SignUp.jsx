import Paragraph from '../ui/Paragraph';
import StyledLink from '../ui/Link';
import AuthPageLayout from '../ui/AuthPageLayout';
import AuthForm from '../ui/AuthForm';
import SignUpForm from '../authentication/SignUpForm';

function SignIn() {
  const heading = {
    title: 'Welcome to Neighbourly',
    paragraph: 'Sign Up and Get Started',
  };
  return (
    <AuthPageLayout>
      <AuthForm heading={heading} form={<SignUpForm />} />
      <Paragraph>
        Already have an account? <StyledLink to="/signin">Sign up</StyledLink>
      </Paragraph>
    </AuthPageLayout>
  );
}

export default SignIn;
