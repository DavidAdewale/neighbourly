import { styled } from 'styled-components';
import AuthPageTitle from './AuthPageTitle';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media only screen and (max-width: 37.5em) {
    gap: 3rem;
  }
`;

function AuthForm({ heading, form }) {
  const { title, paragraph } = heading;

  return (
    <Container>
      <AuthPageTitle title={title} paragraph={paragraph} />
      <div>{form}</div>
    </Container>
  );
}

export default AuthForm;
