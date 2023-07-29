import Paragraph from '../ui/Paragraph';
import StyledLink from '../ui/Link';
import AuthPageLayout from '../ui/AuthPageLayout';
import AuthForm from '../ui/AuthForm';
import SignInForm from '../authentication/SignInForm';

function SignIn() {
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
