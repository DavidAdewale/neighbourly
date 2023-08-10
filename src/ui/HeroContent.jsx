import { styled } from 'styled-components';
import { FaFigma, FaReact } from 'react-icons/fa';
import { RiJavascriptLine, RiSupabaseLine } from 'react-icons/ri';
import { SiStyledcomponents } from 'react-icons/si';
import Button from './Button';
import Paragraph from './Paragraph';
import { useUser } from '../features/authentication/useUser';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled.div`
  width: 50%;
  text-align: center;

  @media only screen and (max-width: 56.25em) {
    width: 80%;
  }
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const GreenText = styled.span`
  color: var(--color-main);
`;

const StyledBuildTools = styled.div`
  /* margin-top: 2.5rem; */
  position: absolute;
  width: 100%;
  padding: 2rem;
  bottom: 0;
  left: 0;
  z-index: -1;

  & div {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    gap: 2.1rem;
    color: var(--color-light-accent);
    & svg {
      width: 2.1rem;
      height: 2.1rem;
    }
  }
`;

function HeroContent() {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  return (
    <StyledContainer>
      <TextContainer>
        <h1>
          Managing Properties, <GreenText>Strengthening Communities</GreenText>
        </h1>
        <Paragraph>
          Welcome to Neighbourly - your all-in-one property management solution.
          From residential apartments to cozy homes, we&apos;re here to simplify
          property management, enhance tenant experiences, and foster thriving
          communities.
        </Paragraph>
      </TextContainer>
      <ButtonContainer>
        {isAuthenticated ? (
          <Button onClick={() => navigate('/dashboard')}>
            Go to your dashboard
          </Button>
        ) : (
          <Button type="primary" onClick={() => navigate('/signup')}>
            Sign up - it&lsquo;s free!
          </Button>
        )}
        <Button variation="secondary">Learn more</Button>
      </ButtonContainer>
      <StyledBuildTools>
        <Paragraph size="small">Built with industry standard tools</Paragraph>
        <div>
          <FaReact /> <RiSupabaseLine /> <RiJavascriptLine />{' '}
          <SiStyledcomponents /> <FaFigma />
        </div>
      </StyledBuildTools>
    </StyledContainer>
  );
}

export default HeroContent;
